import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";

export function GalleryWithCarousel({ accommodationId }) {
    const [images, setImages] = useState([]);

    const formatImage = (base64Image) => `data:image/jpeg;base64,${base64Image}`;


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`/api/accommodation/${accommodationId}/images`);

                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }

                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [accommodationId]);

    return (
        <Carousel loop={true} autoplay={true} className="rounded-xl">
            {images.length > 0 ? (
                images.map((base64Image, index) => (
                    <img
                        key={index}
                        src={formatImage(base64Image)}
                        alt={`image ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                    />
                ))
            ) : (
                <img
                    src="https://via.placeholder.com/800x600.png?text=No+Images"
                    alt="no images"
                    className="h-full w-full object-cover object-center"
                />
            )}
        </Carousel>
    );
}