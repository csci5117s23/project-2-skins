// clothesFunctions.js
// Get necessary environment variables
const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const clothesUrl = backendBase + '/clothes';

// ---------------------------------------------------------
// GET: Function get all of a user's clothes
// ---------------------------------------------------------
export async function getClothes() {
    const result = await fetch(clothesUrl, {
        'method': 'GET',
        'headers': {
            // 'Authorization': 'Bearer ' + authToken
        }
    })
    return await result.json();
}
// ---------------------------------------------------------
// POST: Function to add a clothing article to user wardrobe
// ---------------------------------------------------------
export async function addClothes(authToken, clothing) {
    // Get authorization token from JWT codehooks template
    // const token = await getToken({ template: "codehooks" });

    // If category or name is empty, don't add clothing article.
    if (clothing.category === "" || name === "") {
        return;
    }
    const result = await fetch(clothesUrl, {
        'method': 'POST',
        'headers': {
            // 'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            category: category,
            clothingName: name,
            tags: [color],
        }),
    })
    return await result.json();
}
// -------------------------------------------------------------------------
// DELETE: Function to edit an existing clothing article from user wardrobe
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