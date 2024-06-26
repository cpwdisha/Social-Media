import { MdPersonAdd, MdPersonRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center gap-4">
       <UserImage image={userPicturePath}/>
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <h5 className="text-white font-medium cursor-pointer hover:text-primary-light">
            {name}
          </h5>
          <p className="text-gray-400 text-xs">{subtitle}</p>
        </div>
      </div>
      <button
        onClick={() => patchFriend()}
        className="bg-primary-light p-2 rounded-full"
      >
        {isFriend ? (
          <MdPersonRemove className="text-primary-dark" />
        ) : (
          <MdPersonAdd className="text-primary-dark" />
        )}
      </button>
    </div>
  );
};

export default Friend;
