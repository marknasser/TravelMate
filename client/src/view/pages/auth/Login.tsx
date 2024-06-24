import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import BaseContainer from "../../layouts/BaseContainer";

function Login() {
  return (
    <BaseContainer>
      <form className=" bg-white flex justify-between items-start flex-col py-16 px-20 gap-4 shadow-lg rounded-xl">
        <h1 className="heading-secondary mb-5">LOG INTO YOUR ACCOUNT</h1>
        <Input title="Email address" placeholder="you@Gmail.com" type="email" />
        <Input title="Password" placeholder="....." type="password" />

        <Button text="Log in" type="submit" />
      </form>
    </BaseContainer>
  );
}

export default Login;
