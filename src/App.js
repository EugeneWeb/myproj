import logo from './logo.svg';
import './App.css';

// Данная запись через function устарела, сейчас принято записывать через стрелочные функции
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const App = () => {
//   return (
//     <>
//       <h1>Работает</h1>
//     </>
//   )
// }

// Также можно записывать return без скобок(но тогда первый элемент должен быть на уровне return)
const App = () => {
  return <div>
    <h1>Это тоже Работает</h1>
  </div>
}

export default App;
