import React from 'react';

const ArtCollectables = () => {
  return (
    <section className="max-w-4xl mx-auto py-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Virtual Art Collectables</h2>
          <p className="text-sm text-gray-400">Next Releases in</p>
          <div className="flex space-x-2">
            <span>07</span>
            <span>13</span>
            <span>56</span>
          </div>
        </div>
        <div>
          <p className="text-sm">Owner</p>
          <img src="/img/SimboloNegativo@72x-8.png" alt="Owner" className="rounded-full mx-auto" />
          <p className="text-sm">@nshar</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">View All Upcoming</button>
        </div>
      </div>
      <img src="/img/SimboloNegativo@72x-8.png" alt="Virtual Art" className="mt-4 w-full rounded-lg" />
    </section>
  );
};

export default ArtCollectables;