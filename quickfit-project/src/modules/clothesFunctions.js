// -------------- clothesFunctions.js ----------------
/*
 *  This file contains backend functions to make CRUD 
 *  requests for clothing tags (for the current user).
 * 
 *  CRUD Functions: 
 *      GET:    Get clothing tags
 *      POST:   Create a clothing tag
 *      PUT:    Edit and existing clothing tag
 *      DELETE: Delete and existing clothing tag
 */
// -- Get necessary environment variables --
const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const clothesUrl = backendBase + "/clothes";
const jwtTemplateName = "codehooks-quickfit";

// ---------------------------------------------------------
// GET: Function get all of a user's clothes
// ---------------------------------------------------------
export async function getClothes() {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });
    
    // Send GET request
    const result = await fetch(clothesUrl, {
        'method': 'GET',
        'headers': {
            // 'Authorization': 'Bearer ' + token
        }
    })
    // Return JSON list of user clothes
    return await result.json();
}

// ---------------------------------------------------------
// POST: Function to add a clothing article to user wardrobe
// ---------------------------------------------------------
export async function addClothes(authToken, clothing) {

    // If category or name is empty, don't add clothing article.
    if (clothing.category === "" || clothing.name === "") {
        console.log("Error. Clothing category/name empty");
        return;
    }
    // Send POST request
    const result = await fetch(clothesUrl, {
        'method': 'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            category: clothing.category,
            name:     clothing.name,
            color:    clothing.color,  
            tags:     clothing.tags,
        }),
    })
    // Return newly-made clothing entry
    return await result.json();
}

// -------------------------------------------------------------------------
// PUT: Function to edit an existing clothing article from user wardrobe
// -------------------------------------------------------------------------
export async function editClothes(clothing) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // Send PUT request
    const result = await fetch(clothesUrl + clothing._id, {
        'method': 'PUT',
        'headers': {
            // 'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            clothing
        })
    });
    // Return newly-made clothing entry
    return await result.json();
}

// -----------------------------------------------------------------
// DELETE: Function to remove a clothing article from user wardrobe
// -----------------------------------------------------------------
export async function deleteClothes(authToken, clothing) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // Send DELETE request
    const result = await fetch(clothesUrl + clothing._id, {
        'method': 'DELETE',
        'headers': {
            'Authorization': 'Bearer ' + authToken
        },
    })
    // Return removed article as JSON
    return await result.json();
}