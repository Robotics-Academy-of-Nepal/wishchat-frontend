import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from "./Home/Home";
import SignIn from './SignIn/SignIn';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './Dashboard/Dashboard';
import Playground from './Playground/Playground';
import Upload from './Upload/Upload';
import Company from './Company/Company';
import Profile from './Profile/Profile';
import MainNav from './Components/MainNavbar/MainNav';
import Deploy from './Deploy/Deploy';
import Tutorials from './Components/Tutorials/Tutorials';
import Features from './Components/Features/Features';
import Pricing from './Components/Pricing/Pricing';

function App() {
  return (
    <GoogleOAuthProvider clientId="675550706414-4n7nop63elgh5a5bbiovb47p7v5ml0ia.apps.googleusercontent.com">
      <Router>
        <MainLayout />
      </Router>
    </GoogleOAuthProvider>
  );
}

function MainLayout() {
  const location = useLocation();

  // Define routes where MainNav should not appear
  const noNavRoutes = ['/dashboard', '/playground', '/deploy', '/upload'];

  return (
    <>
      {/* Conditionally render MainNav based on location */}
      {!noNavRoutes.includes(location.pathname) && <MainNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/get-started" element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/playground' element={<Playground />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/company' element={<Company />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/deploy' element={<Deploy />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/features' element={<Features />} />
        <Route path='/pricing' element={<Pricing />} />

      </Routes>
    </>
  );
}

export default App;
