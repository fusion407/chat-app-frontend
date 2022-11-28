import logo from './logo.svg';
import NavBar from './components/NavBar'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Home />
    </div>
  );
}

export default App;
