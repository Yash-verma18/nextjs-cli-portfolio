import React from 'react';
import { Pixelify_Sans } from 'next/font/google';
interface UpdatePromptProps {
  onRestart: () => void;
  onLater: () => void;
}

const pixelifySans = Pixelify_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // use the weights you need
    display: 'swap',
  });

const UpdatePrompt: React.FC<UpdatePromptProps> = ({ onRestart, onLater }) => {
  // Define colors based on the new design (beige background, black text/elements)
  const modalBgColor = "bg-[#dfe4c2]"; // Beige background from JSON/Image
  const modalTextColor = "text-black";
  const borderColor = "border-black";
  const progressBarFillColor = "bg-black";
  const buttonHoverBgColor = "hover:bg-gray-400"; // A darker beige/gray for hover
  const buttonHoverTextColor = "hover:text-black";
  const closeButtonHoverBgColor = "hover:bg-gray-300"; // Slightly darker beige for X button hover

  return (
    // Overlay - using black with opacity to make the modal stand out
    <div className={`${pixelifySans.className} text-xl fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}>
      {/* Modal Box */}
      <div
        className={`${modalBgColor} ${modalTextColor} w-full max-w-sm border-2 ${borderColor}`}
        style={{ imageRendering: 'pixelated', boxShadow: '4px 4px 0px #FFB22C' }} // For the retro pixelated look and added 8-bit style shadow
      >
        {/* Title Bar */}
        <div className={`flex justify-between items-center p-1.5 border-b-2 ${borderColor}`}>
          <span className={`text-sm pl-1 ${modalTextColor}`}>Update</span>
          <button
            onClick={onLater}
            aria-label="Close"
            className={`w-6 h-5 border ${borderColor} flex items-center justify-center 
                        ${modalTextColor} ${closeButtonHoverBgColor}
                        focus:outline-none`}
          >
            <span className="text-xs">X</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-2">
          <p className={`text-sm font-bold ${modalTextColor}`}>CLI Portfolio Update Installed!</p>

          {/* Progress Bar - 5 black segments with black borders */}
          <div className="flex justify-between space-x-1">
            {Array(5).fill(0).map((_, idx) => (
              <div key={idx} className={`h-5 flex-1 ${progressBarFillColor} border ${borderColor}`}></div>
            ))}
          </div>

          <p className={`text-sm  ${modalTextColor}`}>Launch portfolio?</p>
        </div>

        {/* Action Buttons */}
        <div className={`flex justify-end space-x-3 p-2.5 border-t-2 ${borderColor}`}>
          <button
            onClick={onRestart}
            className={`${modalTextColor} border ${borderColor} px-5 py-1.5 text-sm font-semibold 
                        ${buttonHoverBgColor} ${buttonHoverTextColor}
                        focus:outline-none focus:ring-1 focus:ring-black`}
          >
            Launch
          </button>
          <button
            onClick={onLater}
            className={`${modalTextColor} border ${borderColor} px-5 py-1.5 text-sm 
                        ${buttonHoverBgColor} ${buttonHoverTextColor}
                        focus:outline-none focus:ring-1 focus:ring-black`}
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePrompt;