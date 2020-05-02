import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { Grid, Container, Card, Box } from '@material-ui/core';

import Pages from './pages';

import { SearchBox } from './components';

import './App.css';


// console.log("ALL", All);


function App() {
  return (
    <Router>
    	<div className="main-container">
    		<Container>
		    	<Card>
					<Route path="/" exact component={Pages.Home}/>
			      	<Route path="/printer/:id/:name" exact component={Pages.Printer}/>
			      	<Route path="/toner/:id/:name" exact component={Pages.Toner}/>
			    </Card>
		    </Container>
	    </div>
    </Router>
  );
}

export default App;
