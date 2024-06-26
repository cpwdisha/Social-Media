import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import FriendListWidget from "../../widget/FriendListWidget";
import { MyPostWidget } from "../../widget/MyPostWidget";
import PostsWidget from "../../widget/PostsWidget";
import { UserWidget } from "../../widget/UserWidget";
import Navbar from "../navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
    console.log(user)
  }, []);

  if(!user) return null;


  return (
    <div>
      <Navbar />
      <section
        className={`p-8 ${
          isNonMobileScreen ? "flex" : "block"
        } gap-8  justify-center`}
      >
        <div className={`${isNonMobileScreen ? "basis-[26%]" : undefined}`}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <div className="my-8">
            <FriendListWidget userId={userId}/>
          </div>
        </div>
        <div
          className={`${isNonMobileScreen ? "w-[42%]" : undefined} ${
            isNonMobileScreen ? undefined : "2rem mt-4"
          }`}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <div className="my-8"></div>
          <PostsWidget userId={userId} isProfile/>
        </div>
      </section>
    </div>
  ); 
};

export default ProfilePage;
