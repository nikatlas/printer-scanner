import React from 'react';
import { Grid, Button, Box, Card, CardContent, CardMedia, CardActions, Typography } from '@material-ui/core';
import ReactGA from 'react-ga';

import StrapiClient from 'strapi-client';
const BASE_URL = "https://printers.tonersales.eu";
const strapi = new StrapiClient(BASE_URL);



export default function (props) {
	let id = props.match.params.id || undefined;
	let [item, setItem] = React.useState({toners: []});

	async function fetchIt() {
	    let res = await strapi.get("printers", {id});
	    setItem(res[0]);
	}
	React.useEffect(() => {
		fetchIt();
	}, [item.id]);
	// console.log(item);

	let fullname = (item.brand && item.brand.name) + " " + item.model;
	return (
	  	<Box p={2} style={{backgroundColor: '#f5f5f5'}}>
	  		<Grid container justify="space-between">
		  		<Grid item xs={12} md={4} lg={3} align="center">
			  		<Grid item xs={12}>
			  			<Box p={2}>
				  			<Card>
				  				<img src={item.image} alt={'Image - ' + fullname} style={{ maxHeight: 500, maxWidth: 250 }}/>
				  			</Card>
			  			</Box>
			  		</Grid>
			  		<Grid item xs={12} alignItems="center">
			  			{item.description && <div>
			  				<Typography variant="h5">
			  					Εκτυπωτής {fullname}
							</Typography>
			  			</div>}
			  			<p>{item.description}</p>
			  		</Grid>
			  	</Grid>
		  		<Grid item xs={12} md={8} lg={9} align="left" style={{border: 0, borderLeft:1, borderColor: '#282c34', borderStyle: 'solid'}}>
		  			<Box pt={2}>
		  				<Typography gutterBottom variant="h6" align="center">
							Αναλώσιμα για τον εκτυπωτή {fullname}
						</Typography>
					</Box>
		  			<Box xs={12} p={1}>
			  			<Grid container>
			  			{item.toners.map((toner) => 
			  				<Grid item xs={12} sm={6} md={4} lg={3} key={toner.id}>
			  				<Box m={1}>
				  				<Card>
				  					<CardMedia
				  					  style={{height: 140}}
							          image={toner.image || ''}
							          title={toner.model}
							        />
							    	<CardContent style={{minHeight: 60}}>
							        	<Typography variant="subtitle2">
							        		Toner {toner.model}
							        	</Typography>
							      	</CardContent>
							      	<CardActions>
								        <a href={toner.link} target="_new" style={{textDecoration:'none'}}>
								        	<Button variant="contained" color="primary">Αγορά</Button>
								        </a>
									</CardActions>
							    </Card>
						    </Box>
						    </Grid>
			  			)}
			  			</Grid>
		  			</Box>
		  		</Grid>
	  		</Grid>
	  	</Box>
  	);
}
