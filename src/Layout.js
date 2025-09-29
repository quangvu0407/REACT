import App from './App';
import {
    Routes
    , Route
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/content/DashBoard';
import ManagerUser from './components/Admin/content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import Register from './components/Auth/Register';
import ListQuiz from './components/Users/Quiz/ListQuiz';
import DetailQuiz from './components/Users/Quiz/DetailQuiz';
import ManageQuiz from './components/Admin/content/Quiz/ManageQuiz';
import Questions from './components/Admin/content/Question/Questions';
import { Suspense } from 'react';
import PrivateRouter from './routers/PrivateRouter';
import Profile from './components/Users/profile/ProfileUser';

const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>
            not found data...
        </div>
    )
}

const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRouter><ListQuiz /></PrivateRouter>
                    } />
                    <Route path="/quiz/:id" element={
                        <DetailQuiz />
                    } />
                    <Route path="profile" element={
                        <Profile/>
                    }
                    />
                </Route>


                <Route path="admins" element={<PrivateRouter><Admin /></PrivateRouter>} >
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
        </Suspense>
    )
}

export default Layout;