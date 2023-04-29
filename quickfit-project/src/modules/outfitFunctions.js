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
    try {
        const result = await fetch(clothesUrl, {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'x-api-key': apiKey,
            }
        })
        // Return JSON list of user clothes
        return await result.json();
    } catch (error) {
        console.log("Failed to get outfits. " + error);
    }
}

// ---------------------------------------------------------
// POST: Function to add a user outfit
// ---------------------------------------------------------
export async function addOutfit(authToken, outfit) {
    // Send POST request
    try {
        const result = await fetch(outfitUrl, {
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
        });
        // Return newly-made clothing entry
        return await result.json();
    } catch (error) {
        console.log("Failed to add outfit. " + error);
    }
}

// -------------------------------------------------------------------------
// PUT: Function to edit an existing user outfit
// -------------------------------------------------------------------------
export async function editOutfit(authToken, outfit) {
    // Send PUT request
    try {
        const result = await fetch(outfitUrl + outfit._id, {
            'method': 'PUT',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            'body': JSON.stringify({
                outfit
            })
        });
        // Return newly-made clothing entry
        return await result.json();
    } catch (error) {
        console.log("Failed to edit outfit. " + error);
    }
}

// -----------------------------------------------------------------
// DELETE: Function to remove am user outfit
// -----------------------------------------------------------------
export async function deleteOutfit(authToken, outfit) {
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
        console.log("Failed to delete outfit. " + error);
    }
}