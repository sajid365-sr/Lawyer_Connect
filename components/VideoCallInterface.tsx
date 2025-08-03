'use client';

import React, { useState, useEffect } from 'react';
import { VideoCall, User } from '@/types';
import { 
  VideoCameraIcon, 
  MicrophoneIcon, 
  PhoneXMarkIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';

interface VideoCallInterfaceProps {
  videoCall: VideoCall;
  currentUser: User;
  otherParticipant: User;
  onEndCall: () => void;
  onToggleVideo: () => void;
  onToggleMute: () => void;
}

const VideoCallInterface: React.FC<VideoCallInterfaceProps> = ({
  videoCall,
  currentUser,
  otherParticipant,
  onEndCall,
  onToggleVideo,
  onToggleMute
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'poor' | 'disconnected'>('connecting');

  // Mock call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Simulate connection status changes
    setTimeout(() => setConnectionStatus('connected'), 2000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    onToggleVideo();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    onToggleMute();
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'poor': return 'text-orange-500';
      case 'disconnected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-lg font-semibold">{otherParticipant.name}</h2>
            <p className="text-sm text-gray-300">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getConnectionStatusColor()}`}></span>
              {connectionStatus === 'connecting' ? 'Connecting...' : 
               connectionStatus === 'connected' ? 'Connected' :
               connectionStatus === 'poor' ? 'Poor Connection' : 'Disconnected'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-mono">{formatDuration(callDuration)}</span>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-gray-900">
        {/* Main Video (Other Participant) */}
        <div className="w-full h-full relative">
          {connectionStatus === 'connected' ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center">
                <img
                  src={otherParticipant.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherParticipant.name)}&size=200&background=4F46E5&color=ffffff`}
                  alt={otherParticipant.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <p className="text-white text-xl font-medium">{otherParticipant.name}</p>
                <p className="text-gray-300">Video call in progress</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Connecting to {otherParticipant.name}...</p>
              </div>
            </div>
          )}

          {/* Self Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-green-800 to-blue-800 flex items-center justify-center">
                <img
                  src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&size=100&background=059669&color=ffffff`}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <VideoCameraIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className="absolute right-4 top-20 bottom-20 w-80 bg-white rounded-lg shadow-xl flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Chat</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900">{otherParticipant.name}</p>
                    <p className="text-sm text-gray-600">Hello! Can you hear me clearly?</p>
                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3 ml-8">
                    <p className="text-sm font-medium text-gray-900">You</p>
                    <p className="text-sm text-gray-600">Yes, audio and video are working perfectly!</p>
                    <p className="text-xs text-gray-400 mt-1">1 minute ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex justify-center items-center space-x-6">
          {/* Mute Button */}
          <button
            onClick={handleToggleMute}
            className={`p-4 rounded-full transition-colors ${
              isMuted 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <MicrophoneIcon className={`w-6 h-6 text-white ${isMuted ? 'opacity-50' : ''}`} />
          </button>

          {/* Video Button */}
          <button
            onClick={handleToggleVideo}
            className={`p-4 rounded-full transition-colors ${
              !isVideoOn 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <VideoCameraIcon className={`w-6 h-6 text-white ${!isVideoOn ? 'opacity-50' : ''}`} />
          </button>

          {/* End Call Button */}
          <button
            onClick={onEndCall}
            className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
          >
            <PhoneXMarkIcon className="w-6 h-6 text-white" />
          </button>

          {/* Speaker Button */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-4 rounded-full transition-colors ${
              !isSpeakerOn 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isSpeakerOn ? (
              <SpeakerWaveIcon className="w-6 h-6 text-white" />
            ) : (
              <SpeakerXMarkIcon className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Chat Button */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-4 rounded-full transition-colors ${
              showChat 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Call Info */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>Call ID: {videoCall.roomId}</p>
          <p>Quality: HD • Encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCallInterface;