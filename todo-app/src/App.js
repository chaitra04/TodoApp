import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouteConfig from './Route/Route';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteConfig/>
      </BrowserRouter>
    </div>
  );
}

export default App;
