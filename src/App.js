import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./helpers/PrivateRoute";
import { GamePage, NotePage, GalleryPage, HomePage, LoginPage, SignupPage, ForgotPasswordPage, UpdateProfilePage } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/app.css'

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginPage />}/>
      <Route exact path="/signup" element={<SignupPage />}/>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/update-profile" element={<PrivateRoute> <UpdateProfilePage /> </PrivateRoute>} />
      <Route path="/" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
      <Route path="/gallery" element={<PrivateRoute> <GalleryPage /> </PrivateRoute>} />
      <Route path="/hangman" element={<PrivateRoute> <GamePage /> </PrivateRoute>} />
      <Route path="/notes" element={<PrivateRoute> <NotePage /> </PrivateRoute>} />


      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
