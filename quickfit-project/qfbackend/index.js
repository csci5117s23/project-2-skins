
/*
* Install: npm i codehooks-js codehooks-crudlify
*/

// Code hooks & schema imports
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { object, string, number, date, InferType, bool, array } from 'yup';
import jwtDecode from 'jwt-decode';
import fetch from 'node-fetch'

// Process .env keys for getting images
// ENVs don't get loaded from here unfortunately... must specifiy in codehooks admin page
const B2_KEY_ID = process.env.BACKBLAZE_KEY_ID;
const B2_APPLICATION_KEY = process.env.BACKBLAZE_APPLICATION_KEY;
const B2_BUCKET_ID = process.env.BACKBLAZE_BUCKET_ID;

// --------------------------------------------------------------------------------------------------
// README: 
//  
// Software:
//    - codehooks: Not a traditional SQL database and can make simple CRUD functions w/ key-value pair storage
//    - crudlify:  Codehooks feature to quickly generate CRUD details for a Yup schema
//    - yup:       Enforces schema rules to codehooks requests
//    - jwtDecode: For reading user JWT tokens/basically for authorizing users
//
// --------------------------------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Database schema
const options = {  // Schema options
  schema: "yup"
}
//////////////////////////////////////////////////////////////////////
// Database schema - Clothing article 
// API Endpoint: https://todobackend-fm9y.api.codehooks.io/dev/clothes/[id]
// Codehooks will auto generate '._id' property on clothing db entry on POST
const clothesSchemaYup = object( {
  category:      string().required(),                 // Name of category (top  , bottom, sweater, shoes, etc.)
  name:          string().required(),                 // Name of clothing (Black Nike hoodie, Red long sleeve from garage) 
  tags:          array().of(string()),                // List of user specified strings
  color:         string(),                            // User-specified color
  imageUrl:      string(),                            // User-uplodad image of clothing
  createdOn:     date().default(() => new Date()),    // Date of when clothing article was created (POST date)
})
//////////////////////////////////////////////////////////////////////
// Database schema - Outfit 
// API Endpoint: https://todobackend-fm9y.api.codehooks.io/dev/outfit/[id]
// Codehooks will auto generate '._id' property on outfit db entry on POST
const outfitSchemaYup = object( {
  // Reference to clothesSchemaYup(clothing article) ._id
  topId:          array().of(string()),               // Muliple tops allowed (zip up hoodie with t-shirt)                 
  bottomId:       array().of(string()),               // Multiple bottoms allowed (skirt with leggings)
  shoesId:        string(),                           // One pair of shoes only    
  accessoriesId:  array().of(string()),               // Multiple accessories allowed (necklace and watch)
  onePieceId:     string(),                           // Only one allowed 
  dateWorn:       date().required(),                  // Date of when user set to wear this outfit
  createdOn:      date().default(() => new Date()),   // Date of when outfit was created (POST date)
})
//////////////////////////////////////////////////////////////////////
// Database schema - Tag (Clothing tags)
// API Endpoint: https://todobackend-fm9y.api.codehooks.io/dev/tag/[id]
// Codehooks will auto generate '._id' property on tag db entry on POST
const tagSchemaYup = object( {
  name:       string().required(),                    // Name of tag (color, brand, style, etc.)
  createdOn:  date().default(() => new Date()),       // Date of when tag was created (POST date)
})
//////////////////////////////////////////////////////////////////////
// Database schema - Images (User-submitted clothing images)
// API Endpoint: https://todobackend-fm9y.api.codehooks.io/dev/image/[id]
// Codehooks will auto generate '._id' property on clothing image db entry on POST
const imageSchemaYup = object({
  name:       string().required(),              // Image file name
  content:    string().required(),              // Image base64-encoding
  createdOn:  date().default(() => new Date()), // Date of when clothing article was created (POST date)
});
crudlify(app, { clothes: clothesSchemaYup, outfit: outfitSchemaYup, tag: tagSchemaYup, image: imageSchemaYup }, options);

// Backblaze functions for images
// Code referenced from Upper Five tech share:
// https://github.com/jasonwoitalla/csci5117-upper-five-tech-share/blob/main/tech-share-backend/index.js
async function getAuthDetails() {
  console.log("Getting Backblaze auth details");
  console.log("From bucket: " + B2_BUCKET_ID);

  // 1. Encoded our account ID and key, as per the Backblaze docs
  let encoded = Buffer.from(B2_KEY_ID + ":" + B2_APPLICATION_KEY).toString(
    "base64"
  );

  // 2. Make the fetch request to get our system level auth details
  const response = await fetch(
    "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
    {
      method: "GET",
      headers: {
        Authorization: "Basic " + encoded,
      },
    }
  );
  const data = await response.json();
  console.log("Returning details");
  console.log("Url: " + data.apiUrl);
  console.log("Auth: " + data.authorizationToken);

  // 3. Return the apiUrl, authToken, and the downloadUrl to the user
  return {
    apiUrl: data.apiUrl,
    authToken: data.authorizationToken,
    downloadUrl: data.downloadUrl,
  };
}

