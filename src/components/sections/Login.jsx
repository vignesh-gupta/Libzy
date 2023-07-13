/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { setCookie } from "../../utils/util-functions";
import LabelledInput from "../micros/LabelledInput";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.id) navigate("/books");
  }, [navigate, user?.id]);

  // If user info in not stored then process the below code
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async ({ email, password }) => {
    const userData = await axios
      .get(`${BACKEND_URL}/users?email=${email}&password=${password}`)
      .then((res) => res.data[0]);

    if (!userData) {
      swal("Not a valid User", "Username or Password is incorrect", "error");
      return;
    }

    setUser(userData);
    setCookie("user", userData, 1);
    
    if (userData.role === "librarian") {
      navigate("/dashboard");
      return;
    }
    else navigate("/books");
  };

  return (
    <section
      id="login"
      className="flex items-center justify-center w-full px-5 sm:px-10"
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-center lg:text-left">
          <h1 className="py-6 text-5xl font-bold">Login</h1>
        </div>
        <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="card-body">
            <div className="form-control">
              <LabelledInput
                title="email"
                type="email"
                isRequired
                register={register}
                errors={errors}
              />
              <LabelledInput
                title="password"
                type="password"
                isRequired
                register={register}
                errors={errors}
              />
              <label className="flex justify-end label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>

              <label className="pl-1 text-xs">
                Don't have an account?
                <a className="font-semibold link link-hover" href="#register">
                  Signup
                </a>
              </label>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
