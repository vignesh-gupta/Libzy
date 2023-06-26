import { useContext } from "react";
import { useForm } from "react-hook-form";
import LabelledInput from "../micros/LabelledInput";
import { useAddNewUserMutation } from "../../services/libServices";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/util-functions";
import { UserContext } from "../../App";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [addUser] = useAddNewUserMutation();

  const onSubmitHandler = async (data) => {
    try {
      const isEmailUsed = await axios
        .get(`${BACKEND_URL}/users?email=${data.email}`)
        .then((res) => res.data.length > 0);
      if (isEmailUsed) {
        alert("Email is already register!");
        return;
      }

      const { data: userData } = await addUser({
        ...data,
        role: "member",
        favBooks: [],
        issuedBooks: [],
      });

      setUser(userData);
      setCookie("user", userData, 1);
      navigate("/books");
    } catch (error) {
      console.log(error);
      navigate("/error")
      return; 
    }
  };

  return (
    <section
      id="register"
      className="w-full flex justify-center items-center min-h-[40vh] sm:min-h-[80.8vh] px-5 sm:px-10"
    >
      <div className="flex justify-center items-center flex-col w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold py-6">Register</h1>
        </div>
        <div className="card flex-shrink-0 max-w-sm w-full shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="card-body">
            <div className="form-control">
              <LabelledInput
                title="name"
                isRequired
                register={register}
                errors={errors}
              />
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

              <label className="text-xs pl-1 mt-3">
                Already have an account?
                <a className="font-semibold link link-hover" href="#register">
                  Login
                </a>
              </label>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
