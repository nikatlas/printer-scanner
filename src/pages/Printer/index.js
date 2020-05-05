import React from 'react';
import { Grid, Button, Box, Card, CardContent, CardMedia, CardActions, Typography } from '@material-ui/core';

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
	console.log(item);

	let fullname = (item.brand && item.brand.name) + " " + item.model;
	return (
	  	<Box p={2} style={{backgroundColor: 'rgb(233, 235, 238, 0.3)'}}>
	  		<Grid container direction="row" justify="space-around" align="center" style={{borderBottom:'1px solid', paddingBottom:48}}>
		  		<Grid item xs={12} md={6} justify="space-around">
		  			<Card style={{width: 332}}>
		  				<Box p={2}>
		  					<img src={item.image} alt={'Image - ' + fullname} style={{ maxWidth : 300 }}/>
		  				</Box>
		  			</Card>
		  		</Grid>
		  		<Grid item xs={12} md={6} align="left">
		  			<div>
		  				<Typography gutterBottom variant="h5">
		  					Εκτυπωτής {fullname}
						</Typography>
		  			</div>
		  			<p>{item.description}</p>
		  		</Grid>
		  	</Grid>
	  		<Grid item xs={12} align="left">
	  			<div>
	  				<Typography gutterBottom variant="h6">
						Αναλώσιμα για τον εκτυπωτή {fullname}
					</Typography>
				</div>
	  			<Box container xs={12} p={10}>
	  			{item.toners.map((toner) => 
	  				<Grid item xs={12} sm={6} md={4}>
		  				<Card>
		  					<CardMedia
		  					  style={{height: 140}}
					          image={toner.image}
					          title={toner.model}
					        />
					    	<CardContent style={{minHeight: 100}}>
					        	<Typography variant="h5" component="h2">
					        		{toner.model}
					        	</Typography>
					      	</CardContent>
					      	<CardActions>
						        <a href={toner.link} target="_new" style={{textDecoration:'none'}}>
						        	<Button variant="contained" color="primary">Αγορά</Button>
						        </a>
							</CardActions>
					    </Card>
				    </Grid>
	  			)}
	  			</Box>
	  		</Grid>
	  	</Box>
  	);
}
