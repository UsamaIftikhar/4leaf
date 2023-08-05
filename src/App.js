import './App.css';
import Model1 from './components/models/Model1';
import Model2 from './components/models/Model2';
import Model3 from './components/models/Model3';
import Model4 from './components/models/Model4';
import Model5 from './components/models/Model5';
import Model2Mobile from './components/mobileModles/Model2Mobile';
import Model3Mobile from './components/mobileModles/Model3Mobile';
import Model4Mobile from './components/mobileModles/Model4Mobile';
import TypewriterText from './components/texts/TypewriterText';
import AfterModelText from './components/texts/AfterModelText';
import Model2Text from './components/texts/Model2Text';
import Model3Text from './components/texts/Model3Text';
import Model4Text from './components/texts/Model4Text';
import Model5Text from './components/texts/Model5Text';
import './styles/componentsStyles.css';
import React, { useState } from 'react';

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
            <div>
              <Model2Text />
              <Model2Mobile />
            </div>
            <div>
              <Model3Text />
              <Model3Mobile />
            </div>
            <div>
              <Model4Text />
              <Model4Mobile />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Model2 />
            </div>
            <div>
              <Model3 />
            </div>
            <div>
              <Model4 />
            </div>
          </div>
        )
      }
      <div>
        <Model5Text />
      </div>
      <div>
        <Model5 />
      </div>
      <div style={{ height: '50vh' }} />
    </div>
  );
}

export default App;

