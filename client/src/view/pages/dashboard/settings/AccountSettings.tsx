import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/form/Input";
import Button from "../../../components/form/Button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiUpload } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { authActions } from "../../../../store/auth/reducer";

function AccountSettings() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.auth.currentUser);

  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState(
    `http://127.0.0.1:8000/img/users/${currentUser.photo}`
  );

  const [imageValue, setImageValue] = useState(null);

  const previewImage = (e) => {
    const file = e.target.files[0];
    const { type } = file;
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      setImageAsset(URL.createObjectURL(file));
      setImageValue(file);
    } else {
      setWrongImageType(true);
    }
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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (imageValue) {
      formData.append("photo", imageValue);
    }

    try {
      const res = await axios.patch(
        "http://127.0.0.1:8000/api/v1/users/updateMe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res.data.data.user);
      dispatch(authActions.updateMe(res.data.data.user));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

        <Button text="save settings" type="submit" extraStyle="self-end mt-5" />
      </form>
    </div>
  );
}

export default AccountSettings;

/*
Key Differences and Reasons for Using FormData
Handling File Uploads: FormData is designed to handle files. When you append a file to FormData, it correctly sets the Content-Type to multipart/form-data and encodes the file properly for transmission to the server.

Server Compatibility: Many server-side frameworks and libraries are configured to handle multipart/form-data for file uploads, making it easier to process and store files sent this way.

Automatic Boundary Setting: FormData automatically sets the boundary string in the Content-Type header which is crucial for multipart/form-data requests. This boundary string is necessary to separate different parts of the form data, including files.

Simplifies Complex Data: FormData simplifies the process of combining text and file data in a single request. Manually constructing such a request is complex and error-prone.

In summary, using FormData ensures that the file is correctly encoded and sent in a way that the server can understand and process, which is not possible with a simple JSON object.

*/
