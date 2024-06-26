import React from "react";

import BaseContainer from "../../layouts/BaseContainer";
import Input from "../../components/form/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/form/Button";

function Signup() {
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
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

        <Button text="Log in" type="submit" />
      </form>
    </BaseContainer>
  );
}

export default Signup;
