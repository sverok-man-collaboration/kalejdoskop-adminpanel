import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Menu from "../../components/Menu";

function Users() {
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [addUserModal, setAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [deleteUserButton, setDeleteUserButton] = useState(true);
  const [deleteEmail, setDeleteEmail] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  async function getUsers() {
    const token = sessionStorage.getItem("token");
    await axios
      .get("http://localhost:4000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.newToken);
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getUsers();
  }, []);

  async function addUser() {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const res = await axios.post(
          "http://localhost:4000/users",
          {
            email: newEmail,
            name: newUser,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        sessionStorage.setItem("token", res.data.newToken);
        setModal(true);
        setModalMessage(`${newUser} har lagts till!`);
        setNewEmail("");
        setNewUser("");
        getUsers();
      } else {
        console.log("No token available");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      setModal(true);
      setModalMessage(`${newUser} har inte lagts till! Försök igen`);
    }
  }

  function handleDeleteUserModal(id, email) {
    setModalMessage(`Är du säker på att du vill radera ${email}?`);
    setDeleteUserModal(true);
    setDeleteId(id);
    setDeleteEmail(email);
    setDeleteUserButton(true);
  }

  async function deleteUser() {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        await axios.delete(`http://localhost:4000/users/${deleteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setModalMessage(`${deleteEmail} har taggits bort!`);
        setDeleteUserButton(false);
        getUsers();
      } else {
        console.log("No token available");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      setModalMessage(`${deleteEmail} har inte taggits bort! Försök igen`);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Användare</title>
      </Helmet>
      <Menu />

      <div className="mt-24 md:ml-48 relative sm:ml-4">
        <h1 className="ml-4 mb-4 text-lg">Användare</h1>

        {addUserModal ? (
          <div className="z-50 fixed top-0 left-0 bottom-0 right-0 md:relative pt-24 md:py-4 px-4 md:mb-8 md:px-4 md:ml-4 bg-secondary md:max-w-[50%] lg:max-w-[30%] rounded-md">
            <div className="text-right w-[80%] sm:w-[60%] md:w-full mx-auto">
              <button
                className="p-2 bg-accent rounded-md text-white text-sm"
                onClick={() => {
                  setAddUserModal(false);
                  setNewUser("");
                  setNewEmail("");
                }}
              >
                Stäng
              </button>
            </div>

            <h6 className=" w-[80%] sm:w-[60%] md:w-full mx-auto">
              Ny användare
            </h6>

            <form className="flex flex-col my-4 w-[80%] sm:w-[60%] md:w-full mx-auto">
              <label>Namn</label>
              <input
                type="text"
                required
                value={newUser}
                onChange={(e) => {
                  setNewUser(e.target.value);
                }}
              />
              <label className="mt-2">E-mail</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />

              <button
                type="button"
                className="bg-accent rounded-md text-white p-2 mx-auto mt-4"
                onClick={() => {
                  addUser();
                }}
              >
                Lägg till
              </button>
            </form>
          </div>
        ) : (
          <button
            className="flex items-center transform bg-accent transition duration-500 rounded-md text-white py-2 px-4 hover:bg-accentHover ml-4"
            onClick={() => {
              setAddUserModal(true);
            }}
          >
            <AiOutlinePlusCircle className="mr-1 h-[1.2em] w-[1.2em]" /> Lägg
            till användare
          </button>
        )}

        {modal ? (
          <div className="z-50 fixed top-0 left-0 bottom-0 right-0 pt-24 px-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur">
            <div className="w-[90%] sm:w-[60%] md:w-[50%] h-[50%] mx-auto bg-secondary p-4 rounded-md">
              <button
                className="p-2 bg-accent rounded-md text-white text-sm ml-auto block"
                onClick={() => {
                  setModal(false);
                  setModalMessage("");
                }}
              >
                Stäng
              </button>

              <div className="w-[80%] sm:w-[60%] md:w-full mx-auto text-center flex flex-col h-[80%] justify-center">
                <p>{modalMessage}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {deleteUserModal ? (
          <div className="z-50 fixed top-0 left-0 bottom-0 right-0 pt-24 px-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur">
            <div className="w-[90%] sm:w-[60%] md:w-[50%] h-[50%] mx-auto bg-secondary p-4 rounded-md">
              <button
                className="p-2 bg-accent rounded-md text-white text-sm ml-auto block"
                onClick={() => {
                  setDeleteUserModal(false);
                  setDeleteId(null);
                }}
              >
                Stäng
              </button>

              <div className="w-[80%] sm:w-[60%] md:w-full mx-auto text-center flex flex-col h-[80%] justify-center">
                <p>{modalMessage}</p>

                <button
                  className={`py-2 px-4 bg-accent rounded-md text-white mx-auto mt-4 ${
                    deleteUserButton ? "block" : "hidden"
                  }`}
                  onClick={() => {
                    deleteUser(deleteId);
                  }}
                >
                  JA
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <table className="mx-1 mt-10 max-w-screen md:mx4">
          <thead className="border-b-2 border-primary text-left">
            <tr>
              <th className="px-2">Namn</th>
              <th className="px-2">E-mail</th>
              <th className="px-2">Ta bort</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td className="px-2 pt-2">{user.name}</td>
                  <td className="px-2 pt-2">{user.email}</td>
                  <td className="px-2 pt-2">
                    <button
                      className="w-full"
                      onClick={() => {
                        handleDeleteUserModal(user.id, user.email);
                      }}
                    >
                      <FiTrash2 className="mx-auto text-primary" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
