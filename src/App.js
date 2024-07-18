import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./Components/Routing";
import { AuthProvider } from "./Components/Utils/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLECLINETID } from "./Components/Commanconstans/Comman";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLECLINETID}>
        <AuthProvider>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
