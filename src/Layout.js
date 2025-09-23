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
import { ToastContainer } from 'react-toastify';
import Register from './components/Auth/Register';
import ListQuiz from './components/Users/ListQuiz';
import DetailQuiz from './components/Users/DetailQuiz';
import ManageQuiz from './components/Admin/content/Quiz/ManageQuiz';
import Questions from './components/Admin/content/Question/Questions';

const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>
            not found data...
        </div>
    )
}

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                    <Route path="/quiz/:id" element={<DetailQuiz />} />
                </Route>


                <Route path="admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManagerUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path='login' element={<Login />}></Route>
                <Route path='register' element={<Register />}></Route>
                <Route path='*' element={<NotFound />}></Route>
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