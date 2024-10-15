import React, { useEffect, useState } from "react";
export function FeaturedImageGallery({ images }) {
	const [active, setActive] = useState(null);

    useEffect(() => {
        if (images.length > 0) {
            setActive(images[0]);
        }
    }, [images]);

	const formatImage = (base64Image) => `data:image/jpeg;base64,${base64Image}`;    

	if (!images || images.length === 0) {
		return <div>Loading images...</div>;
	}

	return (
		<div className="grid gap-4">
			<div>
				<img
					className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
					src={active ? formatImage(active) : ""}
					alt="Accommodation image"
				/>
			</div>
			<div className="grid grid-cols-5 gap-4">
				{images.map((base64Image, index) => (
					<div key={index}>
						<img
							onClick={() => setActive(base64Image)}
							src={formatImage(base64Image)}
							className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
							alt={`Gallery image ${index + 1}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
