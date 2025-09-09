import App from './App';
import {
    Routes
    , Route
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import User from './components/Users/User';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/content/DashBoard';
import ManagerUser from './components/Admin/content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer} from 'react-toastify';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />

                </Route>
                <Route path="admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManagerUser />} />
                </Route>

                <Route path='login' element={<Login />}></Route>
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Layout;