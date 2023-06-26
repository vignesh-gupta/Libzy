
import Login from "../components/sections/Login";
import Signup from "../components/sections/Signup";

const GetStartedPage = () => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="grid flex-grow card rounded-box place-items-center">
        <Login />
      </div>
      <div className="divider md:divider-horizontal">OR</div>
      <div className="grid flex-grow card rounded-box place-items-center">
        <Signup />
      </div>
    </div>
  );
};

export default GetStartedPage;
