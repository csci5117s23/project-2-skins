// -------------- clothesFunctions.js ----------------
/*
 *  This file contains backend functions to make CRUD 
 *  requests for clothing articles (for the current user).
 * 
 *  CRUD Functions: 
 *      GET:    Get clothing articles
 *      POST:   Create a clothing article
 *      PUT:    Edit and existing clothing article
 *      DELETE: Delete and existing clothing article
 */
// -- Get necessary environment variables --
const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const clothesUrl = backendBase + "/clothes";
const apiKey = process.env.CH_API_KEY_RW;

// ---------------------------------------------------------
// GET: Function get all of a user's clothes
// ---------------------------------------------------------
// * Can get a specific ID if provided one.
export async function getClothes(authToken, id="") {
    // Send GET request
    try {
        const result = await fetch(clothesUrl + "/" + id, {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'x-api-key': apiKey,
            }
        })
        // Return JSON list of user clothes
        return await result.json();
    } catch (error) {
        console.log("Failed to get clothes. " + error);
    }
}

// ---------------------------------------------------------------
// GET: Function get all of a user's categories based on category
// ---------------------------------------------------------------
// * Can get a specific ID if provided one.
export async function getClothesByCategory(authToken, category, id="") {
    // Make request to get all clothes
    const allClothes = await getClothes(authToken, id);

    // From list of all clothes, get the ones of the specified category
    return filterClothesByCategory(allClothes, category);
}

// --------------------------------------------------------------------------
// Helper function to filter out by category for a parameter list of clothes
// --------------------------------------------------------------------------
export function filterClothesByCategory(clothesList, category) {
    return Object.values(clothesList).filter( (item) => (item.category === category));
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
    try {
        const result = await fetch(clothesUrl, {
            'method': 'POST',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
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
    } catch (error) {
        console.log("Failed to add clothes. " + error);
    }
}

// -------------------------------------------------------------------------
// PUT: Function to edit an existing clothing article from user wardrobe
// -------------------------------------------------------------------------
export async function editClothes(authToken, clothing) {
    // Send PUT request
    try {
        const result = await fetch(clothesUrl + clothing._id, {
            'method': 'PUT',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            'body': JSON.stringify(clothing)
        });
        // Return newly-made clothing entry
        return await result.json();
    } catch (error) {
        console.log("Failed to edit clothes. " + error);
    }
}

// -----------------------------------------------------------------
// DELETE: Function to remove a clothing article from user wardrobe
// -----------------------------------------------------------------
export async function deleteClothes(authToken, clothing) {
    // Send DELETE request
    try {
        const result = await fetch(clothesUrl + clothing._id, {
            'method': 'DELETE',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'x-api-key': apiKey,
            },
        })
        // Return removed article as JSON
        return await result.json();
    } catch (error) {
        console.log("Failed to delete clothes. " + error);
    }
}