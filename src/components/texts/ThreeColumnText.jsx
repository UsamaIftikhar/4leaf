import React from 'react';

const ThreeColumnText = () => {
  return (
    <div>
      <div class="container">
        <div className='section'>
          <div>
            <div class="heading">
              Embrace the Power of True Randomness
            </div>
            <div className='paragraph-text'>
              We've harnessed the incredible Chainlink VRF technology to ensure that the results of our game are as random as can be. Prepare for a mind-blowing level of unpredictability!            </div>
          </div>
        </div>
        <div class="divider" style={{ color: 'white' }}></div>
        <div className='section'>
          <div>
            <div class="heading">
              Safety and Anonymity at Its Finest
            </div>
            <div className='paragraph-text'>
              Through the use of blockchain and smart contracts, we provide you with the utmost security and anonymity for all your transactions. Feel confident and protected as you dive into the world of 4LEAF.
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div className='section'>
          <div>
            <div class="heading">
              Luck is Your Best Ally
            </div>
            <div className='paragraph-text'>
              Our robust and provably fair algorithm minimizes the impact of external factors, allowing you to fully immerse yourself in a true game of chance. It's all about luck, and it's your time to shine!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeColumnText;