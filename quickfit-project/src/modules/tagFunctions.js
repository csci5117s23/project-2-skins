// ---------------- tagFunctions.js ----------------
import * as React from 'react';
import { useAuth } from "@clerk/nextjs";
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
const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
const { isLoaded, userId, sessionId, getToken } = useAuth();

// ---------------------------------------------------------
// GET: Function get all of a user's tags
// ---------------------------------------------------------
export async function getTags(authToken) {
    // Send GET request
    const result = await fetch(tagsUrl, {
        'method': 'GET',
        'headers': {
            // 'Authorization': 'Bearer ' + token
        }
    })
    // Return JSON list of user tags
    return await result.json();
}

// ---------------------------------------------------------
// POST: Function to add a tag to user clothing tags list
// ---------------------------------------------------------
export async function addTag(tag) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // If tag name is null/empty, don't add clothing article.
    if (tag.name === null || tag.name === "") {
        console.log("Error. Tag name invalid.");
        return;
    }
    // Send POST request
    const result = await fetch(tagsUrl, {
        'method': 'POST',
        'headers': {
            // 'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            name: tag.name
        }),
    })
    // Return newly-made tag entry
    return await result.json();
}

// -------------------------------------------------------------------------
// PUT: Function to edit an existing user tag
// -------------------------------------------------------------------------
export async function editTag(tag) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // Send PUT request
    const result = await fetch(tagsUrl + tag._id, {
        'method': 'PUT',
        'headers': {
            // 'Authorization': 'Bearer ' + token,
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
export async function deleteTag(clothing) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // Send DELETE request
    const result = await fetch(clothesUrl + clothing._id, {
        'method': 'DELETE',
        'headers': {
            // 'Authorization': 'Bearer ' + token
        },
    })
    // Return removed tag as JSON
    return await result.json();
}