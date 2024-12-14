import './App.css'
import Box from '@mui/material/Box';
import HomePage from './components/HomePage';
import root from "./redux/reducers"; 
import {legacy_createStore as createStore} from 'redux'
import {Provider} from 'react-redux';

const store = createStore(root);

function App() {
  return (
    <Provider store={store}>
      <Box>
        <HomePage />
      </Box>
    </Provider>

    )
    
}

export default App;
