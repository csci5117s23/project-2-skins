import { useState, useEffect } from "react";

export default function ImageUploadForm({ onSubmit, reset }) {
    const [fileUpload, setFileUpload] = useState("Choose an image...");

    function handleFileOnChange(e) {
        setFileUpload(e.target.files[0].name);
    }

    useEffect(() => {
        setFileUpload("Choose an image...");
    }, [reset]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="file is-boxed">
                    <label className="file-label">
                        <input
                            className="file-input"
                            type="file"
                            name="image"
                            id="imageField"
                            required="required"
                            accept="image/*"
                            onChange={handleFileOnChange}
                        />
                        <span className="file-cta">
                            <span className="file-label">{fileUpload}</span>
                        </span>
                    </label>
                </div>
                <div className="field">
                    <div className="control">
                        <input
                            type="submit"
                            value="Upload"
                            className="button is-link"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}