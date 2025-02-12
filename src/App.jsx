import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState, useMemo, useCallback } from 'react';

import Home from "./Home/Home";
import SignIn from './SignIn/SignIn';
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
import ChatBubble from './Deploy/ChatBubble';
import Uploted from './Upload/Uploted';
import Whatshapp from './Deploy/Whatshapp';
import WhatsappOutput from './Deploy/WhatsappOutput';
import Test from './Test';
import Website from './Deploy/Website';
import PaymentSuccess from './Components/Pricing/Payment_Success';
import PaymentFailure from './Components/Pricing/Payment_failure';

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
  const noNavRoutes = useMemo(() => ['/dashboard', '/playground', '/deploy', '/upload', '/uploaded'], []);

  // Custom hook for handling WebSocket connection
  // useWebSocketData();

  return (
    <>
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
        <Route path='/chat' element={<ChatBubble />} />
        <Route path='/uploaded' element={<Uploted />} />
        <Route path='/whatsapp' element={<Whatshapp />} />
        <Route path='/woutput' element={<WhatsappOutput />} />
        <Route path='/test' element={<Test />} />
        <Route path='/web' element={<Website />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-failure' element={<PaymentFailure />} />
      </Routes>
    </>
  );
}

// // Custom hook to manage WebSocket data
// function useWebSocketData() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     localStorage.removeItem('has_active_chatbot');
//     localStorage.removeItem('filename');
//     localStorage.removeItem('companyname');

//     const ws = new WebSocket('wss://wishchat.goodwish.com.np/ws/data/');

//     ws.onopen = () => console.log('WebSocket Connected');

//     ws.onmessage = (event) => {
//       try {
//         const newData = JSON.parse(event.data);

//         // Only update if data has changed
//         setData((prevData) => {
//           if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
//             console.log('Data changed! Updating state...');
//             localStorage.setItem('has_active_chatbot', JSON.stringify(newData.has_active_chatbot));
//             localStorage.setItem('filename', newData.filename);
//             localStorage.setItem('companyname', newData.company_name);
//             return newData;
//           }
//           return prevData; // No change, keep the old state
//         });
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     };

//     ws.onerror = (error) => console.error('WebSocket Error:', error);

//     ws.onclose = () => console.log('WebSocket Disconnected');

//     return () => {
//       ws.close();
//     };
//   }, []);
// }

export default App;
