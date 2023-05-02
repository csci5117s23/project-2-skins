import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import Resizer from "react-image-file-resizer";
import Webcam from "react-webcam";
// MUI Component imports
import {
  Box,
  Stack,
  FormControl,
  MenuItem,
  TextField,
  Button,
  FormLabel,
  Typography,
  Paper,
  CssBaseline,
  CircularProgress,
  Tooltip,
  Card,
  Alert,
  Snackbar
} from "@mui/material";
// MUI Icon imports
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
// DB Clothes Function imports
import {
  getClothes,
  addClothes,
  editClothes,
  deleteClothes,
} from "@/modules/clothesFunctions";
// DB Tag Function imports
import { getTags, addTag, editTag, deleteTag } from "@/modules/tagFunctions";
// DB Image Function imports
import {
  useCloudUpload,
  getDownloadUrlForLatest,
} from "@/modules/imageFunctions";
// Custom component imports
import AddTagComboBox from "./AddTagComboBox";
import WebcamDialog from "./WebcamDialog";
import PhotoUpload from "./PhotoUpload";
import { UploadFile } from "@mui/icons-material";

// Header text styling for each form input
function InputHeader(props) {
  return (
    <Typography
      variant="h8"
      sx={{
        fontWeight: "bold",
      }}
    >
      {props.children}
    </Typography>
  );
}

