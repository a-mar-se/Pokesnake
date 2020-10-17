import React from 'react';
import Link_component from '../lib/components/Link_component.js';

const Home = () => {
  return (
    <main className="page home">
      <Link_component text="play" />
      <div className="pokeball">POKESNAKE</div>
      {/* <button>Play</button> */}
    </main>
  );
};

export default Home;
