const UserImage = ({ image, size = "30px" }) => {
    return (
      <div width={size} height={size}>
        <img
          className={`object-cover rounded-full  w-[60px] h-[60px]`}
          alt="profilepicture"
          src={`http://localhost:3001/assets/${image}`}
        ></img>
      </div>
    );
};
export default UserImage;
