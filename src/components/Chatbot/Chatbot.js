import React, { useRef, useState } from "react";
import AvatarVideo from "../../assets/avatar-video.mp4";
import TestVideo from "../../assets/test.mp4";
import { AiOutlineSend } from "react-icons/ai";
function Chatbot() {
  const videoRef = useRef("videoref");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    "##input##Hello, How are you?",
    "I am fine. You",
    "##input##Tell me about your self",
    "I am busy with a Chatbot Project.",
    "##input##Are you AI developer?",
    "Yes. I am AI developer and MERN Stack web developer. I am working from 5 years as a MERN Stack web developer.",
    "Do you know what is MERN Stack?",
    "##input##No. I don't know.",
    "##input##Please Explain it for me.",
    "MERN is a technology Stack for Custom web development. MERN is combination of MongoDB, ExpressJS, ReactJS, NodeJS. We use this technology to develop a complete web application",
  ]);

  const videoSrcChanger = (source) => {
    videoRef.current.loop = false;
    // videoRef.current.onended = () => {
    //   videoRef.current.src = AvatarVideo;
    // };
    videoRef.current.src = source;
    videoRef.current.onloadstart = () => {
      console.log("load start");
    };
    videoRef.current.onloadedmetadata = () => {
      console.log("loaded metadata");
      videoRef.current.play();
    };
    videoRef.current.onloadeddata = () => {
      console.log("loaded done");
    };
  };
  const promptHandler = () => {
    setMessages([...messages, "##input##" + input]);
    fetch("http://localhost:8000/bot/avatar-voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        avatar: "https://i.ibb.co/k3jG4hV/demo-avatar.png",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        videoSrcChanger(res.video);
        setMessages([...messages, "##input##" + input, res.text]);
      })
      .catch((err) => {
        console.log(err);
      });
    setInput("");
  };
  return (
    <div className="">
    <div className="w-full sm:px-0 sm:w-4/6 md:3/6 max-w-2xl m-auto mt-5">
      <div className="flex justify-center">
        <video ref={videoRef} autoPlay={true} loop class="rounded-full w-52">
          <source src={AvatarVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/*  Messages started   */}
      <div className="mt-5 px-5 sm:px-0 mb-20">
        {messages.map((msg, id) => {
          return (
            <div key={msg + id} >
              {msg.includes("##input##") ? (
                // User Message (Right)
                <div className="my-2 flex justify-end break-words text-white">
                  <div className=" bg-[#7459fe] max-w-[70%] inline-block p-2 rounded-xl rounded-tr-none">
                    {msg.replace("##input##", "")}
                  </div>
                </div>
              ) : (
                // Bot Message (Left)
                <div className="my-2">
                  <div className=" bg-[#f1f2f6] max-w-[70%] p-2 rounded-xl  rounded-bl-none">
                    {msg}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      
    </div>
    {/* Input Box  */}
    <div className="w-full sm:px-0 sm:w-4/6 md:3/6 max-w-2xl flex justify-center  bg-white fixed bottom-0 left-0 right-0 m-auto ">
    <div className="my-4 w-[90%] sm:w-full flex items-center gap-2">
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="write your prompt.."
        className=" border-[1px] w-full py-2 px-4 rounded-3xl outline-[#7459fe]"
      />

      <div
        className="bg-[#7459fe] p-2 rounded-3xl cursor-pointer"
        onClick={promptHandler}
      >
        <AiOutlineSend className=" text-white text-xl" />
      </div>
    </div>
  </div>
  </div>
  );
}

export default Chatbot;