// Clothes form
export default function ClothesForm( {clothingToEdit = null, setUpdated} ) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // --- Shows success message when submit is clicked --------------------
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

  const handleSubmitForSuccessMessageClick = () => {
    setOpenSuccessMessage(true);
  }

  const handleClosingSuccessMessage = ()  => {
    setOpenSuccessMessage(false);
  }

  // If passed in clothing item is not null, (AKA we are editing, then use these values instead)
  const editId = clothingToEdit?._id;
  const editCreatedOn = clothingToEdit?.createdOn;
  const editCategory = clothingToEdit?.category;
  const editColor = clothingToEdit?.color;
  const editName = clothingToEdit?.name;
  const editTags = clothingToEdit?.tags;
  const editImageUrl = clothingToEdit?.imageUrl;

  // --- Main form state hooks & functions ------------------------------------------------------------------------------------------------
  const [category, setCategory] = useState(editCategory || "");               // Clothing entry category
  const [color, setColor] = useState(editColor || "");                        // Clothing entry color
  const [name, setName] = useState(editName || "");                           // Clothing entry name
  const [userTags, setUserTags] = useState([]);                               // Clothing tags previously made by user (store here)
  const [inputTags, setInputTags] = useState(editTags || []);                 // Clothing tags to apply to this entry
  const [image, setImage] = useState(null);                                   // Image URL to take/preview on front end
  const [imageFile, setImageFile] = useState(null);                           // Image file to upload to cloud storage
  const [fileUploadText, setFileUploadText] = useState("Choose an image..."); // Image file name/text
  const [uploaded, setUploaded] = useState(false);                            // Status of whether or not an image was uploaded to cloud
  const [reset, setReset] = useState(false);
  const [isWebcam, setIsWebcam] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  // -----------------------------------------------------------------
  // Function to reset clothes form inputs after form submission
  // -----------------------------------------------------------------
  function resetForm() {
    setCategory("");
    setColor("");
    setName("");
    setInputTags([]);
    setImage(null);
    setImageFile(null);
    setFileUploadText("Choose an image...");
  }

  // --- Clothes functions ---
  // --------------------------------------------------
  // Function to add a clothing article from front-end
  // --------------------------------------------------
  async function onHandleSubmit(e) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });
    
    // Upload image first, then get the most recent image slotted in images table
    let imageUrl = null;
    if (imageFile) {
      await handleImageUpload(e, token);
      imageUrl = await getDownloadUrlForLatest(token);
    } else if (image) {
      await uploadScreenshot(token);
      imageUrl = await getDownloadUrlForLatest(token);
    }
    let result;
    // --- Call POST function if we are adding a clothing item ---
    if (clothingToEdit === null) { 
      // Create a clothing item from state variables
      const postItem = {
        category: category,
        name:     name,
        color:    color,
        tags:     getTagNames(inputTags),
        imageUrl: await imageUrl || "",
      }; // Make POST request
      console.log("postItem: " + JSON.stringify(postItem));
      result = await addClothes(token, postItem);
    } 
    // --- Call PUT function if we are editing a clothing item ---
    else { 
      // Create a clothing item from state variables
      const putItem = {
        _id:        editId,
        createdOn:  editCreatedOn || new Date(),
        imageUrl:   await imageUrl || editImageUrl || "",
        category:   category || "",
        name:       name || "",
        color:      color || "",
        tags:       getTagNames(inputTags) || [],
      }; // Make PUT request
      // console.log("Put item: ");
      // console.log(JSON.stringify(putItem));
      editClothes(token, putItem).then(()=>{setUpdated?setUpdated(true):null;});
    }

    // On submit also, refresh the form
    resetForm();
    
  }

  // -----------------------------------------------------
  // Function to delete a clothing article from front-end
  // -----------------------------------------------------
  async function handleDelete(clothingId) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // --- Call DELETE function ---
    deleteClothes(token, clothingId).then(()=>{setUpdated?setUpdated(true):null;});   
  }

  // --- Tag functions ---
  // --------------------------------------------------------------------
  // Function to send POST requests to add to a user's personal tags
  // --------------------------------------------------------------------
  async function addNewTags() {
    // 1) If new tags list is empty, tell user to add more tags
    if (inputTags === null || inputTags.length === 0) {
      console.log("No tags entered.");
      return;
    }
    // 2) Get all user-inputted tag names if there are any tag objects
    const inputTagNames = getTagNames(inputTags);

    // 3) Get existing user tag names
    const existingTagNames = userTags.map((tag) => {
      return tag.name;
    });
    // 4) Map over each current tag and find which ones aren't in the set of pre-existing tags
    let newTags = inputTagNames.filter((tag) => {
      if (existingTagNames.includes(tag) === false) {
        return tag;
      }
    });
    // 5) Ensure list of tags are unique from one another (convert to Set and back to array)
    newTags = Array.from(new Set(newTags));

    // 6) Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // 7) Map over each new tag in list of new tags and make a post request to create each
    newTags.map((tag) => {
      // If tag name is null/empty, don't add tag.
      if (tag.name === null || tag.name === "") {
        console.log("Error. Tag name invalid.");
        return;
      }
      addTag(token, tag); // Otherwise, add tag normally.
    });
  }

  // -------------------------------------------------------------------
  // Function to convert a list of tags to just a list of tag names
  // -------------------------------------------------------------------
  function getTagNames(tagNamesToGet) {
    const inputTagNames = tagNamesToGet.map((tag) => {
      if (tag.name) {
        return tag.name;
      } else if (typeof tag === "string" || tag instanceof String) {
        return tag;
      }
    });
    return inputTagNames;
  }

  // --- Image functions ---
  // ------------------------------
  // To upload an image from form:
  // ------------------------------
  // Code referenced from Upper Five tech share: https://github.com/jasonwoitalla/csci5117-upper-five-tech-share/blob/main/src/pages/cloud-storage.js
  async function handleImageUpload(e, token) {
    e.preventDefault();
    try {
        console.log(imageFile);
        // Resize image 
        const resized = await new Promise((resolve) => {
            Resizer.imageFileResizer(
                imageFile,
                600,
                600,
                "JPEG",
                100,
                0,
                (uri) => {resolve(uri)},
                "file",
                200,
                200
            );
        });
        // Upload resized image to bucket
        await useCloudUpload(token, resized);
        setReset(!reset);
    } catch (error) {
        console.log("Error while resizing image:", error);
    }
    console.log("Finishing upload");
  }

  // -----------------------------------------------
  // Function to upload React camera image to cloud
  // -----------------------------------------------
  // Code referenced from Codehooks Backblaze techshare: https://github.com/jasonwoitalla/csci5117-upper-five-tech-share/blob/main/src/pages/gallery.js
  async function uploadScreenshot(token) {
    if (image) {
        //convert the base64 image to a blob: https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
        const byteCharacters = atob(String(image).split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++)
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        const byteArray = new Uint8Array(byteNumbers);
        const blobImage = new Blob([byteArray], { type: "image/jpeg" });
        blobImage && (await useCloudUpload(token, blobImage));
    }
  }


  // --- Use effects ---
  // --------------------------------------------------------------------
  // Run on every render (loaded, if tags change)
  // --------------------------------------------------------------------
  useEffect(() => {
    console.log("Page rendered.");
    async function processTags() {
      // Get auth key & user's tags
      if (userId) {
        // Ensure user is logged in
        const token = await getToken({ template: jwtTemplateName }); // Get auth token
        setUserTags(await getTags(token)); // Get user tasks from codehooks database
        setLoading(false); // Once we get these things, we are no longer loading
        setFileUploadText("Choose an image..."); // Set file upload text
      }
    }
    processTags();
  }, [isLoaded, inputTags, reset]);

  // Load GET requests before showing any content
  if (loading) {
    return (
      <>
        <Stack justifyContent="center" alignItems="center" height="80vh" width="80vw">
          <CircularProgress />
        </Stack>
      </>
    );
  } else {
    // Page contents
    return (
      <>
        <CssBaseline />
        {/* Clothes form container */}
        <Box sx={{
            p: { xs: 2, sm: 3, md: 4, xl: 5 },
            // height: "100%",
            height: "90vh",
            maxHeight: "87vh",
            overflow: 'auto',
            backgroundImage: "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)"
          }}>
          <Box height={"100vh"}>
          <Box sx={{
            m:  { xs: 0 },
            px: { xs: 2, md: 5 },
            pt: { xs: 2, md: 5 }, 
            pb: { xs: 5 },
            height: "100%",
            minHeight: "95vh",
            width: '100%',
          }}>
        <Card>
        <Box
          sx={{
            m:  { xs: 0 },
            px: { xs: 2, md: 5 },
            pt: { xs: 2, md: 5 }, 
            pb: { xs: 5 },
            height: "100%",
            minHeight: "7vh",
            width: '100%',
          }}
        >
          {/* Clothing form */}
          <FormControl fullWidth>
            {/* Form header */}
            <FormLabel>
              <Paper
                elevation={2}
                sx={{
                  textAlign: "center",
                  mb: 2,
                  py: 1,
                  borderRadius: 2,
                  border: "1px solid grey",
                }}
              >
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  { (clothingToEdit === null) 
                      ?
                      <span>Add clothes to your wardrobe</span> 
                      : 
                      <>
                        <span>Edit clothing item</span>
                      </>
                  }
                </Typography>
              </Paper>
            </FormLabel>

            {/* Form fields */}
            <Stack spacing={1}>
              {/* Category */}
              <InputHeader > Enter clothing details </InputHeader>
              <TextField
                
                select
                label="Category*"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <MenuItem value={"Top"}>Top</MenuItem>
                <MenuItem value={"Bottom"}>Bottoms</MenuItem>
                <MenuItem value={"Shoes"}>Shoes</MenuItem>
                <MenuItem value={"Accessories"}>Accessories</MenuItem>
                <MenuItem value={"One Piece"}>One Piece</MenuItem>
              </TextField>

              {/* Name */}
              <TextField
                variant="outlined"
                label="Name*"
                value={name}
                placeholder="(Required) Enter a name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              {/* Color */}
              <TextField
                variant="outlined"
                label="Color"
                value={color}
                placeholder="(Optional) Please enter a color"
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />

              {/* --- Tags --- */}
              <InputHeader> Tags </InputHeader>
              <AddTagComboBox
                userTags={userTags}
                setInputTags={setInputTags}
                getTags={getTags}
                addTag={addTag}
                editTag={editTag}
                deleteTag={deleteTag}
              />

              {/* --- Images --- */}
              <InputHeader>Image</InputHeader>
              <PhotoUpload reset={reset} setImage={setImage} setImageFile={setImageFile} />

              {/* Take photo (from camera) */}
              <WebcamDialog
                image={image}
                setImage={setImage}
                setFileUploadText={setFileUploadText}
              />

              {/* Show preview of image */}
              {image && <Box component="img" src={image} alt="captured-photo" />}

              {/* --- Submit --- */}
              { (clothingToEdit !== null) 
                ?
                  // Edit form buttons
                  <Stack direction="row"
                    spacing={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 2,
                    }}
                  >
                    <Button variant="contained" 
                      sx={{ width: "45%", backgroundColor:"#e31300", fontWeight:"bold" }}
                      onClick={ () => { 
                        handleDelete(editId)
                        setUpdated?setUpdated(true):null;
                      } }
                    >
                      Delete
                      <DeleteOutlineTwoToneIcon fontSize="small"/>
                    </Button>
                      
                    <Button variant="contained"
                      sx={{ width: "45%", fontWeight:"bold" }}
                      onClick={(event, value) => {
                        addNewTags();
                        onHandleSubmit(event);
                        setUpdated?setUpdated(true):null;
                      }}
                    >
                      Edit
                      <AutoFixHighTwoToneIcon fontSize="small"/>
                    </Button>
                  </Stack>
                :
                  // Add form buttons
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 2,
                    }}
                  >
                    <Button variant="contained"
                      sx={{ width: "45%" }}
                      onClick={(event, value) => {
                        addNewTags();
                        onHandleSubmit(event);
                        handleSubmitForSuccessMessageClick();
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
              }

            </Stack>
          </FormControl>
        </Box>
        </Card>
          </Box>
          </Box>
        </Box>
        <Snackbar open={openSuccessMessage} autoHideDuration={2000} onClose={handleClosingSuccessMessage}>
          <Alert onClose={handleClosingSuccessMessage} severity="success" sx={{ width: '100%' }}>
            Outfit added to wardrobe!
          </Alert>
        </Snackbar>
       
      </>
    );
  }
}
