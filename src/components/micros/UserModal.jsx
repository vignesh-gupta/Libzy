import { useNavigate } from "react-router-dom";
import {
  useAddNewUserMutation,
  useUpdateUserMutation,
} from "../../services/libServices";
import swal from "sweetalert";

const UserModal = ({ selectedUser, setAllUsers, setSelectedUser }) => {
  const [addUser] = useAddNewUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();


  async function handleSubmit() {
    try {
      if (selectedUser?.id || "") {
        updateUser({
          body: selectedUser,
          userId: selectedUser?.id || "",
          method: "PUT",
        });
        setAllUsers((prev) => {
          let newUsers = [...prev];
          newUsers.splice(
            prev.findIndex((book) => book?.id === selectedUser?.id || ""),
            1,
            selectedUser
          );
          return newUsers;
        });
        swal("User Updated!", "If no changes, please refresh the page once.", "success");
      } else {
        let addedUser = await addUser({
          ...selectedUser,
          password: "12345",
        }).then((res) => res.data);
        setAllUsers((prev) => [...prev, addedUser]);
        // console.log(addedUser);
        swal("User Added!", "If the user is not visible refresh the page once.", "success");
      }
    } catch (error) {
      console.log(error);
      navigate("/error")
      return; 
    }
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <dialog id="user_modal" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold">Edit User Details</h3>

        <div className="flex-wrap w-full gap-2 py-4 form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={selectedUser?.name || ""}
            className="w-full input input-bordered"
            onChange={handleChange}
          />

          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Name"
            id="email"
            value={selectedUser?.email || ""}
            className="w-full input input-bordered"
            onChange={handleChange}
          />
        </div>

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>

      {/* TO Implement the close on outside click functionality */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UserModal;
