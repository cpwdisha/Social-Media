import Button from "../../components/Button";
import Form from "../../components/Form";
import useMediaQuery from "../../hooks/useMediaQuery";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <Form/>
    </div>
  );
};

export default LoginPage;
