import { useContext } from "react";
import { useForm } from "react-hook-form";
import LabelledInput from "../micros/LabelledInput";
import { useAddNewUserMutation } from "../../services/libServices";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/util-functions";
import { UserContext } from "../../App";
import swal from "sweetalert";

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
      swal("Email already taken", `${data.email} is already register with another user`, "error");
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
      className="flex items-center justify-center w-full px-5 sm:px-10"
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-center lg:text-left">
          <h1 className="py-6 text-5xl font-bold">Register</h1>
        </div>
        <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
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

              <label className="pl-1 mt-3 text-xs">
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
