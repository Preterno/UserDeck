import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import LoadingIcon from "../components/LoadingIcon";
import showToast from "../components/Notification";

const EditSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  first_name: Yup.string()
    .min(3, "First name must be 3 characters at minimum")
    .required("First name is required"),
  last_name: Yup.string()
    .min(3, "Last name must be 3 characters at minimum")
    .required("Last name is required"),
});

function EditPage({
  id,
  first_name = "Aslam",
  last_name = "abc",
  email = "xyz@gmail.com",
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setIsError(true);
    setTimeout(() => {
      console.log(`User with ID ${id} deleted`);
      setIsDeleting(false);
    }, 1000);
  };

  const handleUpdate = (values) => {
    setIsUpdating(true);
    setTimeout(() => {
      console.log("Updated Values:", values);
      setIsUpdating(false);
    }, 2000);
  };
  React.useEffect(() => {
    if (isError) {
      showToast("Testing", { type: "success" }); 
      setIsError(false);
    }
  }, [isError]);

  return (
    <div className="flex h-full w-full justify-center items-center">
      <Formik
        initialValues={{
          email: email,
          first_name: first_name,
          last_name: last_name,
        }}
        validationSchema={EditSchema}
        onSubmit={handleUpdate}
      >
        {({ isSubmitting, values }) => (
          <div className="w-full max-w-sm px-8 py-12 pb-14 bg-white rounded-2xl shadow-xl hover:shadow-2xl max-sm:max-w-xs max-sm:px-4">
            <h1 className="text-3xl font-bold text-center mb-6">
              Edit user details
            </h1>
            <Form>
              <div className="mb-8">
                <div className="flex items-center bg-grey px-3 py-1 rounded-lg ">
                  <i className="bi bi-person text-xl"></i>
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="Edit first name"
                    className="block w-full p-2 rounded-md outline-none bg-transparent placeholder-black focus:outline-none focus:bg-inherit "
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 text-sm mt-1 -mb-5"
                />
              </div>
              <div className="mb-8">
                <div className="flex items-center bg-grey px-3 py-1 rounded-lg ">
                  <i className="bi bi-person text-xl"></i>
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Edit last name"
                    className="block w-full p-2 rounded-md outline-none bg-transparent placeholder-black focus:outline-none focus:bg-inherit"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 text-sm mt-1 -mb-5"
                />
              </div>
              <div className="mb-9">
                <div className="flex items-center bg-grey px-3 py-1 rounded-lg ">
                  <i className="bi bi-envelope text-xl"></i>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Edit email "
                    className="block w-full p-2 rounded-md outline-none bg-transparent placeholder-black focus:outline-none focus:bg-inherit"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1 -mb-5"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`w-full py-3 px-4 bg-red-500 text-grey text-xl font-medium rounded-xl ${
                    !isDeleting &&
                    "hover:bg-red-400 transition-all ease-in-out duration-200"
                  } disabled:opacity-50`}
                  disabled={isDeleting || isUpdating}
                  onClick={handleDelete}
                >
                  {isDeleting ? <LoadingIcon /> : "Delete user"}
                </button>
                <button
                  type="submit"
                  className={`w-full py-3 px-4 bg-green-800 text-grey text-xl font-medium rounded-xl ${
                    !isUpdating &&
                    "hover:bg-green-600 transition-all ease-in-out duration-200"
                  } disabled:opacity-50`}
                  disabled={isUpdating || isDeleting}
                >
                  {isUpdating ? <LoadingIcon /> : "Update details"}
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default EditPage;
