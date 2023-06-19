import React, { useRef, useState } from 'react'
import DemoVideo from '../../assets/user.mp4'
import TestVideo from '../../assets/test.mp4'
function Chatbot() {
  const videoRef = useRef('videoref')


  const videoSrcChanger = () => {
   videoRef.current.src = TestVideo
   videoRef.current.play()
   videoRef.current.loop = false
   videoRef.current.onended= () => {
    videoRef.current.src = DemoVideo
  }
   console.log(videoRef, 'videoref');
  }
  return (
    <div className="w-3/6 m-auto ">
      <div className="flex justify-center">
        <video ref={videoRef} autoPlay={true} loop class="rounded-full w-60">
          <source src={DemoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <button onClick={videoSrcChanger}>change</button>
    </div>
  )
}

export default Chatbot