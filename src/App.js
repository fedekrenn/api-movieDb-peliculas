import Loguin from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Listado from "./components/Listado/Listado";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Loguin />}/>
        <Route path="/listado" element={<Listado />}/>
      </Routes>
  );
}

export default App;
