import React from "react";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

function PasswordChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

  return (
    <div>
      <h2 className="heading-secondary">PASSWORD CHANGE</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-5 bg-white flex justify-between items-start flex-col py-12 px-16 gap-4"
      >
        <Input
          id="currentPassword"
          label="Current Password"
          type="password"
          placeholder="....."
          register={register}
          required
          errors={errors}
        />
        <Input
          id="password"
          label="New Password"
          type="password"
          placeholder="....."
          register={register}
          required
          errors={errors}
        />
        <Input
          id="passwordConfirm"
          label="Confirm Password"
          type="password"
          placeholder="....."
          register={register}
          required
          errors={errors}
        />

        <Button text="save password" type="submit" extraStyle="self-end mt-5" />
      </form>
    </div>
  );
}

export default PasswordChange;
