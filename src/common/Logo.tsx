import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoImg from '../images/logo/logo.png';

const Logo = () => {
  return (
    <NavLink className='w-full flex justify-center' to="/">
      <img className='w-56' src={LogoImg} alt="Logo" />
    </NavLink>
  );
};

export default Logo;
