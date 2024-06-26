import React from "react";
import { GrLocation } from "react-icons/gr";
import { BsBagFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import UserImage from "../components/UserImage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
  };

    useEffect(() => {
      getUser();
    }, []);

    if (!user) {
      return null;
    }

    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
      friends,
    } = user;

  return (
    <div className="rounded-lg bg-blue-600 p-4 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        {/* ITEM 1 which is flex again  */}
        <div
          className="flex flex-row gap-4"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <div className="hover:cursor-pointer">
            <UserImage image={picturePath} />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">
              {firstName} {lastName}
            </p>
            <p className="opacity-50">{friends?.length} friends</p>
          </div>
        </div>
        <BsPersonFillAdd
          size={20}
          className="hover:cursor-pointer"
        ></BsPersonFillAdd>
      </div>
      <p className="border-gray-500 opacity-80 bg-gradient-to-r from-yellow-200 to-cyan-500 p-[1px]"></p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-10">
          <GrLocation size={25}></GrLocation>
          <p>{location}</p>
        </div>
        <div className="flex flex-row gap-10">
          <BsBagFill size={25}></BsBagFill>
          <p>{occupation}</p>
        </div>
      </div>
      <p className="border-gray-500 opacity-80 bg-gradient-to-r from-yellow-200 to-cyan-500 p-[1px]"></p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <p>Who's viewed your Profile</p>
          <p>{viewedProfile}</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>Impression's of your post</p>
          <p>{impressions}</p>
        </div>
      </div>
      <p className="border-gray-500 opacity-80 bg-gradient-to-r from-yellow-200 to-cyan-500 p-[1px]"></p>
      <div className="flex flex-col">
        <h1 className="font-bold mb-3">Social Profiles</h1>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            <img src="../assets/twitter.png" alt="twitter" className="p-3" />
            <div className="flex flex-col">
              <p>Twitter</p>
              <p>Social Network</p>
            </div>
          </div>
          <AiFillEdit></AiFillEdit>
        </div>
        <div className="flex flex-row justify-between items-center mt-3">
          <div className="flex flex-row gap-2">
            <img src="../assets/linkedin.png" alt="linkedIn" className="p-3" />
            <div className="flex flex-col">
              <p>LinkedIn</p>
              <p>Social Network</p>
            </div>
          </div>
          <AiFillEdit></AiFillEdit>
        </div>
      </div>
    </div>
  );
};
