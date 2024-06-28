import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/form/Input";
import Button from "../../../components/form/Button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiUpload } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";

function AccountSettings() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.auth.currentUser);

  console.log("currentUser", currentUser);

  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState(
    `http://127.0.0.1:8000/img/users/${currentUser.photo}`
  );

  const [imageValue, setImageValue] = useState(null);

  const previewImage = (e) => {
    const { type, name } = e.target.files[0];
    setImageAsset(URL.createObjectURL(e.target.files[0]));
    setImageValue(e.target.files[0]);

    // if (
    //   type === "image/png" ||
    //   type === "image/svg" ||
    //   type === "image/jpeg" ||
    //   type === "image/gif" ||
    //   type === "image/tiff"
    // ) {
    //   setWrongImageType(false);
    //   setLoading(true);
    // } else {
    //   setWrongImageType(true);
    // }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: currentUser.email,
      name: currentUser.name,
      photo: imageValue,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // dispatch(signIn(credentials));
    const modifiedData = { ...data, photo: imageValue };
    console.log(modifiedData);
    try {
      const res = await axios.patch(
        "http://127.0.0.1:8000/api/v1/users/updateMe",
        modifiedData,
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div>
      <h2 className="heading-secondary">YOUR ACCOUNT SETTINGS</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-5 bg-white flex justify-between items-start flex-col py-12 px-16 gap-4 "
      >
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="....."
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

        <div className="flex gap-6">
          <figure className="relative  w-20 h-20 rounded-full overflow-hidden">
            <img
              src={imageAsset}
              alt="uploded-pic"
              className="h-full w-full object-cover"
            />
            {imageValue && (
              <button
                type="button"
                className="absolute bottom-1 right-1 p-1 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                onClick={() => {
                  setImageAsset(
                    `http://127.0.0.1:8000/img/users/${currentUser.photo}`
                  );
                  setImageValue(null);
                }}
              >
                <FaDeleteLeft />
              </button>
            )}
          </figure>
          <label className="cursor-pointer">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold text-2xl">
                  <BiUpload />
                </p>

                <p className="text-sm text-[#55c57a] border-b border-b-[#55c57a] hover:bg-[#55c57a] hover:text-white duration-200 ">
                  Choose new photo
                </p>
              </div>
            </div>
            <input
              type="file"
              className="w-0 h-0"
              {...register("photo", {
                onChange: previewImage,
              })}
            />
          </label>
        </div>

        <Button
          text="save settings"
          type="submit"
          bgColor="#55c57a"
          extraStyle="self-end mt-5"
        />
      </form>
    </div>
  );
}

export default AccountSettings;
