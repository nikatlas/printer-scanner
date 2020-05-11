import React from 'react';
import ReactGA from 'react-ga';
import {
  Route,
  useHistory
} from "react-router-dom";
import { Grid, Container, Card } from '@material-ui/core';
import Pages from './pages';
import './App.css';

// init
ReactGA.initialize('UA-165669873-1', {
//  debug: true
});
// get cuserID from tonersales
let uid = new URLSearchParams(window.location.search).get("cuserID");
if(uid) {
  ReactGA.set({ userId:  uid });
}
ReactGA.pageview(window.location.pathname);

function App() {
  const history = useHistory();
  React.useEffect(() => {
      return history.listen((location) => {
          ReactGA.pageview(location.pathname);
      })
  },[history])

  return (
  	<div className="main-container">
  		<Container style={{margin: 'auto'}} disableGutters={true}>
        <Grid item>
  	    	<Card>
				    <Route path="/" exact component={Pages.Home}/>
		      	<Route path="/printer/:id/:name" exact component={Pages.Printer}/>
		      	<Route path="/toner/:id/:name" exact component={Pages.Toner}/>
			    </Card>
		    </Grid>
      </Container>
    </div>
  );
}

export default App;
