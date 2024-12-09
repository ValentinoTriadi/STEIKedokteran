import React from 'react';
import ReactMarkdown from 'react-markdown';

const LeftBubbleChat = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 text-black p-3 rounded-lg max-w-lg text-sm shadow-sm">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default LeftBubbleChat;
