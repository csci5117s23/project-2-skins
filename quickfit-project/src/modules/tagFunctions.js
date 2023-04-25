// ---------------- tagFunctions.js ----------------
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
const tagsUrl = backendBase + '/tags';

// ---------------------------------------------------------
// GET: Function get all of a user's tags
// ---------------------------------------------------------
export async function getTags() {
    const result = await fetch(clothesUrl, {
        'method': 'GET',
        'headers': {
            // 'Authorization': 'Bearer ' + authToken
        }
    })
    return await result.json();
}

// ---------------------------------------------------------
// POST: Function to add a clothing tag to user tags list
// ---------------------------------------------------------
export async function addTag(tag) {
    // If tag name is invalid don't add it.
    if (tag.name === "" || tag.name === null) {
        console.log("Error. Tag name empty");
        return;
    }
    
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: "codehooks" });

    // Send post request to add clothing to DB
    const result = await fetch(clothesUrl, {
        'method': 'POST',
        'headers': {
            // 'Authorization': 'Bearer ' + authToken,
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
export async function editClothes(authToken, clothing) {
    const result = await fetch(clothesUrl + clothing._id, {
        'method': 'PUT',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            clothing
        })
    });
    return await result.json();
}

// -----------------------------------------------------------------
// DELETE: Function to remove a clothing article from user wardrobe
// -----------------------------------------------------------------
export async function deleteClothes(authToken, clothing) {
    const result = await fetch(clothesUrl + clothing._id, {
        'method': 'DELETE',
        'headers': {
            'Authorization': 'Bearer ' + authToken
        },
    })
    return await result.json();
}