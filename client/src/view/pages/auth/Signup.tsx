import React from "react";

import BaseContainer from "../../layouts/BaseContainer";
import Input from "../../components/form/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/form/Button";

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../store/auth/operations";
import { Navigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (credentials) => {
    dispatch(signUp(credentials));
  };

  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <BaseContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-5 w-4/5  md:w-1/2 lg:w-1/3 bg-white flex justify-between items-start flex-col py-12 px-16 gap-4 shadow-lg rounded-xl"
      >
        <h1 className="heading-secondary ">CREATE NEW ACCOUNT</h1>

        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="your full name"
          register={register}
          required
          errors={errors}
        />

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

        <Input
          id="passwordConfirm"
          label="Password Confirm"
          type="password"
          placeholder="....."
          register={register}
          required
          errors={errors}
        />

        <Button text="Sign Up" type="submit" />
      </form>
    </BaseContainer>
  );
}

export default Signup;
