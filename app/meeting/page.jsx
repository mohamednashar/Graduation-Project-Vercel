"use client"
import React, { useRef, useEffect, useState } from 'react';
import SimplePeer from 'simple-peer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMicrophone, faPhoneSlash, faMicrophoneSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeVideo();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const handleStartCall = () => {
    const newPeer = new SimplePeer({ initiator: true, stream: localStream });

    newPeer.on('stream', stream => {
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    newPeer.on('signal', data => {
      // Send signaling data to the remote peer (implementation not included in this example)
    });

    setPeer(newPeer);
    setIsCalling(true);
  };

  const handleJoinCall = (signalData) => {
    const newPeer = new SimplePeer({ initiator: false, stream: localStream });

    newPeer.on('stream', stream => {
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    newPeer.on('signal', data => {
      // Send signaling data to the initiator peer (implementation not included in this example)
    });

    newPeer.signal(signalData);

    setPeer(newPeer);
    setIsCalling(true);
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Video Chat</h2>
          {isCalling ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => setIsCalling(false)}>
              <FontAwesomeIcon icon={faPhoneSlash} className="mr-2" />
              End Call
            </button>
          ) : (
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={handleStartCall}>
              <FontAwesomeIcon icon={faVideo} className="mr-2" />
              Start Call
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-sm font-medium mb-2">Your Video</h3>
            <video ref={localVideoRef} autoPlay playsInline muted={isMuted} className="w-48 h-36 object-cover rounded-md shadow-md" />
            <button className={`mt-2 px-3 py-1 rounded-md ${isMuted ? 'bg-red-500' : 'bg-green-500'} text-white`} onClick={toggleMute}>
              <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className="mr-2" />
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium mb-2">Remote Video</h3>
            <video ref={remoteVideoRef} autoPlay playsInline className="w-48 h-36 object-cover rounded-md shadow-md" />
            <button className="mt-2 px-3 py-1 rounded-md bg-blue-500 text-white">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Invite Others
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
