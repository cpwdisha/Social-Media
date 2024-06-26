const Button = ({ label = "click", type = "",disabled=false}) => {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-gradient-to-r from-yellow-200 to-cyan-500 rounded-xl 
      hover:bg-gradient-to-r hover:scale-105 transition duration-150 focus:text-black hover:font-bold disabled:opacity-60 disabled:hover:font-normal disabled:hover:scale-100 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
