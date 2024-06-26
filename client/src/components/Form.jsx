import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import DropZone from "react-dropzone";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "./Button";

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can't exceed 50 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can't exceed 50 characters"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 8 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
  // ),

  location: Yup.string().required("Location is required"),

  occupation: Yup.string().required("Occupation is required"),

  picture: Yup.string().required("Picture is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Invalid Email").email("Invalid Email"),
  password: Yup.string().required("Password is required"),
});

const initialValueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initalValueLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("register");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  /*LEARNING HOW TO SEND DATA WHEN HAVING IMAGE */
  const register = async (values, onSubmitProps) => {
    // we cannot pass directly the value even its a object because we have an image,so we will use the below
    //allows us to send form with image and Formdata() is an javascript API
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    // receving what backend has sent us
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), //we send and recieve in string format
      }
    );
    //we logged in we will get the token from backend
    const loggedUser = await loggedInUserResponse.json(); // converting to json from string format
    onSubmitProps.resetForm();
    if (loggedUser) {
      // set the token and user in the Redux store
      dispatch(
        setLogin({
          user: loggedUser.user,
          token: loggedUser.token,
        })
      ); //sending an object we need action.payload.user and action.payload.token
    }
    navigate("/home");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initalValueLogin : initialValueRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        changed,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="bg-blue-600 p-10 w-[70%] mx-auto">
            {isRegister && (
              <div>
                <div
                  className={`grid-form ${
                    isNonMobileScreen
                      ? "grid grid-cols-[repeat(2,minmax(0,1fr))]"
                      : "grid grid-cols-[repeat(1,minmax(0,1fr))]"
                  } gap-10`}
                >
                  <input
                    type="text"
                    label="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName" //should match the initalvalue name
                    placeholder="FirstName"
                    className="lastname px-6 py-3 rounded-md"
                  />
                  <input
                    type="text"
                    label="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName" //should match the initialvalue name
                    className="px-6 py-3 rounded-md"
                    placeholder="LastName"
                  />
                  <input
                    type="text"
                    label="location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location" //should match the initialvalue name
                    /* checking if that been touched then it shows the error */
                    className={`px-6 py-3 rounded-md ${
                      isNonMobileScreen ? "col-span-2" : ""
                    }`}
                    placeholder="Location"
                  />
                  <input
                    type="text"
                    label="occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation" //should match the initialvalue name
                    className={`px-6 py-3 rounded-md ${
                      isNonMobileScreen ? "col-span-2" : ""
                    }`}
                    placeholder="Occupation"
                  />
                  <div
                    className={`${
                      isNonMobileScreen ? "col-span-2" : ""
                    } border-solid border-2 rounded-md p-1`}
                  >
                    <DropZone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFile) =>
                        setFieldValue("picture", acceptedFile[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className="border-dashed border-2 p-8 hover:cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p className="text-white">Add Picture Here</p>
                          ) : (
                            <div className="flex flex-betweeen justify-between items-center">
                              {values.picture.name}
                              <AiOutlineEdit size={20}></AiOutlineEdit>
                            </div>
                          )}
                        </div>
                      )}
                    </DropZone>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] mt-5 gap-10">
              <input
                type="email"
                label="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email" //should match the initialvalue name
                className={`px-6 py-3 rounded-md ${
                  isNonMobileScreen ? "col-span-2" : ""
                } mt-2`}
                placeholder="Email"
              />
              <input
                type="password"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password" //should match the initialvalue name
                className={`px-6 py-3 rounded-md ${
                  isNonMobileScreen ? "col-span-2" : ""
                } mt-2`}
                placeholder="Password"
              />
            </div>
            <div className="mt-10 grid">
              <Button
                type="submit"
                label={`${isLogin ? "LOGIN" : "REGISTER"}`}
              ></Button>
            </div>

            <p
              onClick={() => {
                pageType === "login"
                  ? setPageType("register")
                  : setPageType("login");
                resetForm(); //we are switching so clean up
              }}
              className="underline hover:cursor-pointer mt-4 text-white"
            >
              {isLogin
                ? "Don't have an account?Sign up"
                : "Already have an Account? Login here "}
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
