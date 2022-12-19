import { Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Modal from './pages/Modal';
import Modal2 from './pages/Modal2';
import Payment from './pages/Payment';


function Router () {
    const location = useLocation();
    const background = location.state && location.state.background;
    
    return (
        <>
        <Routes location={background || location}>
        <Route path="/" element={<Home />}/>
        <Route path="/payment" element={<Payment />}>
        <Route path="/payment/delete/:id" element={<Modal />} /> 
        <Route path="/payment/update/:id" element={<Modal2 />} />  
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />     
    </Routes>
    {background && (
    <Routes>
        <Route path="/payment/delete/:id" element={<Modal />} /> 
        <Route path="/payment/update/:id" element={<Modal2 />} /> 
    </Routes>
    )}
   </>
    );
               
     
};
export default Router;