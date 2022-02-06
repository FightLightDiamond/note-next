import React, {useState} from "react";

const Call = () => {

  const iceServers = [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302', }
  ]

  const streamConstraintsConfig = {
    audio: false,
    video: {
      frameRate: 40,
      height: {
        min: 200,
        max: 640
      },
      width: {
        min: 300,
        max: 640
      },
    }
  }

  const localVideo: any = React.createRef<HTMLVideoElement>();
  const remoteVideo: any = React.createRef<HTMLVideoElement>();
  const btnGoRoom: any = React.createRef<HTMLButtonElement>();
  const inputNumberRoom: any = React.createRef<HTMLInputElement>();

  const goRoom = () => {
   navigator.mediaDevices.getUserMedia(streamConstraintsConfig).then((stream) => {
      localVideo.current.srcObject = stream
    }).catch((err) => {
      console.log('An error ocurred', err)
   });

  }

  return (
    <>
      <h1>Call</h1>
      <div id="selectRom">
        <label>Room name</label>
        <input ref={inputNumberRoom} type="text" id="roomNumber"/>
        <button onClick={goRoom} ref={btnGoRoom}>Go</button>
      </div>
      <div>
        <video id="localVideo" ref={localVideo} autoPlay></video>
        <video id="remoteVideo" ref={remoteVideo} autoPlay></video>
      </div>
    </>
  )
}

export default Call
