import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiEdit, BiXCircle } from "react-icons/Bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/Io";
import {
  MdOutlineDoNotDisturbAlt,
  MdOutlineLocalPostOffice,
} from "react-icons/md";
import Menu from "../../components/Menu";
import confetti from "canvas-confetti";
import axios from "axios";

function Posts() {
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
  function getMessages() {
    axios
      .get("http://localhost:4000/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getMessages();
  }, []);

  async function patchMessageText(message) {
    const newMessage = {
      id: message.id,
      message: editedText,
    };
    try {
      await axios.patch("http://localhost:4000/messages", newMessage);
      getMessages();
    } catch (err) {
      console.log(err);
    }
  }

  function openModal(messageId) {
    const message = messages.find((message) => message.id === messageId);
    if (!message) {
      return;
    }
    setShowApprove(false);
    setShowDeny(false);
    setSelectedMessage(message);
    setPreviousMessage(message);
    setShowMessage(true);
  }

  function closeModal() {
    setShowMessage(false);
    setEditing(false);
    setEditedText("");
    //setSelectedMessage(null);
  }

  function closeChangedStatusModal() {
    setShowApprove(false);
    setShowDeny(false);
  }

  // efter att en har ångrat status så ändras det tillbaka i databasen men inte på meddelandet som öppnas.
  // flytta på stänga-modal-knappen på statuschange-modalen.
  // selecten är konstig

  // kan man ta emot edited text med patch funktionen i controller?

  // ska vi ha med room och object i adminpanelen också i meddelande modalen?

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
    const newMessage = {
      id: message.id,
      status: "approved",
    };
    try {
      await axios.patch("http://localhost:4000/messages", newMessage);
      getMessages();
      confetti({
        particleCount: 10,
        shapes: ["star"],
        spread: 360,
        startVelocity: 25,
      });
      closeModal();
      setShowApprove(true);
    } catch (err) {
      console.log(err);
    }
    console.log(newMessage);
  }

  async function handleDeny(message) {
    const newMessage = {
      id: message.id,
      status: "denied",
    };
    try {
      await axios.patch("http://localhost:4000/messages", newMessage);
      getMessages();
      confetti({
        particleCount: 10,
        shapes: ["star"],
        spread: 360,
        startVelocity: 25,
      });
      closeModal();
      setShowDeny(true);
    } catch (err) {
      console.log(err);
    }
    console.log(newMessage);
  }

  /*function handleApprove() {
    setMessages(
      messages.map((message) => {
        if (message.id === selectedMessage.id) {
          return { ...message, status: "approved" };
        }
        return message;
      })
    );
    confetti({
      particleCount: 10,
      shapes: ["star"],
      spread: 360,
      startVelocity: 25,
    });
    closeModal();
    setShowApprove(true);
  }

  function handleDeny() {
    setMessages(
      messages.map((message) => {
        if (message.id === selectedMessage.id) {
          return { ...message, status: "denied" };
        }
        return message;
      })
    );
    confetti({
      particleCount: 10,
      shapes: ["star"],
      spread: 360,
      startVelocity: 25,
    });
    closeModal();
    setShowDeny(true);
  }
    function handleRegretStatus() {
    setSelectedMessage(previousMessage);
    setMessages(
      messages.map((message) => {
        if (message.id === selectedMessage.id) {
          message.status = previousMessage.status;
        }
        return message;
      })
    );
    openModal(selectedMessage.id);
  }
*/

  async function handleRegretStatus() {
    setSelectedMessage(previousMessage);
    try {
      await axios.patch("http://localhost:4000/messages", previousMessage);
      openModal(selectedMessage.id);
    } catch (err) {
      console.log(err);
    }
    getMessages();
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
      return <p className="text-[#0827F5] ml-2 ">Ny</p>;
    } else if (selectedMessage.status === "approved") {
      return <p className="text-[#02CC3B] ml-2 ">Godkänd</p>;
    } else if (selectedMessage.status === "denied") {
      return <p className="text-[#FF1C1C] ml-2 ">Nekad</p>;
    }
  }

  function handleEdit(e) {
    setEditing(true);
    setEditedText(e.target.value);
  }

  function handleSaveEdit() {
    setSelectedMessage({ ...selectedMessage, message: editedText });
    setMessages(
      messages.map((message) => {
        if (message.id === selectedMessage.id) {
          return { ...message, message: editedText };
        }
        return message;
      })
    );
    setEditedText("");
    setEditing(false);
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
      <div className="flex flex-row max-h-screen xs:mx-[20px] md:ml-[194px] overflow-auto">
        <div className="flex w-[100%] md:w-1/2 flex-col mt-20 items-center max-h-full">
          <form>
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
          <div className="w-[100%] max-h-full ">
            {handleTitle()}
            <ul className="overflow-y-auto touch-auto max-h-full h-[96%] w-[100%]">
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
                    <IoMdCheckmarkCircleOutline className="text-[#02CC3B] p-10" />
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
                    <MdOutlineLocalPostOffice className="text-[#0827F5]" />
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
                    <IoMdCheckmarkCircleOutline className="text-[#02CC3B]" />
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
                    <MdOutlineDoNotDisturbAlt className="text-[#FF1C1C]" />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className=" md:pt-[90px] md:max-h-full overflow-y-auto">
          {showMessage ? (
            <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-white md:relative ">
              <div className="flex justify-end m-4 text-xl">
                {editing ? (
                  <div>
                    <button
                      onClick={() => handleSaveEdit(selectedMessage.id)}
                      className=" rounded-3xl bg-[#02CC3B] text-white py-2 px-4"
                    >
                      Spara
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className=" rounded-3xl bg-grey text-black py-2 px-4 ml-2"
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
                    className=" w-full"
                  />
                )}

                {!editing ? (
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
                ) : null}
              </div>
            </div>
          ) : null}
          {showApprove ? (
            <div className="mt-20 fixed top-0 left-0 bottom-0 right-0 z-50 bg-white md:relative">
              <div className="flex justify-end"></div>
              <BiXCircle
                className="cursor-pointer ml-3"
                onClick={closeChangedStatusModal}
              />
              <div className="flex items-center justify-center flex-col">
                <p className="mb-10 text-lg ml-2">
                  Inlägget har <span className="text-[#02CC3B]">godkänts</span>
                </p>
                <div>
                  <button
                    onClick={handleRegretStatus}
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
              {" "}
              <BiXCircle
                className="cursor-pointer ml-3"
                onClick={closeChangedStatusModal}
              />
              <div className="flex items-center justify-center flex-col">
                <p className="mb-10 text-lg">
                  Inlägget har <span className="text-[#FF1C1C]">nekats</span>
                </p>
                <div>
                  <button
                    onClick={handleRegretStatus}
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
export default Posts;
