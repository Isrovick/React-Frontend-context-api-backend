import './App.css';
import { Subapp } from './components/Ssubapp.jsx'
import { MainProvider } from './mainContext.jsx'

function App() {
  return (
    <MainProvider>
         <Subapp></Subapp>
    </MainProvider> 
  );
}

export default App;
