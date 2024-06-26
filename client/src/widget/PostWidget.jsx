import {
  MdChatBubbleOutline,
  MdFavoriteBorder,
  MdFavorite,
  MdShare,
} from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import Friend from "../components/Friend";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };


  return (
    <div className="rounded-lg bg-blue-600 p-4 flex flex-col gap-4 m-8">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="mt-4 text-neutral">{description}</p>
      {picturePath && (
        <img
          className="w-full h-auto mt-3 rounded-lg"
          alt="post"
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div className="mt-2">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row items-center gap-1.5">
            <button onClick={patchLike}>
              {isLiked ? (
                <MdFavorite className="text-primary" />
              ) : (
                <MdFavoriteBorder />
              )}
            </button>
            <p>{likeCount}</p>
          </div>

          <div className="flex flex-row items-center gap-1.5">
            <button onClick={() => setIsComments(!isComments)}>
              <MdChatBubbleOutline />
            </button>
            <p>{comments.length}</p>
          </div>
        </div>

        <button>
          <MdShare />
        </button>
      </div>
      {isComments && (
        <div className="mt-2">
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              <hr />
              <p className="m-2 pl-4">{comment}</p>
            </div>
          ))}
          <hr />
        </div>
      )}
    </div>
  );
};

export default PostWidget;
