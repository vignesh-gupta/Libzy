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
      className="w-full flex justify-center items-center min-h-[40vh] sm:min-h-[85.3vh] px-5 sm:px-10"
    >
      <div className="flex justify-center items-center flex-col w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold py-6">Login</h1>
        </div>
        <div className="card flex-shrink-0 max-w-sm w-full shadow-2xl bg-base-100">
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
              <label className="label flex justify-end">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>

              <label className="text-xs pl-1">
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
