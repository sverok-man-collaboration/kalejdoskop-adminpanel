import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import Menu from "../../components/Menu";

function Posts() {
  const [showPost, setShowPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState();

  function openModal() {
    setShowPost(true);
  }

  function closeModal() {
    setShowPost(false);
  }

  /*
const status = {
 pending, approved, denied
}

 <form className="mt-5">
                <select className="border border-primary p-1 cursor-pointer">
                <option selected disabled>
                -- Status --
              </option>
                  <option value="approved">Godkänn</option>
                  <option value="denied">Neka</option>
                </select>
                <button className="bg-accent rounded-md px-2 py-1 ml-2">Spara</button>
              </form>
*/

  const [posts, setPosts] = useState([
    { id: 1, text: "Det här är en ny post" },
    { id: 2, text: "Även det här är en ny post att läsa" },
    { id: 3, text: "Det här är också en ny post" },
  ]);

  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>
      <Menu />
      <div className="flex flex-row">
        <div className="w-48 bg-primary h-[700]"></div>
        <div className="flex w-1/2 mt-10 flex-col items-center">
          <form>
            <select className="border border-primary p-1 cursor-pointer">
              <option selected disabled>
                -- Filtrera --
              </option>
              <option value="approvedPosts">Godkända posts</option>
              <option value="deniedPosts">Nekade posts</option>
              <option value="posts">Alla posts</option>
            </select>
          </form>
          <h4 className=" text-center mt-5 ">NYTT</h4>
          <div className="border-t border-accent w-[88%]">
            {posts.map((post) => (
              <p
                className="cursor-pointer mb-2"
                key={post.id}
                onClick={openModal}
              >
                {post.text}
              </p>
            ))}
          </div>
          <h4 className=" text-center mt-5 ">BESVARADE</h4>
          <div className="border-t border-accent w-[88%]">
            <p className="ml-2 mt-2">Det här är en äldre post</p>
          </div>
        </div>

        <div className="w-1/2 mt-10">
          {showPost ? (
            <div className="w-[88%] mt-16 h-[450px] border border-accent">
              <div className="flex justify-end m-4 text-xl">
                <h3 className="cursor-pointer" onClick={closeModal}>
                  X
                </h3>
              </div>
              <div className="m-10">
                <p className="mb-4">Status: </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  corporis repudiandae, in pariatur corrupti natus, ducimus nemo
                  expedita officiis iure earum facilis aliquam suscipit saepe
                  odit. Libero voluptatem similique. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Illo corporis repudiandae, in
                  pariatur corrupti natus.
                </p>
                <div className="mt-10">
                  <button className=" rounded-3xl bg-secondary text-primary py-2 px-4">
                    Godkänn
                  </button>
                  <button className="rounded-3xl bg-accent text-primary py-2 px-4 ml-2">
                    Neka
                  </button>
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
