
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/

// Code hooks & scema imports
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { object, string, number, date, InferType, bool, array } from 'yup';
import jwtDecode from 'jwt-decode';
import fetch from 'node-fetch'

// Process .env keys for getting images
const B2_KEY_ID = process.env.B2_KEY_ID;
const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY;
const B2_BUCKET_ID = process.env.B2_BUCKET_ID;

// An example route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

// --------------------------------------------------------------------------------------------------
// README: 
//  
// Software:
//    - codehooks: Not a traditional SQL database and can make simple CRUD functions w/ key-value pair storage
//    - crudlify:  Codehooks feature to quickly generate CRUD details for a Yup schema
//    - yup:       Enforces schema rules to codehooks requests
//    - jwtDecode: For reading user JWT tokens/basically for authorizing users
//
// Reference might be helpful for grabbing multiple key-value pairs like how you would with foreign
// keys that help communicate between different tables...
// https://codehooks.io/docs/tutorials/key-val-store/part-4-working-with-multiple-values-and-streams
//
// Since I haven't really figured out how to make codehooks relational I just used three different
// codehooks collections to link the clothes with the clothing tags. If there is a better solution
// change this please.
// 
// Important Table Notes/Keys
// Table 1.) clothes      
//  * Use can upload an article piece through a clothing form to store information about a piece of clothing
//    in their custom-wardrobe.
//
//    A) ( With auto-generated key '._id' to distinguish different clothes a user uploads )
//
// Table 2.) tag 
//  * User can generate/delete any amount of these they make and they are user-unique.
//    If they have tags for 'neckties', 'skirts', 'bottom', and/or 't-shirt' they go here.
// 
//    A) ( With auto-generated key '._id' to distinguish each user-made custom clothing tag )
//    
// Table 3.) link ***(I'm not sure if this is necessary... but I can't think of something else right now)***
//  * This table is for linking a piece of clothing with a clothing tag since we probably shouldn't try
//    to store a list of values in a single table key-value table slot. 
//    This table 'theoretically' links the above two tables together so we can pair any user-made clothing 
//    articles with any number of user-made tags/categories
// 
//    A) ( auto-generated key '._id' to differentiate each unique clothing-tag link )
//    B) ( clothingId that references which clothing article this key is trying to link from )
//    C) ( tagId that references which category/tag this key is trying to link to )
//
// * Should look somehing like this: 
//      - (Clothes <---> Link <---> Tag)
//
// * Figure out images later... (Codehooks is weird) and the number of steps to get images working is
//   was sort of covered by another group and their code is in a public repo in the 5117 Org.
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
  imageId:       string(),                            // User-uplodad image of clothing
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
  name: string().required(),
  content: string().required(),
});

// // Backblaze functions for images
// async function getAuthDetails() {
//   console.log("Getting Backblaze auth details");
// 	console.log("From bucket: " + B2_BUCKET_ID);

//   // Encode backblaze account ID and key in base64
//   let encoded = Buffer.from(B2_KEY_ID + ":" + B2_APPLICATION_KEY).toString("base64");

//   // Fetch backblaze authorization details
//   const response = await fetch(
//       "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
//       {
//           method: "GET",
//           headers: {
//               Authorization: "Basic " + encoded,
//           },
//       }
//   );
//   const data = await response.json();
//   console.log("Returning details");
//   console.log("Url: " + data.apiUrl);
//   console.log("Auth: " + data.authorizationToken);

//   // Give user apiUrl, authToken, and the download url to
//   return {
//       apiUrl: data.apiUrl,
//       authToken: data.authorizationToken,
//       downloadUrl: data.downloadUrl,
//   };
// }

// app.get("/get_upload_url", async (req, res) => {
//   // 1. Get the auth details
//   let authDetails = await getAuthDetails();

//   // 2. Make the fetch request to get the upload URL
//   const response = await fetch(
//       `${authDetails.apiUrl}/b2api/v2/b2_get_upload_url?bucketId=${B2_BUCKET_ID}`,
//       {
//           method: "GET",
//           headers: {
//               Authorization: authDetails.authToken,
//           },
//       }
//   );
//   const data = await response.json();
//   // Optional, error checking
//   if (!data.uploadUrl || !data.authorizationToken) {
//       res.status(500).send("Failed to get upload URL");
//       return;
//   }
//   res.json({
//       uploadUrl: data.uploadUrl,
//       uploadAuth: data.authorizationToken,
//   });
// });

// app.post("/store_file_id", async (req, res) => {
//   const conn = await Datastore.open();
//   const doc = await conn.insertOne("image", req.body);
//   res.status(201).json(doc);
// });

// app.get("/get_all_images", async (req, res) => {
//   const conn = await Datastore.open();
//   conn.getMany("image").json(res);
// });


// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
// // Authorization
// // Grabs the authorization token and parses it, stashing it on the request.
// const userAuth = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     if (authorization) {
//       const token = authorization.replace('Bearer ','');
//       // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
//       const token_parsed = jwtDecode(token);
//       req.user_token = token_parsed;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   } 
// }
// app.use(userAuth)



// //////////////////////////////////////////////////////////////////////
// // 'clothes' route authentication
// // Extra logic for GET / and POST / requests.
// app.use('/clothes', (req, res, next) => {
//   if (req.method === "POST") {
//       // always save authenticating user Id token.
//       // note -- were not enforcing uniqueness which isn't great.
//       // we don't currently have a great way to do this -- one option would be to 
//       // have a user collection track which collections have been filled
//       // It's a limitation for sure, but I'll just make that a front-end problem...
//       req.body.userId = req.user_token.sub
//   } else if (req.method === "GET") {
//       // on "index" -- always check for authentication.
//       req.query.userId = req.user_token.sub
//   }
//   next();
// })
// // Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// // side effect here will break patch patch by query, but that's OK for my purposes.
// app.use('/clothes/:id', async (req, res, next) => {
//   const id = req.params.ID;
//   const userId = req.user_token.sub
//   // let's check access rights for the document being read/updated/replaced/deleted
//   const conn = await Datastore.open();
//   try {
//       console.log(id);
//       const doc = await conn.getOne('task', id)
//       if (doc.userId != userId) {
//           // authenticate duser doesn't own this document.
//           res.status(403).end(); // end is like "quit this request"
//           return
//       }
//   } catch (e) {
//       console.log(e);
//       // the document doesn't exist.
//       res.status(404).end(e);
//       return;
//   }
//   // if we don't crash out -- call next and let crudlify deal with the details...
//   next();
// })

// //////////////////////////////////////////////////////////////////////
// // 'tag' route authentication
// // Extra logic for GET / and POST / requests.
// app.use('/tag', (req, res, next) => {
//   if (req.method === "POST") {
//       // always save authenticating user Id token.
//       // note -- were not enforcing uniqueness which isn't great.
//       // we don't currently have a great way to do this -- one option would be to 
//       // have a user collection track which collections have been filled
//       // It's a limitation for sure, but I'll just make that a front-end problem...
//       req.body.userId = req.user_token.sub
//   } else if (req.method === "GET") {
//       // on "index" -- always check for authentication.
//       req.query.userId = req.user_token.sub
//   }
//   next();
// })
// // Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// // side effect here will break patch patch by query, but that's OK for my purposes.
// app.use('/tag/:id', async (req, res, next) => {
//   const id = req.params.ID;
//   const userId = req.user_token.sub
//   // let's check access rights for the document being read/updated/replaced/deleted
//   const conn = await Datastore.open();
//   try {
//       console.log(id);
//       const doc = await conn.getOne('category', id)
//       if (doc.userId != userId) {
//           // authenticate duser doesn't own this document.
//           res.status(403).end(); // end is like "quit this request"
//           return
//       }
//   } catch (e) {
//       console.log(e);
//       // the document doesn't exist.
//       res.status(404).end(e);
//       return;
//   }
//   // if we don't crash out -- call next and let crudlify deal with the details...
//   next();
// })

// //////////////////////////////////////////////////////////////////////
// // 'link' route authentication
// // Extra logic for GET / and POST / requests.
// app.use('/link', (req, res, next) => {
//   if (req.method === "POST") {
//       // always save authenticating user Id token.
//       // note -- were not enforcing uniqueness which isn't great.
//       // we don't currently have a great way to do this -- one option would be to 
//       // have a user collection track which collections have been filled
//       // It's a limitation for sure, but I'll just make that a front-end problem...
//       req.body.userId = req.user_token.sub
//   } else if (req.method === "GET") {
//       // on "index" -- always check for authentication.
//       req.query.userId = req.user_token.sub
//   }
//   next();
// })
// // Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// // side effect here will break patch patch by query, but that's OK for my purposes.
// app.use('/link/:id', async (req, res, next) => {
//   const id = req.params.ID;
//   const userId = req.user_token.sub
//   // let's check access rights for the document being read/updated/replaced/deleted
//   const conn = await Datastore.open();
//   try {
//       console.log(id);
//       const doc = await conn.getOne('category', id)
//       if (doc.userId != userId) {
//           // authenticate duser doesn't own this document.
//           res.status(403).end(); // end is like "quit this request"
//           return
//       }
//   } catch (e) {
//       console.log(e);
//       // the document doesn't exist.
//       res.status(404).end(e);
//       return;
//   }
//   // if we don't crash out -- call next and let crudlify deal with the details...
//   next();
// })


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
crudlify(app, { clothes: clothesSchemaYup, outfit: outfitSchemaYup, tag: tagSchemaYup, image: imageSchemaYup }, options);
export default app.init();