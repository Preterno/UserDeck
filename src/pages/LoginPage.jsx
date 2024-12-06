import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useAuth } from "../Authenticate";
import * as Yup from "yup";
import LoadingIcon from "../components/LoadingIcon";
import LoadingScreen from "./LoadingScreen";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
});

function LoginPage() {
  const { isAuthenticated, login, loading } = useAuth();
  console.log(isAuthenticated);

  if (loading || isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <div className="w-full max-w-sm p-8 py-12 pb-14 bg-white rounded-2xl shadow-xl hover:shadow-2xl max-sm:max-w-xs max-sm:px-5">
            <h1 className="text-3xl font-bold text-center mb-6">
              Welcome Back!
            </h1>
            <Form>
              <div className="mb-8">
                <div className="flex items-center bg-grey px-3 py-1 rounded-lg ">
                  <i class="bi bi-envelope text-xl"></i>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email "
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

              <div className="mb-9">
                <div className="flex items-center bg-grey px-3 py-1 rounded-lg ">
                  <i class="bi bi-key -rotate-45 text-xl"></i>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="block w-full p-2 rounded-md outline-none bg-transparent placeholder-black focus:outline-none focus:bg-inherit"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1 -mb-5"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 bg-black text-grey text-xl font-medium rounded-md ${
                  !isSubmitting &&
                  "hover:bg-dark-grey transition-all ease-in-out duration-200"
                } disabled:opacity-50`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingIcon /> : "Sign In"}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
