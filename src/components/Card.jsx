import React from 'react';

const Card = ({ image, rarityScore, subtitle, title }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col items-center text-center text-white w-full max-w-xs">
      <img src={image} alt={title} className="w-full aspect-square object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      <p className="text-yellow-400 font-bold">{rarityScore}</p>
      <button className="mt-4 bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-200">
        &gt;
      </button>
    </div>
  );
};

export default Card;