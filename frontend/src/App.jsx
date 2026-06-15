import {

  Routes,
  Route

} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import History from "./History";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/history"
        element={<History />}
      />

    </Routes>

  );

}

export default App;