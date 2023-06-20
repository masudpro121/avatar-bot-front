import React, { useRef, useState } from "react";
import AvatarVideo from "../../assets/avatar-video.mp4";
import TestVideo from "../../assets/test.mp4";
function Chatbot() {
  const videoRef = useRef("videoref");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    "##input##Hello, How are you?kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkffffffffffffffffffffffffjjjjjjjjjjjjjjjjjj",
    "I am fine. You",
    "##input##Tell me about your self",
    "I am going to school now. I will be back at night",
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
    <div className="w-3/6 m-auto ">
      <div className="flex justify-center">
        <video ref={videoRef} autoPlay={true} loop class="rounded-full w-60">
          <source src={AvatarVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/*  Messages started   */}
      <div className="mt-5">
        {messages.map((msg, id) => {
          return (
            <div key={msg + id}>
              {msg.includes("##input##") ? (
                // User Message (Right)
                <div className="flex justify-end break-words text-white">
                  <div className=" bg-[#7459fe] max-w-[70%] inline-block p-2 rounded-xl rounded-tr-none">
                    {msg.replace("##input##", "")}
                  </div>
                </div>
              ) : (
                // Bot Message (Left)
                <div className="my-4">
                  <div className=" bg-[#f1f2f6] max-w-[70%] p-2 rounded-xl  rounded-bl-none">
                    {msg}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Box  */}
      <div className="mt-5">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="write your prompt.."
        />
        <button onClick={promptHandler}>Submit</button>
      </div>
    </div>
  );
}

export default Chatbot;
