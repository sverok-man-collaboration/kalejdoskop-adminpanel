import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiEdit, BiXCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  MdOutlineDoNotDisturbAlt,
  MdOutlineLocalPostOffice,
} from "react-icons/md";
import Menu from "../../components/Menu";
import confetti from "canvas-confetti";
import axios from "axios";

function Messages() {
  const [showMessage, setShowMessage] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showDeny, setShowDeny] = useState(false);
  const [editing, setEditing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState(getFilteredmessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [previousMessage, setPreviousMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editedText, setEditedText] = useState("");

  //axios
  async function getMessages() {
    const token = sessionStorage.getItem("token");
    await axios
      .get("http://localhost:4000/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.newToken);
        setMessages(res.data.messages);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getMessages();
  }, []);


  function openModal(messageId) {
    const message = messages.find((message) => message.id === messageId);

    setShowApprove(false);
    setShowDeny(false);
    setSelectedMessage(message);

    setShowMessage(true);
  }

  function closeModal() {
    setShowMessage(false);
    setEditing(false);
    setEditedText("");
    setSelectedMessage(null)
  }

  function closeChangedStatusModal() {
    setShowApprove(false);
    setShowDeny(false);
  }

  // ska vi ha med room och object i adminpanelen också i meddelande modalen? avvakta med detta

  function handleFilter(e) {
    setFilter(e.target.value);
    closeModal();
  }

  function filteredMessages() {
    if (filter === "approved") {
      return messages.filter((message) => message.status === "approved");
    } else if (filter === "denied") {
      return messages.filter((message) => message.status === "denied");
    } else if (filter === "pending") {
      return messages.filter((message) => message.status === "pending");
    } else if (filter === "all") {
      return messages;
    }
  }

  async function handleApprove(message) {
    const token = sessionStorage.getItem("token");
    let newMessage = {
      id: message.id,
      status: "approved",
      message: editing === true ? (editedText) : ("")
    };
  
    try {
      const response = await axios.patch(
        "http://localhost:4000/messages",
        newMessage,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      sessionStorage.setItem("token", response.data.newToken);
      getMessages();
      confetti({
        particleCount: 10,
        shapes: ["star"],
        spread: 360,
        startVelocity: 25,
      });
      closeModal();
      setShowApprove(true);
      setPreviousMessage(message);
      setEditing(false)
    } catch (error) {
      console.log(error);
    }
  }


  async function handleDeny(message) {
    const token = sessionStorage.getItem("token");
    let newMessage = {
      id: message.id,
      status: "denied",
      message: editing === true ? (editedText) : ("")
    };
  
    try {
      const response = await axios.patch(
        "http://localhost:4000/messages",
        newMessage,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      sessionStorage.setItem("token", response.data.newToken);
      getMessages();
      confetti({
        particleCount: 10,
        shapes: ["star"],
        spread: 360,
        startVelocity: 25,
      });
      closeModal();
      setShowApprove(true);
      setPreviousMessage(message);
    } catch (error) {
      console.log(error);
    }
  }


  async function handleRegretStatus() {
    try {
      await axios.patch("http://localhost:4000/messages", previousMessage);
      getMessages();
      setSelectedMessage(previousMessage);
    } catch (err) {
      console.log(err);
    }
  }

  function openRegretedModal() {
    setShowApprove(false);
    setShowDeny(false);
    setShowMessage(true);
  }

  function startRegret() {
    handleRegretStatus();
    const message = messages.find(
      (message) => message.id === previousMessage.id
    );
    openRegretedModal(message.id);
    setSelectedMessage(message);
  }

  function handleTitle() {
    if (filter === "all") {
      return (
        <p className=" text-center mt-5 mb-2 border-b border-accent w-[100%]">
          INLÄGG
        </p>
      );
    } else if (filter === "pending") {
      return (
        <p className="text-center mt-5  mb-2 border-b border-accent w-[100%]">
          NYTT
        </p>
      );
    } else if (filter === "approved") {
      return (
        <p className=" text-center mt-5  mb-2 border-b border-accent w-[100%]">
          GODKÄNDA
        </p>
      );
    } else if (filter === "denied") {
      return (
        <p className=" text-center mt-5  mb-2 border-b border-accent w-[100%]">
          NEKADE
        </p>
      );
    }
  }

  function handleStatus() {
    if (selectedMessage.status === "pending") {
      return <span className="text-[#0827F5] ml-2 ">Ny</span>;
    } else if (selectedMessage.status === "approved") {
      return <span className="text-[#02CC3B] ml-2 ">Godkänd</span>;
    } else if (selectedMessage.status === "denied") {
      return <span className="text-[#FF1C1C] ml-2 ">Nekad</span>;
    }
  }

  function handleEdit(e) {
    setEditing(true);
    setEditedText(e.target.value);
  }

  function handleEdit(e) {
    setEditing(true);
    setEditedText(e.target.value);
  }

  function getFilteredmessages() {
    return messages.filter((message) => message.status === "pending");
  }

  function nextMessage() {
    const pendingMessages = filteredMessages().filter(
      (message) => message.status === "pending"
    );
    const currentMessageIndex = pendingMessages.findIndex(
      (message) => message.id === selectedMessage?.id
    );
    const nextMessageIndex = (currentMessageIndex + 1) % pendingMessages.length;

    const nextMessage = pendingMessages[nextMessageIndex];
    setSelectedMessage(nextMessage);
    openModal(nextMessage.id);
  }

  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>
      <Menu />
      <div className="flex flex-row h-screen xs:mx-[20px] md:ml-[194px]">
        <div className="flex w-[100%] md:w-1/2 flex-col items-center h-full">
          <form className="mt-20 max-w-[100%]">
            <select
              onChange={handleFilter}
              value={filter}
              className="border border-primary p-1 cursor-pointer"
            >
              <option default value="all">
                Alla inlägg
              </option>
              <option value="approved">Godkända inlägg</option>
              <option value="denied">Nekade inlägg</option>
              <option value="pending">Obesvarade inlägg</option>
            </select>
          </form>
          <div className="w-[100%] h-full overflow-hidden">
            {handleTitle()}
            <ul className="overflow-y-auto touch-auto h-[90%] w-[100%]">
              {filteredMessages()
                .filter((message) => message.status === "all")
                .map((message) => (
                  <li
                    className={`hover:bg-grey cursor-pointer flex flex-row justify-between p-1 ${
                      message.id === selectedMessage?.id ? "bg-grey" : ""
                    }`}
                    key={message.id}
                    onClick={() => openModal(message.id)}
                  >
                    <p className="truncate w-full max-w-xs">
                      {message.message}
                    </p>
                    <img src="denied.png" className="text-[#02CC3B] p-10" />
                  </li>
                ))}

              {filteredMessages()
                .filter((message) => message.status === "pending")
                .map((message) => (
                  <li
                    className={`hover:bg-grey cursor-pointer flex flex-row justify-between p-1 ${
                      message.id === selectedMessage?.id ? "bg-grey" : ""
                    }`}
                    key={message.id}
                    onClick={() => openModal(message.id)}
                  >
                    <p className="truncate w-full max-w-xs">
                      {message.message}
                    </p>
                    <img src="pending3.png" className="text-[#0827F5] w-5 h-4" />
                  </li>
                ))}

              {filteredMessages()
                .filter((message) => message.status === "approved")
                .map((message) => (
                  <li
                    className={`hover:bg-grey cursor-pointer flex flex-row justify-between p-1 ${
                      message.id === selectedMessage?.id ? "bg-grey" : ""
                    }`}
                    key={message.id}
                    onClick={() => openModal(message.id)}
                  >
                    <p className="truncate w-full max-w-xs">
                      {message.message}
                    </p>
                    <img src="approved3.png" className="text-[#02CC3B] w-6 h-4" />
                  </li>
                ))}

              {filteredMessages()
                .filter((message) => message.status === "denied")
                .map((message) => (
                  <li
                    className={`hover:bg-grey cursor-pointer flex flex-row justify-between p-1 ${
                      message.id === selectedMessage?.id ? "bg-grey" : ""
                    }`}
                    key={message.id}
                    onClick={() => openModal(message.id)}
                  >
                    <p className="truncate w-full max-w-xs">
                      {message.message}
                    </p>
                    <img src="denied3.png" className="text-[#FF1C1C] w-5 h-4" />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className=" md:pt-[90px] md:h-full overflow-y-auto">
          {showMessage ? (
            <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-white md:relative ">
              <div className="flex justify-end m-4 text-xl">
                {editing ? (
                  <div>
               
                    <button
                      onClick={() => setEditing(false)}
                      className=" rounded-3xl bg-grey text-black py-2 text-sm px-4 ml-2"
                    >
                      Avbryt
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    {" "}
                    <BiEdit
                      onClick={handleEdit}
                      className="cursor-pointer text-[#0827F5]"
                    />{" "}
                    <BiXCircle
                      className="cursor-pointer ml-3"
                      onClick={closeModal}
                    />
                  </div>
                )}
              </div>
              <div className="m-10">
                {!editing ? (
                  <div>
                    {" "}
                    <p className="mb-4 flex flex-row">
                      Status: {handleStatus()}
                    </p>
                    <p>{selectedMessage.message}</p>
                  </div>
                ) : (
                  <textarea
                    id={selectedMessage.id}
                    defaultValue={selectedMessage.message}
                    value={editedText}
                    onChange={handleEdit}
                    rows="10"
                    className="border border-black w-full"
                  />
                )}

               
                  <div className="mt-10">
                    <button
                      onClick={() => handleApprove(selectedMessage)}
                      className=" rounded-3xl bg-[#02CC3B] text-white py-2 px-2"
                    >
                      Godkänn
                    </button>
                    <button
                      onClick={() => handleDeny(selectedMessage)}
                      className="rounded-3xl bg-[#FF1C1C] text-white py-2 px-6 ml-2"
                    >
                      Neka
                    </button>
                  </div>
               
              </div>
            </div>
          ) : null}
          {showApprove ? (
            <div className="mt-20 fixed top-0 left-0 bottom-0 right-0 z-50 bg-white md:relative">
              <div className="flex justify-end mr-8">
                <BiXCircle
                  className="cursor-pointer ml-3"
                  onClick={closeChangedStatusModal}
                />
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="mb-10 text-lg ml-2">
                  Inlägget har <span className="text-[#02CC3B]">godkänts</span>
                </p>
                <div>
                  <button
                    onClick={startRegret}
                    className="rounded-3xl bg-grey text-black py-2 px-8"
                  >
                    Ångra
                  </button>
                  {pendingMessages && pendingMessages.length > 0 ? (
                    <button
                      onClick={nextMessage}
                      className="rounded-3xl bg-[#0827F5] text-white py-2 px-8 ml-4"
                    >
                      Nästa
                    </button>
                  ) : (
                    <p>Det finns inga nya inlägg.</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {showDeny ? (
            <div className="mt-20 fixed top-0 left-0 bottom-0 right-0 z-50 bg-white md:relative ">
              <div className="flex justify-end mr-8">
                <BiXCircle
                  className="cursor-pointer ml-3"
                  onClick={closeChangedStatusModal}
                />
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="mb-10 text-lg">
                  Inlägget har <span className="text-[#FF1C1C]">nekats</span>
                </p>
                <div>
                  <button
                    onClick={startRegret}
                    className="rounded-3xl bg-grey text-black py-2 px-8"
                  >
                    Ångra
                  </button>
                  {pendingMessages && pendingMessages.length > 0 ? (
                    <button
                      onClick={nextMessage}
                      className="rounded-3xl bg-[#0827F5] text-white py-2 px-6 ml-4"
                    >
                      Nästa
                    </button>
                  ) : (
                    <p>Det finns inga nya inlägg.</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Messages;


