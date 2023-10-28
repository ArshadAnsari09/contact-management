import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ContactList from "./component/ContactList";
// import Typography from "@mui/material/Typography";
// import { Stack } from "react-bootstrap";

function App() {
  return (
    <div className="text-center">
      <h1 className="mt-3">Contact Management App</h1>
      <div className="mt-5 w-75 mx-auto">
        <ContactList />
      </div>
    </div>
  );
}

export default App;
