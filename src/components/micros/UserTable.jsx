import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateUserMutation } from "../../services/libServices";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import UserModal from './UserModal'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const UserTable = ({ users, isAdmin }) => {
  const newUser = {
    name: "",
    email: "",
    password: "",
    role: "member",
    favBooks: [],
    issuedBooks: [],
  };

  const [selectedUser, setSelectedUser] = useState(newUser);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(()=>{
    setAllUsers(users)
  },[users])

  const { user : loggedInUser } = useContext(UserContext);
  const [updateRole] = useUpdateUserMutation();
  const [deleteUser] = useUpdateUserMutation();
  const navigate = useNavigate();


  function handleRoleChange(id, e) {
    try {
      updateRole({
        body: {
          role: e.target.value,
        },
        userId: id,
      });
    } catch (error) {
      console.log(error);
      navigate("/error")
      return; 
    }
  }

  function handleAddUser(){
    setSelectedUser(newUser);
    window.user_modal.showModal();
  }

  function handleEditUser(id){
    let user = allUsers?.filter((u) => u.id === id)[0];
    setSelectedUser(user);
    window.user_modal.showModal();
  }

  function handleDeleteUser(id){

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the User data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        setAllUsers((prev) => {
          let updatedUsers = [...prev].filter((u) => u.id !== id);
          return updatedUsers;
        });
    
        try{
          deleteUser({ userId: id , method: "DELETE" });
        }catch(error){
          console.log(error);
          navigate("/error")
          return; 
        }
        swal("The user has been deleted", {
          icon: "success",
        });
      } else {
        swal("User Deletion Cancelled!", {
          icon: "error",
        });
      }
    });

   
  }

  return (
    <div className="py-5 overflow-x-auto ">
      <div className="flex justify-end">
        <button className="btn btn-secondary" onClick={handleAddUser}>Add User</button>
      </div>
      <table className="table shadow-xl table-auto table-pin-rows table-pin-cols">
        <caption className="mb-2 text-lg font-semibold caption-top">
          Users
        </caption>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users?.map(({ id, name, email, role }) => (
            <tr key={id} className="hover">
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>
                <select
                  name="role"
                  id="role"
                  className="select select-sm"
                  value={role}
                  onChange={(e) => handleRoleChange(id, e)}
                  disabled={
                    id === loggedInUser?.id ||
                    (loggedInUser?.role === "librarian" && role === "admin")
                  }
                >
                  <option value="librarian">Librarian</option>
                  <option value="member">Member</option>
                  <option value="admin" disabled={loggedInUser?.role !== "admin"}>
                    Admin
                  </option>
                </select>
              </td>
              <td className="flex gap-2">
                {isAdmin && id !== loggedInUser?.id && (
                  <>
                    <button className="btn btn-outline btn-square btn-secondary" onClick={()=> handleEditUser(id)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="btn btn-outline btn-square btn-error " onClick={()=> handleDeleteUser(id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal allUsers={allUsers} selectedUser={selectedUser} setAllUsers={setAllUsers} setSelectedUser={setSelectedUser} />
    </div>
  );
};

export default UserTable;
