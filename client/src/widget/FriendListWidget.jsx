import Friend from "../components/Friend";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import { useEffect } from "react";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const reponse = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await reponse.json();
    dispatch(() => setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);
  return (
    <div className="rounded-lg bg-blue-600 p-4 flex flex-col gap-4">
      <p className="mb-6 font-medium">FriendList</p>
      <div className="flex flex-col gap-6">
        {friends.map((friend)=>(
          <Friend
          key={friend._id}
          friendId={friend._id}
          name={`${friend.firstName} ${friend.lastName}`}
          subtitle={friend.occupation}
          userPicturePath={friend.picturePath}
          ></Friend>
        ))}
      </div>
    </div>
  );
};
export default FriendListWidget;
