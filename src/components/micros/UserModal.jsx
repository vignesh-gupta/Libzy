import { useNavigate } from "react-router-dom";
import {
  useAddNewUserMutation,
  useUpdateUserMutation,
} from "../../services/libServices";

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
      } else {
        let addedUser = await addUser({
          ...selectedUser,
          password: "12345",
        }).then((res) => res.data);
        setAllUsers((prev) => [...prev, addedUser]);
        // console.log(addedUser);
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
        <h3 className="font-bold text-lg">Edit User Details</h3>

        <div className="py-4 w-full form-control gap-2 flex-wrap">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={selectedUser?.name || ""}
            className="input input-bordered w-full"
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
            className="input input-bordered w-full"
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
