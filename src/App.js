// import logo from './logo.svg';
import './App.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponents from './components/MyComponents';
import React from 'react';
// import { render } from '@testing-library/react';

class App extends React.Component {

  render() {
    return (
      <div>
        hellow world
        <MyComponents></MyComponents>
      </div>
    );
  }
}
// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           quangquang
//           {/* Edit <code>src/App.js</code> and save to reload. */}
//         </p>
//         <div>Count = {count}</div>
//         <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//         <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//       </header>
//     </div>
//   );
// }
export default App;
