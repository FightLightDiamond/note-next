import {useEffect, useState} from "react";
// import Peer from 'peerjs';
// import {PeerServer} from "peer"
// const peerServer = PeerServer({ port: 9000, path: '/myapp' });
// peerServer.on('open', id => {
//   console.log({id})
// })

/**
 *
 * @constructor
 */
const Stream = () => {
  const [id, setId] = useState<any>()
  const [idCall, setIdCall] = useState<string>()
  const [peer, setPeer] = useState<any>(null)

  useEffect(() => {
    import('peerjs').then(({ default: Peer }) => {

      const peer = new Peer({
        host: '127.0.0.1',
        port: 9000,
        path: '/fld',
        config: {
          iceServers: []
        }
      });

      setPeer(peer)

      peer.on('open', (id: string) => {
        setId(id)
      });

      // Nhận
      peer.on('call', (call: any) => {
        openStream().then((stream: any) => {
          call.answer()
          playStream('localStream', stream)
          call.on('stream', (remoteStream: any) => playStream('remoteStream', remoteStream))
        }).catch((err) => {
          console.log(err.name + ": " + err.message)
        })
      })
    });


  }, [])

  const openStream = () => {
    const config = {
      audio: false,
      video: {
        frameRate: 40,
        height: 720,
        width: 1280,
        // mandatory: {
        //   minWidth: 1280,
        //   minHeight: 720,
        //   minFrameRate: 40
        // },
        // optional: [{minFrameRate: 60}]
      }
    }
    return navigator.mediaDevices.getUserMedia(config)
  }

  const playStream = (videoId: string, mediaStream: any) => {
      const video: any = document.getElementById(videoId)
      video.srcObject = mediaStream;
      video.onloadedmetadata = function (e: any) {
        video.play();
      }
  }

  return (
    <>
      <div>
        <h1>{id}</h1>
        <input type="text" onChange={(event => setIdCall(event.target.value))} />
        <button type="button" onClick={() => openStream().then(stream => {
          //Caller
          playStream('localStream', stream)
          const call = peer.call(idCall, stream)
          call.on('stream', (remoteSteam: any) => {
            playStream('remoteStream', stream)
          })
        })}>openStream</button>
        <video id='localStream' />
        <video id='remoteStream' />
        {/*<video id='videoPlayer' width={650} controls autoplay>*/}
        {/*  <source src=''  type='' />*/}
        {/*</video>*/}
      </div>
    </>
  )
}

export default Stream
