import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home/Home";
import SignIn from './SignIn/SignIn';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './Dashboard/Dashboard';
import Playground from './Playground/Playground';
import Upload from './Upload/Upload';
import Company from './Company/Company';
import Profile from './Profile/Profile';

function App(){
  return(
    <GoogleOAuthProvider clientId="675550706414-4n7nop63elgh5a5bbiovb47p7v5ml0ia.apps.googleusercontent.com">
      <Router>
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
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}


export default App