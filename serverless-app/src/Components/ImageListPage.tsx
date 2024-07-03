import React, { useEffect, useState } from 'react';
import { Imageurl } from '../interfaces/ImageListResponse';
import { imageList } from '../Services/imageListService';

const ImageListPage: React.FC = () => {
    const [images, setImages] = useState<Imageurl[]>([]);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const urls = await imageList();
                setImages(urls.map((url: string) => ({ url })));
                // console.log(urls);
            } catch (err) {
                console.error(err);
            }
        };

        fetchImages();
    }, []);
    return (
        <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Images</h1>
            <div className="image-gallery grid grid-cols-3 gap-4 p-4">
                {images.map((obj, index) => (
                    <div key={index} className="w-45 h-45 overflow-hidden">
                        <img src={obj.url} alt={`S3 object ${index + 1}`} className="object-cover w-full h-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageListPage;