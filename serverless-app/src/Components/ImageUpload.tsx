import React, { useState } from 'react';
import { imageupload } from "../Services/imageUploadService";
import { toast } from 'react-toastify';

export const ImageUploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    };

    const fileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            try {
                const data = await imageupload(file);
                console.log('Success:', data);
                toast.success("Image uploaded successfully");
            } catch (error) {
                toast.error("Image upload failed");
                console.error("Image upload failed", error);
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-lg font-semibold text-gray-800 mb-4 text-center">Upload Image</h1>
            <form onSubmit={fileUpload} className="flex flex-col items-center space-y-3">
                <input type="file" onChange={fileChange} className="form-input block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 " />
                <button type="submit" disabled={!file} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-100">
                    Upload
                </button>
            </form>
        </div>

    );
}

