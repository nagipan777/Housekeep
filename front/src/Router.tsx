import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './pages/Header';
import Payment from './pages/Payment';
import Footer from './pages/Footer';



export const Router = () => {
    //const location = useLocation();
    //const backgroundLocation = location.state.backgroundLocation;


    return (
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<LandingPage />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/payment" element={<Payment />} />
                    {/*<Route path="/payment/:id" element={<Modal2 />} />*/}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            <Footer />
            </BrowserRouter>
    );
};
export default Router;