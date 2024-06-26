import React from "react";
import UserImage from "../components/UserImage";
import { IoMdImages } from "react-icons/io";
import { AiOutlinePaperClip } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { AiFillAudio } from "react-icons/ai";
import Button from "../components/Button";
import DropZone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { AiOutlineEdit } from "react-icons/ai";


export const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const handlePost = async () => {
    console.log("hello");
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    console.log(image);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image[0].name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const posts = await response.json();
      dispatch(() => setPost(posts));
      console.log(posts);
    }

    setImage(null); //resetting after submitting
    setPost(""); // resetting after submitting
  };

  return (
    <div className="rounded-lg bg-blue-600 p-4 flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <UserImage image={picturePath} />
        <input
          type="text"
          className="px-4 py-2 rounded-2xl w-full text-black"
          placeholder="Write Something ..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>
      {isImage && (
        <section className="border-[1px] border-solid rounded-md mt-2 p-4">
          <DropZone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFile) => setImage(acceptedFile)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-dashed border-2 p-8 hover:cursor-pointer"
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p className="text-white">Add Picture Here</p>
                ) : (
                  <div className="flex flex-betweeen justify-between items-center">
                    {image[0].name}
                    <AiOutlineEdit size={20}></AiOutlineEdit>
                  </div>
                )}
              </div>
            )}
          </DropZone>
        </section>
      )}
      <p className="border-gray-500 opacity-80 bg-gradient-to-r from-yellow-200 to-cyan-500 p-[1px]"></p>
      {isNonMobileScreen ? (
        <div className="flex flex-row justify-between items-center">
          <div
            onClick={() => {
              setIsImage(!isImage);
            }}
            className="flex flex-row gap-1"
          >
            <IoMdImages size={25} className="hover:cursor-pointer" />
            <p>Image</p>
          </div>
          <div className="flex flex-row gap-1">
            <AiOutlinePaperClip size={25} className="hover:cursor-pointer" />{" "}
            <p>Clip</p>
          </div>

          <div className="flex flex-row gap-1">
            <GrAttachment size={20} className="hover:cursor-pointer" />
            <p>Attachment</p>
          </div>
          <div className="flex flex-row gap-1">
            <AiFillAudio size={20} className="hover:cursor-pointer" />
            <p>Audio</p>
          </div>
          <div
            onClick={() => {
              handlePost();
            }}
          >
            <Button
              type="submit"
              label="post"
              className="hover:cursor-pointer"
              disabled={!post}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-stretch">
          <div className="flex flex-row justify-between items-center">
            <div
              onClick={() => {
                setIsImage(!isImage);
              }}
              className="flex flex-row gap-1"
            >
              <IoMdImages size={25} className="hover:cursor-pointer" />
              <p>Image</p>
            </div>

            <div className="flex flex-row gap-1">
              <GrAttachment size={20} className="hover:cursor-pointer" />
              <p>Attachment</p>
            </div>
            <div className="flex flex-row gap-1">
              <AiFillAudio size={20} className="hover:cursor-pointer" />
              <p>Audio</p>
            </div>
          </div>
          <div
            onClick={() => {
              handlePost();
            }}
            className="grid mt-4"
          >
            <Button
              type="submit"
              label="Post"
              className="hover:cursor-pointer"
              disabled={!post}
            />
          </div>
        </div>
      )}
    </div>
  );
};
