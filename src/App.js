// import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {
  const location = useLocation();
  const isDetailQuiz = location.pathname.startsWith("/quiz/");
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>

      <div className='main-container'>
        <div className='sidenav-container'>

        </div>

        <div className='app-content'>
          {isDetailQuiz ? (
            <Outlet />
          ) : (
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>
          )}
        </div>
      </div>
    </div >
  );
}
export default App;
