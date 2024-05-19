import { useState } from "react";

import "./App.css";
import AllEmployees from "./employee/allEmployees";
import AddEmployeeForm from "./employee/AddEmployeeForm";
import ButtonAppBar from "./navBar";

function App() {
  const [addEmployee, setAddEmployee] = useState(false);

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <AllEmployees></AllEmployees>
    </>
  );
}

export default App;
