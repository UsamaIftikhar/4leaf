import './App.css';
import Model1 from './components/Model1';
import Model2 from './components/Model2';

function App() {
  return (
    <div className="App">
      <div style={{ height: '50vh' , backgroundColor: 'black'}} />
      <Model1 />
      <div style={{ height: '55vh' , backgroundColor: 'black'}} />
      <Model2 />
      <div style={{ height: '50vh' , backgroundColor: 'black'}} />
    </div>
  );
}

export default App;

