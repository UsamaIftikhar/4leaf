import React from 'react';
import Image1 from './../../assets/images/image-4.png';
import Image2 from './../../assets/images/image-5.png';

const PhotoGridText = () => {
  return (
    <div>
      <div className='margin-top'>
        <h1 className='model2-heading'>
          Embrace New Possibilities
        </h1>
      </div>
      <div className='margin-bottom'>
        <div className='flex-display grid-upper-two' style={{ color: 'white' }}>
          <div className='grid-text-box text-box text-box-color'>
            <div className='margin-50'>
              <div className='upper-text'>
                <div className='heading align-start'>Play Limitlessly</div>
                <p className='subheading text-blur'>Have a blast while growing your crypto holdings – the fun never ends!</p>
              </div>
              <div className='subheading bottom-text'>Dive into the Pool of Rewards</div>
            </div>
          </div>
          <div className='grid-image-container'>
            <div className='grid-text-box image-box'>
            </div>
            <img className='image-class' width={400} src={Image1}></img>
          </div>
        </div>
      </div>
      <div>
        <div className='flex-display grid-upper-two' style={{ color: 'white' }}>
          <div className='grid-image-container'>
            <div className='grid-text-box image-box'>
            </div>
            <img className='image-class2' width={300} src={Image2}></img>
          </div>
          <div className='grid-text-box text-box text-box-color'>
            <div className='margin-50'>
            <div className='upper-text'>
              <div className='heading align-start'>Fill up the pool</div>
              <p className='subheading text-blur'>Stake tokens in the gaming pool and earn a profit.</p>
              </div>
              <div className='subheading bottom-text'>Stake tokens</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoGridText;