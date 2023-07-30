import './App.css';
import Model1 from './components/models/Model1';
import Model2 from './components/models/Model2';
import Model2Mobile from './components/mobileModles/Model2Mobile';
import TypewriterText from './components/texts/TypewriterText';
import AfterModelText from './components/texts/AfterModelText';
import Model2Text from './components/texts/Model2Text'
import './styles/componentsStyles.css'
import React, { useState } from 'react'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  return (
    <div className="App">
      <div className='heading-container'>
        <TypewriterText />
      </div>
      <Model1 />
      <div>
        <AfterModelText />
      </div>
      {
        isMobile ? (
          <div>
            <Model2Text />
            <Model2Mobile />
          </div>
        ) : (
          <div>
            <Model2 />
          </div>
        )
      }

      <div style={{ height: '50vh' }} />
    </div>
  );
}

export default App;

