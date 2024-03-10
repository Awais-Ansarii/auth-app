import React from 'react'

const OAuth = () => {
    const handleGoogleClick = (){
        
    }
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}

export default OAuth
