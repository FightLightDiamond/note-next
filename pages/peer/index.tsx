import {useEffect, useState} from "react";
// import Peer from 'peerjs';
/**
 *
 * @constructor
 */
const Stream = () => {
  const [id, setId] = useState<any>()
  const [idCall, setIdCall] = useState<string>()
  const [peer, setPeer] = useState<any>(null)

  useEffect(() => {
    import('peerjs').then(({default: Peer}) => {
      // Connect Signaling Server to transfer message
      const peer = new Peer({
        host: '127.0.0.1',
        port: 9000,
        path: '/fld',
        config: {
          iceServers: [
            {
              urls: [
                'stun:stun.services.mozilla.com',
                'stun:stun.l.google.com:19302',
              ]
            }
          ]
        }
      });

      setPeer(peer)
      // Save ID
      peer.on('open', (id: string) => {
        setId(id)
      });

      // Nhận
      peer.on('call', (call: any) => {
        // debugger
        console.log('Answer', call)
        console.log('ID', call.peer)
        call.answer()
        call.on('stream', (remoteStream: any) => playStream('remoteStream', remoteStream))

        openStream().then((stream: any) => {
          playStream('localStream', stream)

          // peer.call(call.peer, stream)
        }).catch((err) => {
          console.log(err.name + ": " + err.message)
        })
      })
    });
  }, [])

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

      // mandatory: {
      //   minWidth: 1280,
      //   minHeight: 720,
      //   minFrameRate: 40
      // },
      // optional: [{minFrameRate: 60}]
    }
  }

  const openStream = () => {
    return navigator.mediaDevices.getUserMedia(streamConstraintsConfig)
  }

  const playStream = (videoId: string, mediaStream: any) => {
    const video: any = document.getElementById(videoId)
    video.srcObject = mediaStream;

    video.onloadedmetadata = function (e: any) {
      video.play();
    }
  }

  const CallID = () => {
    openStream().then( (stream) => {
      // //Caller
      playStream('localStream', stream)
      //Call to other
      const call = peer.call(idCall, stream)

      call.peerConnection.onaddstream = function (event: any) {
        call.addStream (event.stream, call);
      }

      peer.on('call', (call: any) => {
        // never called
        console.log('This peer is being called...');
        call.answer(stream)
        call.on('stream', (remoteSteam: any) => {
          console.log('This peer is being called...on-stream...');
          playStream('remoteStream', remoteSteam)
        })
      });

      call.on('stream', (remoteSteam: any) => {
        console.log('remoteSteam', remoteSteam)
        playStream('remoteStream', remoteSteam)
      })
    }).catch((err) => {
      console.log(err.name + ": " + err.message)
    })
  }

  return (
    <>
      <div>
        <h1>{id}</h1>
        <input type="text" onChange={(event => setIdCall(event.target.value))}/>
        <button type="button" onClick={CallID}>openStream</button>
        <video id='localStream'/>
        <video id='remoteStream'/>
      </div>
    </>
  )
}

export default Stream
