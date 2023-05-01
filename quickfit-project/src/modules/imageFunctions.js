// Code from Upper-Five tech share on codehooks image uploads:
// https://github.com/jasonwoitalla/csci5117-upper-five-tech-share/blob/main/src/hooks/useCloudStorage.js
// https://github.com/jasonwoitalla/csci5117-upper-five-tech-share/blob/main/src/pages/gallery.js

import Hex from "crypto-js/enc-hex";
import SHA1 from "crypto-js/sha1";
import WordArray from "crypto-js/lib-typedarrays";

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
const CODEHOOKS_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const CODEHOOKS_KEY = process.env.CH_API_KEY_RW;

export async function useCloudUpload(authToken, file) {
    // 1. Fetch upload URL
    try {
        const response = await fetch(CODEHOOKS_URL+"/get_upload_url", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + authToken,
                "x-api-key": CODEHOOKS_KEY,
            },
        });
        const data = await response.json();

        // 2. Get file details
        const fileName = file.name;
        const mimeType = file.type;
        const fileSize = file.size;

        const reader = new FileReader();
        reader.addEventListener("loadend", async (e) => {
            const checksum = SHA1(WordArray.create(reader.result)).toString(Hex);

            // 3. Use the upload URL to upload the file
            const uploadResponse = await fetch(data.uploadUrl, {
                method: "POST",
                headers: {
                    "Authorization": data.uploadAuth,
                    "Content-Type": mimeType,
                    "Content-Length": fileSize,
                    "X-Bz-File-Name": fileName,
                    "X-Bz-Content-Sha1": checksum,
                },
                body: file,
            });
            const uploadData = await uploadResponse.json();

            // 4. Image uploaded, store the image details in the database
            const result = await fetch(`${CODEHOOKS_URL}/store_file_id`, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + authToken,
                    "x-api-key": CODEHOOKS_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: uploadData.fileName,
                    id: uploadData.fileId,
                }),
            });

        });
        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.log("Failed to cloud upload image. " + error);
    }
}

export async function getDownloadUrlForLatest(authToken) {
    // 1. Get the download url
    const downloadRes = await fetch(`${CODEHOOKS_URL}/get_download_url`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authToken,
            "x-api-key": CODEHOOKS_KEY,
        },
    });
    const downloadData = await downloadRes.json();

    // 2. Get the file ID and download URL from the server
    const res = await fetch(`${CODEHOOKS_URL}/get_all_images`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authToken,
            "x-api-key": CODEHOOKS_KEY,
        },
    });
    const resData = await res.json();
    
    let latestId = resData[resData.length - 1].id;

    // 2. Build our download urls
    const downloadUrl = `${downloadData.downloadUrl}/b2api/v2/b2_download_file_by_id?fileId=${latestId}`;
    return String(downloadUrl);
}

// Function to download image from a given download URL
export async function downloadImage(downloadUrl) {
    // 3. Fetch request for each download url
    const response = await fetch(downloadUrl);
    const blob = downloadUrl.blob();
    const src = URL.createObjectURL(blob);
    return src;
}

export async function useCloudDownloads(downloadUrls) {
    const dataPromises = downloadUrls.map((url) => fetch(url));
    const data = await Promise.all(dataPromises);

    const blobPromises = data.map((blob) => blob.blob());
    const blobs = await Promise.all(blobPromises);

    const urlPromises = blobs.map((blob) => URL.createObjectURL(blob));
    const urls = await Promise.all(urlPromises);

    return urls;
}