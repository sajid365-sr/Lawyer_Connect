'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import VideoCallInterface from '@/components/VideoCallInterface';
import { VideoCall, User } from '@/types';

const VideoCallPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const [isLoading, setIsLoading] = useState(true);
  const [videoCall, setVideoCall] = useState<VideoCall | null>(null);

  // Mock current user and other participant
  const currentUser: User = {
    id: 'user1',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'client',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&size=200&background=4F46E5&color=ffffff'
  };

  const otherParticipant: User = {
    id: 'lawyer1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    type: 'lawyer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
  };

  useEffect(() => {
    // Simulate loading and initializing video call
    const timer = setTimeout(() => {
      const mockVideoCall: VideoCall = {
        id: `call_${roomId}`,
        bookingId: 'booking_123',
        roomId: roomId,
        status: 'waiting',
        participants: {
          clientId: currentUser.id,
          lawyerId: otherParticipant.id,
          clientJoined: true,
          lawyerJoined: false
        },
        startTime: new Date().toISOString()
      };

      setVideoCall(mockVideoCall);
      setIsLoading(false);

      // Simulate other participant joining after 3 seconds
      setTimeout(() => {
        setVideoCall(prev => prev ? {
          ...prev,
          status: 'active',
          participants: {
            ...prev.participants,
            lawyerJoined: true
          }
        } : null);
      }, 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [roomId]);

  const handleEndCall = () => {
    if (videoCall) {
      setVideoCall({
        ...videoCall,
        status: 'ended',
        endTime: new Date().toISOString(),
        duration: Math.floor((new Date().getTime() - new Date(videoCall.startTime!).getTime()) / 1000)
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard/client');
      }, 2000);
    }
  };

  const handleToggleVideo = () => {
    console.log('Toggle video');
  };

  const handleToggleMute = () => {
    console.log('Toggle mute');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Joining Call...</h2>
          <p className="text-gray-300">Please wait while we connect you to the meeting room</p>
        </div>
      </div>
    );
  }

  if (!videoCall) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-2">Call Not Found</h2>
          <p className="text-gray-300 mb-4">The meeting room you're looking for doesn't exist or has ended.</p>
          <button
            onClick={() => router.push('/dashboard/client')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (videoCall.status === 'ended') {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Call Ended</h2>
          <p className="text-gray-300 mb-4">
            Your consultation with {otherParticipant.name} has ended.
            {videoCall.duration && ` Duration: ${Math.floor(videoCall.duration / 60)}:${(videoCall.duration % 60).toString().padStart(2, '0')}`}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard/client')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push(`/lawyer/${otherParticipant.id}`)}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Leave a Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VideoCallInterface
      videoCall={videoCall}
      currentUser={currentUser}
      otherParticipant={otherParticipant}
      onEndCall={handleEndCall}
      onToggleVideo={handleToggleVideo}
      onToggleMute={handleToggleMute}
    />
  );
};

export default VideoCallPage;