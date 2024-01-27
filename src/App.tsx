import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import RegisterPage from "./pages/RegisterPage";

axios.defaults.baseURL = "http://localhost:4000";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
