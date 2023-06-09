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

import { getOutfits } from "@/modules/outfitFunctions";

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
            }
        })
        // If an ID was provided no need to sort
        if (id !== "") {
            return await result.json();
        }
        // Return JSON list of user clothes (sorted by category alphabetically)
        const results = await result.json();
        const sortedResults = results.sort(sortAlphabetically);
        return sortedResults;
    } catch (error) {
        console.log("Failed to get clothes. " + error);
    }
}

// ---------------------------------------------------------------
// GET: Function get all of a user's clothes based on category
// ---------------------------------------------------------------
// * Can get a specific ID if provided one.
export async function getClothesByCategory(authToken, category, id="") {
    // Make request to get all clothes
    const allClothes = await getClothes(authToken, id);
    // From list of all clothes, get the ones of the specified category
    return filterClothesByCategory(allClothes, category);
}

// --------------------------------------------------------------------
// GET: Function get all of a user's clothes based on category & name
// --------------------------------------------------------------------
// * Can get a specific ID if provided one.
export async function getClothesByName(authToken, category, query="", id="") {
    const categoryClothes = await getClothesByCategory(authToken, category, id);
    // From list of clothes of specified category, get results based on text input
    return filterClothesByName(categoryClothes, query);
}

// --------------------------------------------------------------------------
// Helper function to filter out by category for a parameter list of clothes
// --------------------------------------------------------------------------
export function filterClothesByCategory(clothesList, category) {
    if (clothesList === null || clothesList === undefined) {
        console.log("Invalid input.");
        return;
    }
    return Object.values(clothesList).filter( (item) => (item !== undefined && item.category === category));
}

// --------------------------------------------------------------------------
// Helper function to filter out by name for a parameter list of clothes
// --------------------------------------------------------------------------
export function filterClothesByName(clothesList, nameText) {
    if (clothesList === null || clothesList === undefined) {
        console.log("Invalid input.");
        return;
    }
    return Object.values(clothesList).filter( 
        (item) => 
            ((String(item.name).toLowerCase()).includes((String(nameText).toLowerCase()))
        )
    );
}

// ----------------------------------------------------------------------------------------------------
// Helper function to filter out by tag for a parameter list of clothes
// Reference for filtering by nested array elements:
// https://stackoverflow.com/questions/51650390/filter-nested-array-in-object-array-by-array-of-values
// ----------------------------------------------------------------------------------------------------
export function filterClothesByTag(clothesList, tagText) {
    if (clothesList === null || clothesList === undefined) {
        console.log("Invalid input.");
        return;
    }
    const results = Object.values(clothesList).filter( 
        (item) => 
            item.tags.every( 
                (tag) =>
                    ((String(tag).toLowerCase()).includes(String(tagText).toLowerCase()))
            )
    ); // Get rid of zero-length lists
    return results.filter( (item) => (item.tags.length > 0) );
}

// -----------------------------------------------------------------------------
// Helper function to filter out by name OR tag for a parameter list of clothes
// ------------------------------------------------------------------------------
export function filterClothesByNameOrTag(clothesList, searchText) {
    if (clothesList === null || clothesList === undefined) {
        console.log("Invalid input.");
        return;
    }
    const nameList = filterClothesByName(clothesList, String(searchText));
    const tagsList = filterClothesByTag(clothesList, String(searchText));
    return Array.from(new Set(tagsList.concat(nameList)));
}

// --------------------------------------------------------------------------------------------------------
// Helper function to sort clothes list by category alphabetically
// Reference: https://stackoverflow.com/questions/19259233/sorting-json-by-specific-element-alphabetically
// --------------------------------------------------------------------------------------------------------
export function sortAlphabetically(item1, item2) {
    // Case-insensitive comparison
    item1 = String(item1.category).toLowerCase();
    item2 = String(item2.category).toLowerCase();
    return (item1 < item2) ? -1 : (item1 > item2) ? 1 : 0;
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
                imageUrl: clothing.imageUrl,
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
        console.log(JSON.stringify(clothing));
        const result = await fetch(clothesUrl + "/" + clothing._id, {
            'method': 'PUT',
            'headers': {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            'body': JSON.stringify(clothing)
        });
        // Return newly-made clothing entry
        let test = await result.json();
        console.log(test);
        return test;
    } catch (error) {
        console.log("Failed to edit clothes. " + error);
    }
}

// -----------------------------------------------------------------
// DELETE: Function to remove a clothing article from user wardrobe
// -----------------------------------------------------------------
export async function deleteClothes(authToken, clothingId) {
    // Send DELETE request
    try {
        const result = await fetch(clothesUrl + "/" + clothingId, {
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