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
const tagsUrl = backendBase + "/tags";

// ---------------------------------------------------------
// GET: Function get all of a user's tags
// ---------------------------------------------------------
export async function getTags(authToken) {
    // Send GET request
    const result = await fetch(tagsUrl, {
        'method': 'GET',
        'headers': {
            // 'Authorization': 'Bearer ' + authToken
        }
    })
    // Return JSON list of user tags
    return await result.json();
}

// ---------------------------------------------------------
// POST: Function to add a tag to user clothing tags list
// ---------------------------------------------------------
export async function addTag(authToken, tagName) {
    // Send POST request
    const result = await fetch(tagsUrl, {
        'method': 'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            name: tagName,
        }),
    })
    // Return newly-made tag entry
    return await result.json();
}

// -------------------------------------------------------------------------
// PUT: Function to edit an existing user tag
// -------------------------------------------------------------------------
export async function editTag(authToken, tag) {
    // Send PUT request
    const result = await fetch(tagsUrl + tag._id, {
        'method': 'PUT',
        'headers': {
            // 'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({tag})
    });
    // Return newly-edited tag JSON
    return await result.json();
}

// -----------------------------------------------------------------
// DELETE: Function to remove a tag 
// -----------------------------------------------------------------
export async function deleteTag(authToken, tag) {
    // Send DELETE request
    const result = await fetch(tagsUrl + tag._id, {
        'method': 'DELETE',
        'headers': {
            // 'Authorization': 'Bearer ' + authToken
        },
    })
    // Return removed tag as JSON
    return await result.json();
}