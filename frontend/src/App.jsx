import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup page/Signup';
import Home from './pages/Home Page/Home';
import Login from './pages/Login Page/Login';
import LandingPage from './pages/Landing Page/Landing';
import { AuthContext } from './Contexts/AuthContext/AuthContext';
import { ClipLoader } from 'react-spinners';
import Profile from './pages/Profile Page/Profile';

function App() {
  const { authenticate, loading } = useContext(AuthContext);

  return loading ? (
    <div className="spinner-container bg-gray-800 flex h-screen items-center justify-center">
      <ClipLoader color="#3498db" size={50} />
    </div>
  ) : (
    <div className="bg-gray-950">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authenticate ? <Home /> : <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={authenticate ? <Profile /> : <LandingPage />} />
          {/* <Route path="/profile" element={ <Profile /> } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;