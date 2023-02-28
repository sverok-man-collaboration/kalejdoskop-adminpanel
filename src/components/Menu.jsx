import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

function Menu() {
  const active = { color: "var(--accent-color)" };
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      clipPath: "circle(2000px at 30px 30px)",
      transition: {
        duration: 0.6,
        ease: "easeIn",
        staggerChildren: 0.1,
      },
    },
    closed: {
      clipPath: "circle(24px at 30px 30px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };
  const childVariants = {
    open: {
      opacity: 1,
      y: "15px",
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
    closed: {
      opacity: 0,
      y: "0",
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
  };

  return (
    <div>
      <div id="MenuSmall" className="inline-block md:hidden h-screen z-50">
        <motion.nav
          initial={{ clipPath: "circle(24px at 30px 30px)" }}
          className="h-screen flex flex-col w-48 bg-primary text-white pt-2 pb-2"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
        >
          <div
            id="hamburger"
            className="pl-[15px] pt-[7px]"
            onClick={() => {
              setIsOpen((isOpen) => !isOpen);
            }}
          >
            {isOpen ? (
              <MdClose color="var(--white)" size={30} />
            ) : (
              <FiMenu color="var(--white)" size={30} />
            )}
          </div>

          <motion.div variants={childVariants} key="start">
            <NavLink
              to="/overview"
              style={({ isActive }) => (isActive ? active : undefined)}
            >
              <p className="py-4 ml-2">START</p>
              <div className="h-px w-11/12 mx-2 bg-gradient-to-r from-accent to-primary"></div>
            </NavLink>
          </motion.div>

          <motion.div variants={childVariants} key="posts">
            <NavLink
              to="/posts"
              style={({ isActive }) => (isActive ? active : undefined)}
            >
              <p className="py-4 mx-2">INLÄGG</p>
              <div className="h-px w-11/12 mx-2 bg-gradient-to-r from-accent to-primary"></div>
            </NavLink>
          </motion.div>

          <motion.div
            variants={childVariants}
            key="logoutButton"
            className="mb-6 mt-auto mx-auto w-2/3"
          >
            <button className="transform bg-accent transition duration-500 rounded-md text-white p-2 hover:bg-accent Hover w-full">
              Logga ut
            </button>
          </motion.div>
        </motion.nav>
      </div>

      <nav className="hidden md:flex flex-col w-48 bg-primary h-screen text-white pt-2 pb-2 z-50">
        <NavLink
          to="/overview"
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          <p className="py-4 ml-2">START</p>
          <div className="h-px w-11/12 mx-2 bg-gradient-to-r from-accent to-primary"></div>
        </NavLink>
        <NavLink
          to="/posts"
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          <p className="py-4 mx-2">INLÄGG</p>
          <div className="h-px w-11/12 mx-2 bg-gradient-to-r from-accent to-primary"></div>
        </NavLink>

        <button className="transform bg-accent transition duration-500 rounded-md mt-10 text-white p-2 m-4 hover:bg-accentHover mb-4 mt-auto">
          Logga ut
        </button>
      </nav>
    </div>
  );
}

export default Menu;
