import './index.scss';
import FirstPage from './components/FirstPage'
import Navbar from './components/Navbar'
import SearchBabysitter from './components/searchbabysitter/SearchBabysitter'

import BabysitterProfile from './components/babysitterprofile/BabysitterProfile'
import UserCabinet from './components/usercabinet/UserCabinet'

import Favourites from './components/Favourites';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Switch,Route }  from "react-router-dom";
import SitterCabinet from './components/babysittercabinet/SitterCabinet';

const theme = createTheme({
    palette: {
      primary: {
        main: '#f37647',
        contrastText: "#f7f1e5;"
      },
      secondary: {
        main: '#8dc8ae',
        contrastText: "#f7f1e5;"
      },
      accent: {
        main: '#A9A9A9',
        contrastText: "#f7f1e5;"
      },
    
    },
    typography: {
      fontFamily: [
        'Baloo Tamma 2'
      ].join(','),
    }
  
});

function App() {
  return (
    <Router>
    <div className="App">
      
      <ThemeProvider theme={theme}>
      {/* <Navbar /> */}
        <Switch>
          <Route exact path="/">
            <FirstPage />
          </Route>
          <Route path="/searchBabysitters">
            <SearchBabysitter/>

          </Route>
          <Route path="/babysitter-profile/:id">
            <BabysitterProfile/>
          </Route>

          <Route path="/user-cabinet">
            <UserCabinet/>
          </Route>
          <Route path="/babysitterCabinet">
            <SitterCabinet/>
          </Route>
       
          <Route path="/favourites">
            <Favourites/>
          </Route>     

        </Switch>
          
      </ThemeProvider>
    </div>
    </Router>
  );
}

export default App;
