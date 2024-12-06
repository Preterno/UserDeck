import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import LoadingIcon from "../components/LoadingIcon";
import showToast from "../components/Notification";
import { useAuth } from "../Authenticate";
import LoadingScreen from "./LoadingScreen";

const EditSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  first_name: Yup.string()
    .min(3, "First name must be 3 characters at minimum")
    .required("First name is required"),
  last_name: Yup.string()
    .min(3, "Last name must be 3 characters at minimum")
    .required("Last name is required"),
});

function EditPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setLoading, loading } = useAuth();
  const base_url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        showToast("Invalid user ID", { type: "error" });
        navigate("/");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}api/users/${id}`);
        setUserData({
          email: response.data.data.email,
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          showToast("User not found", { type: "error" });
          navigate('/');
        } else {
          showToast(error.message || "An error occurred while fetching user", { type: "error" });
          console.error(error);
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    if (state && state.first_name && state.last_name && state.email) {
      setUserData({
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
      });
    } else {
      fetchUserData();
    }
  }, [state, id, navigate, setLoading]);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`${base_url}api/users/${id}`);
      setUserData({
        email: "",
        first_name: "",
        last_name: "",
      });
      console.log(response);
      showToast("User successfully deleted", { type: "success" });
      navigate("/");
    } catch (error) {
      showToast(error, { type: "error" });
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (values) => {
    setIsUpdating(true);
    try {
      const { email, first_name, last_name } = values;
      const response = await axios.put(`${base_url}api/users/${id}`, {
        email,
        first_name,
        last_name,
      });
      setUserData({
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });
      console.log(response);
      showToast("User details successfully updated", { type: "success" });
    } catch (error) {
      showToast(error, { type: "error" });
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <Formik
        initialValues={userData}
        validationSchema={EditSchema}
        onSubmit={handleUpdate}
        enableReinitialize
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
