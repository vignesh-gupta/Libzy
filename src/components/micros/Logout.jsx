
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/util-functions";
import { useContext } from "react";
import { UserContext } from "../../App";

const Logout = () => {

  const navigate = useNavigate();
  const {setUser} = useContext(UserContext)

  useEffect(()=>{
    setCookie("user", "", 0 );
    setUser('')
    navigate("/")
  },[navigate, setUser])

  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-[85.3vh] w-100">
      <p className="text-lg">You have been Looged Out!</p>
      <p>See you Soon!</p>
    </div>
  );
};

export default Logout;
