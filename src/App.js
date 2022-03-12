import './scss/app.scss';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import RouteContainer from './components/RouteContainer';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RouteContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
