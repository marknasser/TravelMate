import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import BaseContainer from "../../layouts/BaseContainer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/auth/operations";
import { Navigate } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (credentials) => {
    dispatch(signIn(credentials));
  };

  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <BaseContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-5 w-4/5  md:w-1/2 xl:w-1/3  bg-white flex justify-between items-start flex-col py-12 px-16 gap-4 shadow-lg rounded-xl"
      >
        <h1 className="heading-secondary ">LOG INTO YOUR ACCOUNT</h1>
        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="you@gmail.com"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="....."
          register={register}
          required
          errors={errors}
        />

        <Button text="Log in" type="submit" />
      </form>
    </BaseContainer>
  );
}

export default Login;
