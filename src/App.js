import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Route/Home';
import Error from './components/Route/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/reactkopeetearia/' element={<Home/>}/>
        <Route path='/reactkopeetearia/*' element={<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;
