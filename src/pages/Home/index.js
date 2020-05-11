import React from 'react';
import ReactGA from 'react-ga';

import { Grid, Box, Container, Modal, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import {SearchBox} from '../../components'; 


export default function (props) {
	let [open, setOpen] = React.useState(false);
	let [fullTerm, setFullTerm] = React.useState('');

	const lookup = function(brand, code, item) {
		// let printers = await strapi.get("printers", {'brand.name_contains': brand, model_contains: code});
		props.history.push("/printer/"+item.id+"/"+item.brand.name + "-" + item.model.replace(' ', '-'));
	}

	const openModal = function(brand, code) {
		let full = brand + " " + code;
		setOpen(true);
		setFullTerm(full);

        ReactGA.event({
		  category: 'Search',
		  action: 'Not found modal',
		  label: full
		});
	}

  	return (
  		<Box p={1}>
			<Grid container justify="center" alignItems="center" direction="column">
				<Box className="logo-container">
					<img src={'/logo.png'} style={{ maxWidth: 250 }} alt="Tonersales - Logo"/>
				</Box>
				<Box className="logo-container" align='center'>
					<h1><strong>TONERSALES</strong></h1>
					<h4>Βρές τα αναλώσιμα του εκτυπωτή σου εύκολα και γρήγορα!</h4><br />
					<small>Σημείωσε τη μάρκα και το μοντέλο του εκτυπωτή σου</small>  
				</Box>
				<Box className="search-container">
					<Container maxWidth="md">
						<SearchBox onSearch={(brand, code, item) => lookup(brand, code, item)} onFail={(brand, code) => openModal(brand, code)}/>
					</Container>
				</Box>



				<Modal
				  open={open}
				  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				  onClose={() => setOpen(false)}
				  aria-labelledby="Η αναζήτηση απέτυχε"
				  aria-describedby="Δεν καταφέραμε να βρούμε τον εκτυπωτή σου"
				>
					<Card style={{ maxWidth: 600, margin: 'auto' }}>
						<CardContent>
							<Typography variant="body1" component="h2">
				        		Δεν καταφέραμε να βρούμε τον εκτυπωτή σου στη βάση δεδομένων μας!
				        		Μπορείτε να δοκιμάσετε την απλή αναζήτηση
				        	</Typography>
			        	</CardContent>
			        	<CardActions>
			        		<a href={'https://tonersales.eu/shop/search?controller=search&orderby=sales&orderway=desc&submit_search=&search_query='+fullTerm} style={{textDecoration: 'none'}}>
			        			<Button variant="contained" color="secondary">
			        				Απλή αναζήτηση
			        			</Button>
			        		</a>
			        	</CardActions>
		        	</Card>
				</Modal>
			</Grid>
		</Box>
	);
}
