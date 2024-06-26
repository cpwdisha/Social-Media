import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogin, setLogout } from "../../state/index";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import { BiSearch } from "react-icons/bi";
import { MdDarkMode, MdLightMode, MdOutlineMessage } from "react-icons/md";
import { RiNotification2Fill } from "react-icons/ri";
import { AiFillQuestionCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import DropDown from "../../components/Dropdown";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <div>
      <nav className="flex justify-between  items-center px-20 py-4 bg-blue-600 gap-10">
        {/* COLLECTION ITEM -1 */}
        <div className="flex justify-between  items-center gap-7">
          <div
            className="text-white font-bold hover:cursor-pointer transition"
            onClick={() => navigate("/home")}
          >
            SOCIALMEDIA
          </div>

          {isNonMobileScreens && (
            <div className="flex justify-between items-center py-[0.1rem] px-[1.5rem]">
              <section className="flex justify-between items-center bg-white rounded-md px-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-2 py-2 rounded-sm outline-none focus:outline-none bg-transparent"
                />
                <BiSearch className="bg-whiter" size={20} />
              </section>
            </div>
          )}
        </div>

        {/* COLLECTION ITEM -2 FOR NON MOBILE SCREEN ONLY */}
        {isNonMobileScreens ? (
          <div className="flex justify-between items-center gap-8">
            {mode === "light" ? (
              <MdDarkMode onClick={() => dispatch(setMode())} size={20} />
            ) : (
              <MdLightMode
                onClick={() => dispatch(setMode())}
                size={20}
              ></MdLightMode>
            )}
            <MdOutlineMessage size={20}></MdOutlineMessage>
            <RiNotification2Fill size={20}></RiNotification2Fill>
            <AiFillQuestionCircle size={20}></AiFillQuestionCircle>
            <DropDown />
          </div>
        ) : (
          <GiHamburgerMenu
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          />
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <div className="  w-[300px] fixed right-0 top-0 bottom-0 h-full z-10 p-10 bg-blue-200">
            {/* CLOSE ICON */}
            <div className="flex justify-end mb-10">
              <AiOutlineClose
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              />
            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col justify-end items-center gap-8">
              {mode === "light" ? (
                <MdDarkMode onClick={() => dispatch(setMode())} size={20} />
              ) : (
                <MdLightMode
                  onClick={() => dispatch(setMode())}
                  size={20}
                ></MdLightMode>
              )}
              <MdOutlineMessage size={20}></MdOutlineMessage>
              <RiNotification2Fill size={20}></RiNotification2Fill>
              <AiFillQuestionCircle size={20}></AiFillQuestionCircle>
              <DropDown />
            </div>

          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
