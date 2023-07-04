import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Menu from "../../components/Menu";
import confetti from "canvas-confetti";
import axios from "axios";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

function Messages() {
  const location = useLocation();
  const filterFromState = location.state?.filter;

  const [showMessage, setShowMessage] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showDeny, setShowDeny] = useState(false);
  const [editing, setEditing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [previousMessage, setPreviousMessage] = useState(null);
  const [filter, setFilter] = useState(filterFromState || "all");
  const [editedText, setEditedText] = useState("");

  const navigate = useNavigate();

  //axios
  async function getMessages() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No token available");
      return navigate("/");
    }
    try {
      const URL = process.env["API_URL"];
      const res = await axios.get(`${URL}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem("token", res.data.newToken);
      setMessages(res.data.messages);
      setPendingMessages(getFilteredmessages(res.data.messages));
    } catch (err) {
      if (err.response.status === 401) {
        sessionStorage.removeItem("token");
        navigate("/");
      } else if (err.response.status === 500) {
        // Create a request button and message
        console.log(err.message);
      }
    }
  }
  useEffect(() => {
    getMessages();
  }, []);

  function openModal(messageId) {
    const message = messages.find((message) => message.id === messageId);

    setShowApprove(false);
    setShowDeny(false);
    setSelectedMessage(message);
    setEditing(false);
    setShowMessage(true);
  }

  function closeModal() {
    setShowMessage(false);
    setEditing(false);
    setEditedText("");
    setSelectedMessage(null);
  }

  function closeChangedStatusModal() {
    setShowApprove(false);
    setShowDeny(false);
  }

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

  useEffect(() => {
    filteredMessages();
  }, [filter]);

  async function handleMessage(message, action) {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No token available");
      return navigate("/");
    }

    let newMessage = {
      id: message.id,
      status: action === "approve" ? "approved" : "denied",
      message: editing === true ? editedText : "",
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

      if (action === "approve") {
        setShowApprove(true);
      } else {
        setShowDeny(true);
      }

      setPreviousMessage(message);
      setEditing(false);
    } catch (error) {
      if (err.response.status === 401) {
        sessionStorage.removeItem("token");
        navigate("/");
      } else if (err.response.status === 500) {
        // Create a request button and message
        console.log(err.message);
      }
    }
  }

  async function handleRegretStatus() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No token available");
      return navigate("/");
    }
    try {
      const response = await axios.patch(
        "http://localhost:4000/messages",
        previousMessage,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      sessionStorage.setItem("token", response.data.newToken);
      getMessages();
      setSelectedMessage(previousMessage);
    } catch (err) {
      if (err.response.status === 401) {
        sessionStorage.removeItem("token");
        navigate("/");
      } else if (err.response.status === 500) {
        // Create a request button and message
        console.log(err.message);
      }
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
      return <p className="text-black">Inlägg</p>;
    } else if (filter === "pending") {
      return <p className="text-black">Nytt</p>;
    } else if (filter === "approved") {
      return <p className="text-black">Godkända</p>;
    } else if (filter === "denied") {
      return <p className="text-black">Nekade</p>;
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

  function getFilteredmessages(messages) {
    return messages.filter((message) => message.status === "pending");
  }

  function nextMessage() {
    if (pendingMessages.length > 0) {
      const currentMessageIndex = pendingMessages.findIndex(
        (message) => message.id === selectedMessage?.id
      );
      const nextMessageIndex =
        (currentMessageIndex + 1) % pendingMessages.length;

      const nextMessage = pendingMessages[nextMessageIndex];
      setSelectedMessage(nextMessage);
      openModal(nextMessage.id);
    }
  }
  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>
      <Menu />
      <div className="bg-cover bg-[url('/kalejdoskop-bg.png')] flex flex-row h-screen md:pl-[192px]">
        <div className="flex w-full pl-1 md:w-2/4 flex-col items-center h-full bg-white/80">
          <div className=" flex flex-row md:border border-grey justify-between w-full px-4 pt-16 md:pt-5 pb-4">
            {handleTitle()}
            <select
              onChange={handleFilter}
              value={filter}
              className="rounded-sm text-xs cursor-pointer"
            >
              <option default value="all">
                Alla inlägg
              </option>
              <option value="pending">Nya inlägg</option>
              <option value="approved">Godkända inlägg</option>
              <option value="denied">Nekade inlägg</option>
            </select>
          </div>

          <div className="w-full h-full overflow-hidden">
            <ul className="overflow-y-auto overflow-x-hidden touch-auto h-[98%] w-full">
              {filteredMessages()
                .filter((message) => message.status === "pending")
                .map((message) => (
                  <li
                    className={`hover:bg-grey rounded-sm cursor-pointer flex flex-row px-1 py-4 border-r border-r-grey border-y border-y-grey border-l-4 border-l-[#0827F5] mb-1 ${
                      message.id === selectedMessage?.id
                        ? "bg-grey"
                        : "bg-[#f0f8ff]"
                    }`}
                    key={message.id}
                    onClick={() => openModal(message.id)}
                  >
                    <img src="pendingicon.png" className="w-8 h-8" />
                    <div className="flex-row ml-2 w-[80%]">
                      <p className="truncate max-w-xs text-base font-bold">
                        {message.message}
                      </p>
                      <p className="truncate w-full max-w-xs text-xs font-bold ">
                        {format(
                          new Date(message.timestamp),
                          "yyyy-MM-dd HH:mm"
                        )}
                      </p>
                    </div>
                  </li>
                ))}

              {filteredMessages()
                .filter((message) => message.status === "approved")
                .map((message) => (
                  <li
                    className={`hover:bg-grey rounded-sm cursor-pointer flex flex-row pl-1 py-4 border border-grey pl-2 mb-1  ${
                      message.id === selectedMessage?.id
                        ? "bg-grey"
                        : "bg-white"
                    }`}
                    key={message.id}
                    onClick={() => openModal(message.id)}
                  >
                    {" "}
                    <img src="approvedicon.png" className="w-8 h-8" />
                    <div className="flex-row ml-2 w-[80%]">
                      <p className="truncate w-full max-w-xs text-base">
                        {message.message}
                      </p>
                      <p className="truncate w-full max-w-xs  text-xs">
                        {format(
                          new Date(message.timestamp),
                          "yyyy-MM-dd HH:mm"
                        )}
                      </p>
                    </div>
                  </li>
                ))}

              {filteredMessages()
                .filter((message) => message.status === "denied")
                .map((message) => (
                  <li
                    className={`hover:bg-grey rounded-sm cursor-pointer flex flex-row px-1 py-4 border border-grey pl-2 mb-1  ${
                      message.id === selectedMessage?.id
                        ? "bg-grey"
                        : "bg-white"
                    }`}
                    key={message.id}
                    onClick={() => openModal(message.id)}
                  >
                    <img src="deniedicon.png" className="w-8 h-8" />
                    <div className="flex-row ml-2 w-[80%]">
                      <p className="truncate w-full max-w-xs text-base">
                        {message.message}
                      </p>
                      <p className="truncate w-full max-w-xs text-xs ">
                        {format(
                          new Date(message.timestamp),
                          "yyyy-MM-dd HH:mm"
                        )}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className=" bg-white bg-opacity-60 md:pt-[30px] md:px-[10px] w-full h-full overflow-y-auto">
          {showMessage ? (
            <div className="fixed top-0 left-0 bottom-0 right-0 mr-4 md:mr-0 z-50 bg-white md:bg-white/80 md:relative flex  flex-col ">
              <div className="flex justify-end text-xl">
                {editing ? (
                  <button
                    onClick={() => setEditing(false)}
                    className=" p-2 bg-accent rounded-md text-white text-sm mt-4 mr-4 block"
                  >
                    Avbryt
                  </button>
                ) : (
                  <div className="flex flex-row mt-4 mr-4">
                    {" "}
                    <img
                      src="edit.png"
                      onClick={handleEdit}
                      className="cursor-pointer w-5 h-5"
                    />{" "}
                    <img
                      src="x-square.png"
                      className="cursor-pointer ml-3 w-5 h-5"
                      onClick={closeModal}
                    />
                  </div>
                )}
              </div>

              <div className="xs:m-10 m-4 ">
                <p className="mb-4 flex flex-row">
                  {format(new Date(selectedMessage.timestamp), "yyyy-MM-dd")}{" "}
                  {format(new Date(selectedMessage.timestamp), "HH:mm")}
                </p>
                <p className="mb-2 flex flex-row text-sm">
                  Status: {handleStatus()}
                </p>
                <p className="mb-2 flex flex-row text-sm">
                  Rum: {selectedMessage.room}
                </p>
                <p className="mb-4 flex flex-row text-sm">
                  Objekt: {selectedMessage.object}
                </p>{" "}
                {!editing ? (
                  <p>{selectedMessage.message}</p>
                ) : (
                  <textarea
                    id={selectedMessage.id}
                    defaultValue={selectedMessage.message}
                    value={editedText}
                    onChange={handleEdit}
                    rows={6}
                    className="border border-black w-full h-auto"
                  />
                )}
              </div>
              <div className="m-10">
                <button
                  onClick={() => handleMessage(selectedMessage, "approve")}
                  className=" rounded-lg bg-[#02CC3B] text-white py-2 px-2"
                >
                  Godkänn
                </button>
                <button
                  onClick={() => handleMessage(selectedMessage, "deny")}
                  className="rounded-lg bg-[#FF1C1C] text-white py-2 px-6 ml-2"
                >
                  Neka
                </button>
              </div>
            </div>
          ) : null}
          {showApprove ? (
            <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-white md:relative">
              <div className="flex justify-end mt-0 md:mt-4 mr:2 md:mr-0">
                <img
                  src="x-square.png"
                  className="cursor-pointer ml-3 w-5 h-5 mt-10 md:mt-0"
                  onClick={closeChangedStatusModal}
                />
              </div>
              <div className="flex flex-col justify-center items-center mt-20">
                <p className="mb-10 text-lg">
                  Inlägget har <span className="text-[#02CC3B]">godkänts</span>
                </p>
                <div>
                  <button
                    onClick={startRegret}
                    className="rounded-lg bg-grey text-black py-2  w-20"
                  >
                    Ångra
                  </button>
                  {pendingMessages && pendingMessages.length > 0 ? (
                    <button
                      onClick={nextMessage}
                      className="rounded-lg bg-[#0827F5] text-white py-2 px-6 ml-4"
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
            <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-white md:relative">
              <div className="flex justify-end mt-0 md:mt-4 mr:2 md:mr-0">
                <img
                  src="x-square.png"
                  className="cursor-pointer ml-3 w-5 h-5"
                  onClick={closeChangedStatusModal}
                />
              </div>
              <div className="flex items-center justify-center flex-col mt-20">
                <p className="mb-10 text-lg">
                  Inlägget har <span className="text-[#FF1C1C]">nekats</span>
                </p>
                <div>
                  <button
                    onClick={startRegret}
                    className="rounded-lg bg-grey text-black py-2  w-20"
                  >
                    Ångra
                  </button>
                  {pendingMessages && pendingMessages.length > 0 ? (
                    <button
                      onClick={nextMessage}
                      className="rounded-lg bg-[#0827F5] text-white py-2 px-6 ml-4"
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
