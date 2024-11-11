import React from 'react'

const RightBubbleChat = ({ 
  message 
}: {
  message: string
}) => {
  return (
    <div className="flex justify-end">
      <div className="bg-[#00eebc] text-white p-3 rounded-lg max-w-lg text-sm shadow-sm">
        {message}
      </div>
    </div>
  )
}

export default RightBubbleChat