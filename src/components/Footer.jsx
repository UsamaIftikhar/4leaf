import React from 'react';
import logoPath from './../assets/images/logo.png';

const Footer = () => {
  return (
    <div>
      <div className='footer-container'>
        <div className='footer-left-container'>
          <img className='footer-image' src={logoPath} />
          <h1 className='heading'>Now, let's toss that coin and let the excitement begin!</h1>
        </div>
        <div className='footer-menu'>
          <div className='flex-display'>
            <div>
              <div className='menu-item'>Liquidity Pools</div>
              <div className='menu-item'>Yield Farming</div>
              <div className='menu-item'>DeFi</div>
              <div className='menu-item'>Team</div>
              <div className='menu-item'>View WhitePaper</div>
            </div>
            <div className='social-media-links'>
              <div className='menu-item'>Team</div>
              <div className='menu-item'>Facebook</div>
              <div className='menu-item'>LinkedIn</div>
            </div>
          </div>
          <div className='last-menu-item flex-display'>
            <div>Privacy policy</div>
            <div className='social-media-links'>User agreement</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer