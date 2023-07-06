import React from "react";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import BarChart from "./components/BarChart";

function Overview() {
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [approvedMessages, setApprovedMessages] = useState([]);

  const navigate = useNavigate();

  function filterMessages(data) {
    const pending = data.filter((message) => message.status === "pending");
    setPendingMessages(pending);
    const approved = data.filter((message) => message.status === "approved");
    setApprovedMessages(approved);
  }

  async function getMessages() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No token available");
      return navigate("/");
    }
    try {
      const URL = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${URL}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem("token", res.data.newToken);
      setMessages(res.data.messages);
      filterMessages(res.data.messages);
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

  const handleClick = (filterValue) => {
    navigate("/messages", { state: { filter: filterValue } });
  };

  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>
      <Menu />
      <div className="bg-cover bg-[url('/kalejdoskop-bg.png')] w-full h-screen md:pl-[192px]">
        <div className="bg-white/80 h-full w-full flex flex-col">
          <div className="pt-20 flex flex-row flex-wrap justify-center">
            <div
              onClick={() => handleClick("pending")}
              className="cursor-pointer flex items-center h-[110px] w-[200px] pb-2 bg-gradient-to-r m-2 md:m-4 from-[#8997F5] to-[#0827F5] shadow-[#0827F5] shadow-md "
            >
              <h4 className="flex flex-col text-white ml-4">
                Nya inlägg <span>{pendingMessages.length}</span>
              </h4>
            </div>

            <div
              onClick={() => handleClick("all")}
              className="cursor-pointer w-[200px]  flex items-center h-[110px] pb-2 bg-gradient-to-r m-2 md:m-4 from-secondary to-primary  shadow-primary shadow-md"
            >
              <h4 className="flex flex-col text-white ml-4">
                Antal inlägg <span>{messages.length}</span>
              </h4>
            </div>

            <div
              onClick={() => handleClick("approved")}
              className="cursor-pointer flex items-center w-[200px] h-[110px] pb-2 bg-gradient-to-r m-2 md:m-4 from-[#5FF78A] to-[#02CC3B]  
         shadow-[#02CC3B] shadow-md"
            >
              <h4 className="flex flex-col text-white ml-4">
                Antal godkända inlägg <span>{approvedMessages.length}</span>
              </h4>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[240px] md:w-[580px] mt-10 sm:mt-20 mx-[8px]">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Overview;