app.get("/get_upload_url", async (req, res) => {
  // 1. Get the auth details
  let authDetails = await getAuthDetails();

  // 2. Make the fetch request to get the upload URL
  const response = await fetch(
    `${authDetails.apiUrl}/b2api/v2/b2_get_upload_url?bucketId=${B2_BUCKET_ID}`,
    {
      method: "GET",
      headers: {
        Authorization: authDetails.authToken,
      },
    }
  );
  const data = await response.json();
  // Optional, error checking
  if (!data.uploadUrl || !data.authorizationToken) {
    res.status(500).send("Failed to get upload URL");
    return;
  }

  res.json({
    uploadUrl: data.uploadUrl,
    uploadAuth: data.authorizationToken,
  });
});

app.get("/get_download_url", async (req, res) => {
  let authDetails = await getAuthDetails();

  res.json({
    downloadUrl: authDetails.downloadUrl,
    downloadAuth: authDetails.authToken,
  });
});

// NOTE: Changed 'images' to 'image' since image collection path is .../dev/image
app.post("/store_file_id", async (req, res) => {
  const conn = await Datastore.open();
  const doc = await conn.insertOne("image", req.body);
  res.status(201).json(doc);
});

app.get("/get_all_images", async (req, res) => {
  const conn = await Datastore.open();
  conn.getMany("image").json(res);
});
  

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// Authorization
// Grabs the authorization token and parses it, stashing it on the request.
// Professor Kluver code referenced from: https://github.com/csci5117s23/Tech-Stack-2-Kluver-Demo/blob/main/backend/index.js
const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)



//////////////////////////////////////////////////////////////////////
// 'clothes' route authentication
// Extra logic for GET / and POST / requests.
app.use('/clothes', (req, res, next) => {
  if (req.method === "POST") {
      // always save authenticating user Id token.
      // note -- were not enforcing uniqueness which isn't great.
      // we don't currently have a great way to do this -- one option would be to 
      // have a user collection track which collections have been filled
      // It's a limitation for sure, but I'll just make that a front-end problem...
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      // on "index" -- always check for authentication.
      req.query.userId = req.user_token.sub
  }
  next();
})
// Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/clothes/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('clothes', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})

//////////////////////////////////////////////////////////////////////
// 'tag' route authentication
// Extra logic for GET / and POST / requests.
app.use('/tag', (req, res, next) => {
  if (req.method === "POST") {
      // always save authenticating user Id token.
      // note -- were not enforcing uniqueness which isn't great.
      // we don't currently have a great way to do this -- one option would be to 
      // have a user collection track which collections have been filled
      // It's a limitation for sure, but I'll just make that a front-end problem...
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      // on "index" -- always check for authentication.
      req.query.userId = req.user_token.sub
  }
  next();
})
// Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/tag/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('tag', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})

//////////////////////////////////////////////////////////////////////
// 'outfit' route authentication
// Extra logic for GET / and POST / requests.
app.use('/outfit', (req, res, next) => {
  if (req.method === "POST") {
      // always save authenticating user Id token.
      // note -- were not enforcing uniqueness which isn't great.
      // we don't currently have a great way to do this -- one option would be to 
      // have a user collection track which collections have been filled
      // It's a limitation for sure, but I'll just make that a front-end problem...
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      // on "index" -- always check for authentication.
      req.query.userId = req.user_token.sub
  }
  next();
})
// Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/outfit/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('outfit', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})

//////////////////////////////////////////////////////////////////////
// 'image' route authentication
// Extra logic for GET / and POST / requests.
app.use('/image', (req, res, next) => {
  if (req.method === "POST") {
      // always save authenticating user Id token.
      // note -- were not enforcing uniqueness which isn't great.
      // we don't currently have a great way to do this -- one option would be to 
      // have a user collection track which collections have been filled
      // It's a limitation for sure, but I'll just make that a front-end problem...
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      // on "index" -- always check for authentication.
      req.query.userId = req.user_token.sub
  }
  next();
})
// Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/image/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('image', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})


export default app.init();