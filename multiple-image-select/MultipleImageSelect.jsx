import React, { useState, useEffect } from "react";
const ImageSelectBox = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  useEffect(() => {
    generateImageURLs();
  }, [selectedImages]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };
  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };
  const generateImageURLs = () => {
    const imagePromises = selectedImages.map((image) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(image);
      });
    });
    Promise.all(imagePromises).then((urls) => {
      setImageURLs(urls);
    });
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (oldIndex !== newIndex) {
      const updatedImages = [...selectedImages];
      const movedImage = updatedImages[oldIndex];
      updatedImages.splice(oldIndex, 1);
      updatedImages.splice(newIndex, 0, movedImage);
      setSelectedImages(updatedImages);
    }
  };
  return (
    <div>
      {" "}
      <h2 className="font-semibold my-4">
        Select multiple pictures for your room
      </h2>{" "}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {" "}
        <div className="flex flex-wrap">
          {" "}
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="w-1/4 p-2 relative"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {" "}
              <img
                src={imageURLs[index]}
                alt={`Selected Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />{" "}
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={() => removeImage(index)}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />{" "}
                </svg>{" "}
              </button>{" "}
            </div>
          ))}{" "}
          <div className="w-full p-2 flex justify-center items-center">
            {" "}
            <label
              htmlFor="image-input"
              className="flex items-center justify-center w-full rounded-lg cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-200 px-4 py-2 transition duration-300"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />{" "}
              </svg>{" "}
              <span className="text-gray-600">
                {" "}
                {selectedImages.length > 0
                  ? "Add more images"
                  : "Upload images"}{" "}
              </span>{" "}
              <input
                id="image-input"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={handleImageChange}
              />{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ImageSelectBox;
