import React, { useState } from "react";
import { useEffect } from "react";

export const AdverWidget = () => {
    const [imageData,setImageData] = useState("");
    const getImage = async()=>{
         const response = await fetch("https://picsum.photos/seed/picsum/info");
         const data = await response.json();
         setImageData(data);
         console.log(data);
    }
    useEffect(()=>{
        getImage();
    },[]);
  return (
    <div className="rounded-lg bg-blue-600 p-4 flex flex-col gap-4 m-8">
      <div className="flex flex-between justify-between items-center">
        <p>Sponsored</p>
        <p>Create Ad</p>
      </div>
      <img
        src={`${imageData.download_url}`}
        alt="advertisment"
        className="rounded-xl my-3"
      />
      <div className="flex flex-between justify-between items-center">
        <p>{imageData.author}</p>
        <p>{imageData.author}.com</p>
      </div>
      <p className="mt-2">{imageData.author}, {imageData.width} {imageData.height}</p>
    </div>
  );
};
