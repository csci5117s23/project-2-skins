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

import {
    getClothes
} from "./clothesFunctions"

// ---------------------------------------------------------
// GET: Function get all of a user's outfits
// ---------------------------------------------------------
// * Can get a specific ID if provided one.
export async function getOutfits(authToken, id="") {
    // Send GET request
    try {
        const result = await fetch(outfitUrl + "/" + id, {
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

// ----------------------------------------------------------------
// GET: Function get outfit based on input date worn (not created)
// Reference for formatting dates to US format : 
// https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object#:~:text=var%20dateObj%20%3D%20new%20Date%20%28%29%3B%20var%20month,set%20new%20date%20and%20give%20the%20above%20values
// ----------------------------------------------------------------
export async function getOutfitByDateWorn(authToken, date, id="") {
    // Get all outfits
    const allOutfits = await getOutfits(authToken, id);
    console.log("All outfits: " + JSON.stringify(allOutfits));
    try { // From list of all outfits, get the one of the specified date
        const result = Object.values(allOutfits).filter( 
            (outfit) => 
                (new Date(outfit.dateWorn).toLocaleDateString("en-US") === new Date(date).toLocaleDateString("en-US")) 
        );
        console.log("Result: " + JSON.stringify(result));
        return result;
    } catch (error) {
        console.log("Failed to get outfit by date. " + error);
    }
} 

// ---------------------------------------------------------------------
// GET: Function to fill an outfit array based on the Ids retrieved
// ---------------------------------------------------------------------
export async function getOutfitArrayFromIds(authToken, outfit) {
    if (outfit === null || outfit === undefined) {
        console.log("No outfit provided.");
        return;
    }

    const onePieceId = outfit?.onePieceId;
    const topIds = outfit?.topId;
    const bottomIds = outfit?.bottomId;
    const shoesId = outfit?.shoesId;
    const accessoriesId = outfit?.accessoriesId;
    

    // Get one piece item
    const onePiece = await getClothes(authToken, outfit.onePieceId);
    console.log(onePiece);

    // Get shoes
    const shoes = await getClothes(authToken, outfit.shoesId);
    console.log(shoes)
}

// ---------------------------------------------------------
// POST: Function to add a user outfit
// ---------------------------------------------------------
export async function addOutfit(authToken, outfit) {
    // If no date to wear/worn provided, don't add outfit.
    if (outfit.dateWorn === null) {
        console.log("Need to provide a date to wear.");
        return;
    }
    // Send POST request
    try {
        const result = await fetch(outfitUrl+"/", {
            'method': 'POST',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            'body': JSON.stringify({
                topId:          outfit.topId,
                bottomId:       outfit.bottomId,
                shoesId:        outfit.shoesId,  
                accessoriesId:  outfit.accessoriesId,
                onePieceId:     outfit.onePieceId,
                dateWorn:       outfit.dateWorn,
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
        const result = await fetch(outfitUrl + "/" + outfit._id, {
            'method': 'PUT',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            'body': JSON.stringify(outfit)
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
export async function deleteOutfit(authToken, outfitId) {
    // Send DELETE request
    try {
        const result = await fetch(outfitUrl + "/" + outfitId, {
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