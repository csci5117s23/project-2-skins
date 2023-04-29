// -------------- outfitFunctions.js ----------------
/*
 *  This file contains backend functions to make CRUD 
 *  requests for outfits/set of clothes (for the current user).
 * 
 *  CRUD Functions: 
 *      GET:    Get outfits
 *      POST:   Create an outfit
 *      PUT:    Edit and existing outfit
 *      DELETE: Delete and existing outfit
 */
// -- Get necessary environment variables --
const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const outfitUrl = backendBase + "/outfit";
const apiKey = process.env.CH_API_KEY_RW;

// ---------------------------------------------------------
// GET: Function get all of a user's outfits
// ---------------------------------------------------------
export async function getOutfits(authToken) {
    // Send GET request
    const result = await fetch(clothesUrl, {
        'method': 'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken
        }
    })
    // Return JSON list of user clothes
    return await result.json();
}

// ---------------------------------------------------------
// POST: Function to add a clothing article to user wardrobe
// ---------------------------------------------------------
export async function addClothes(authToken, outfit) {
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