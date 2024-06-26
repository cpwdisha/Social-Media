import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

/* READ  */
export const getUser = async (req, resp) => {
  try {
    /* /user/:id so params hai la liye  */
    const { id } = req.params;
    /* finding that user */
    const user = await User.findById(mongoose.Types.ObjectId(id));
    ///////check later because password is also going
    resp.status(200).json(user);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

/* READ */
export const getUserFriends = async (req, resp) => {
  try {
    /* /user/:id so params hai la liye  */
    const { id } = req.params;
    /* finding that user */
    const user = await User.findById(mongoose.Types.ObjectId(id));

    //   finding the friends
    // new concept doubt
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(mongoose.Types.ObjectId(id)))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    resp.status(200).json(formattedFriends);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

/*UPDATE */

export const addRemoveFriend = async (req, resp) => {
  try {
    let { id, friendId } = req.params;
    const user = await User.findById(mongoose.Types.ObjectId(id));
    const friend = await User.findById(mongoose.Types.ObjectId(friendId));

    if (user.friends.includes(friendId)) {
      // removing id of user from friend
      user.friends = user.friends.filter((id) => id !== friendId);
      // removing id of friend from user
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    /* Saving the Updated List */
    await user.save();
    await friend.save();

    /* Formating the FriendList sending back all the friends of the user now */
    /* Making api call to each friend in the friendList of User */
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(mongoose.Types.ObjectId(id)))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    resp.status(200).json(formattedFriends);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};
