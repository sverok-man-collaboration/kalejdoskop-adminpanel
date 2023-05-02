import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

function Login() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const clientToken = urlParams.get("token");

      if (!clientToken) {
        console.error("Client token not provided");
        return;
      }

      console.log(clientToken);
    };

    fetchToken();
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const clientToken = urlParams.get("clientToken");
  console.log(clientToken);

  async function loginRequest(email) {
    try {
      const response = await axios.post("http://localhost:4000/", {
        email: email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginRequest(email);
    setEmail("");
  }

  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>

      <div className="flex  min-h-screen w-full flex-row">
        <div className="flex flex-col justify-center items-center w-full">
          <section className="h-300 flex flex-col p-20 w-full max-w-md">
            <h2 className="text-xl mb-10">Projekt namn</h2>
            <form className="flex flex-col max-w-md">
              <label className="text-xs after:content-['*'] mb-2">Email </label>
              <input
                type="email"
                onChange={handleChange}
                value={email}
                className="border-b border-primary sm:text-sm p-2 "
                placeholder="email@example.se"
              />
              <button
                disabled={!email}
                type="submit"
                onClick={handleSubmit}
                className="transform bg-accent transition duration-500 rounded-md mt-10 text-white p-2 hover:bg-accentHover mb-4"
              >
                Logga in
              </button>
            </form>
            <small>
              Skriv in din e-mail address och klicka sen på verifieringslänken
              för att logga in.
            </small>
          </section>
        </div>

        <section className="flex hidden lg:flex bg-primary flex-col w-full justify-center items-center relative">
          <img
            className="absolute top-23 left-20 animate-pulse opacity-25 h-1 w-1 "
            src="star.png"
          />
          <img
            className="absolute bottom-40 left-10 h-2 w-2 animate-pulse"
            src="star.png"
          />
          <img
            className="absolute top-20 right-10 animate-pulse h-3 w-3 opacity-25 "
            src="star.png"
          />
          <img
            className="absolute top-20 left-10 animate-pulse h-1 w-1"
            src="star.png"
          />
          <img
            className="absolute top-10 left-30 animate-pulse h-2 w-2"
            src="star.png"
          />
          <img
            className="absolute top-40 left-10 animate-pulse h-3 w-3 opacity-75"
            src="star.png"
          />
          <img
            className="absolute top-60 right-40 h-1 w-1 animate-pulse opacity-50"
            src="star.png"
          />
          <img
            className="absolute top-40 right-60 h-2 w-2 animate-pulse opacity-50"
            src="star.png"
          />
          <span className="rounded-full h-40 w-40 bg-gradient-to-r from-accent to-primary mt-6 drop-shadow-lg">
            &nbsp;
          </span>
          <img
            className="absolute bottom-20 left-60 h-1 w-1 animate-pulse"
            src="star.png"
          />
          <img
            className="absolute top-40 left-40 h-2 w-2 animate-pulse opacity-75"
            src="star.png"
          />
          <img
            className="absolute bottom-10 left-40 h-3 w-3 animate-pulse"
            src="star.png"
          />
          <img
            className="absolute bottom-40 left-40 h-1 w-1 animate-pulse opacity-50"
            src="star.png"
          />
          <img
            className="absolute bottom-26 right-14 h-2 w-2 animate-pulse"
            src="star.png"
          />
          <img
            className="absolute bottom-20 h-3 w-3 right-20 animate-pulse opacity-25"
            src="star.png"
          />
          <img
            className="absolute bottom-24 h-1 w-1 right-23 animate-pulse"
            src="star.png"
          />
          <img
            className="absolute bottom-14 h-2 w-2 right-14 animate-pulse opacity-50"
            src="star.png"
          />
        </section>
      </div>
    </div>
  );
}
export default Login;
