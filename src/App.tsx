import { AuthProvider } from "./context/AuthContext";
import Auth from "./components/Auth";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import RequiredAuth from "./components/RequiredAuth";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Routes>
          {/* Public Route */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route element={<RequiredAuth />}>
            <Route path="/" element={<div>Home</div>} />
          </Route>
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
