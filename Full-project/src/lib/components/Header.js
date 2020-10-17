import React from 'react';

import LinkComponent from './Link_component';
const Header = () => {
  return (
    <div id="nav">
      <LinkComponent text="home" />
      <LinkComponent text="contact" />
      <LinkComponent text="play" />
      <LinkComponent text="whatever" />
      <LinkComponent text="contact" />
    </div>
  );
};
export default Header;
