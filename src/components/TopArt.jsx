import React from 'react';

const Artworks = () => {
  return (
    <section className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Top Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-center">
          <img src="/img/SimboloNegativo@72x-8.png" alt="Virtual Art 1" className="rounded-lg mx-auto" />
          <p>03:18:24</p>
          <p className="text-sm text-gray-400">Virtual Art</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">♥ 92</button>
        </div>
        <div className="text-center">
          <img src="/img/SimboloOriginal@72x-8.png" alt="Virtual Art 2" className="rounded-lg mx-auto" />
          <p>03:18:24</p>
          <p className="text-sm text-gray-400">Virtual Art</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">♥ 92</button>
        </div>
        <div className="text-center">
          <img src="/img/SimboloPositivo@72x-8.png" alt="Virtual Art 3" className="rounded-lg mx-auto" />
          <p>03:18:24</p>
          <p className="text-sm text-gray-400">Virtual Art</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">♥ 95</button>
        </div>
      </div>
    </section>
  );
};

export default Artworks;