import { useSelector } from "react-redux";
import useMediaQuery from "../../hooks/useMediaQuery";
import { AdverWidget } from "../../widget/AdverWidget";
import FriendListWidget from "../../widget/FriendListWidget";
import { MyPostWidget } from "../../widget/MyPostWidget";
import PostsWidget from "../../widget/PostsWidget";
import { UserWidget } from "../../widget/UserWidget";
import Navbar from "../navbar";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <section
        className={`p-8 ${
          isNonMobileScreen ? "flex" : "block"
        } gap-2  justify-between`}
      >
        <div className={`${isNonMobileScreen ? "basis-[26%]" : undefined}`}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div
          className={`${isNonMobileScreen ? "w-[42%]" : undefined} ${
            isNonMobileScreen ? undefined : "2rem mt-4"
          }`}
        >
          <MyPostWidget picturePath={picturePath}/>
          <PostsWidget userId={_id}/>
        </div>
        {/* FriendList will only show when on desktop screen */}
        {isNonMobileScreen && <div className="basis-[26%] ">
          <AdverWidget/>
          <FriendListWidget userId={_id}/>
          </div>}
      </section>
    </div>
  );
};

export default HomePage;
