"use client"
import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const MyComponent = () => {
  return (
      <div className="flex flex-col">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName="Enter Your Room Name"
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo={{
              displayName: 'Mohamed'
            }}
            onApiReady={(externalApi) => {
              // here you can attach custom event listeners to the Jitsi Meet External API
              // you can also store it locally to execute commands
            }}
            getIFrameRef={(iframeRef) => { 
              iframeRef.style.height = 'calc(100vh - 64px)';
              iframeRef.style.outline = 'none'; 
          }}
          />
      </div>
  );
};

export default MyComponent;
