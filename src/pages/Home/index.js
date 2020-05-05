import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box} from '@material-ui/core';
import {SearchBox} from '../../components'; 

import StrapiClient from 'strapi-client';
const BASE_URL = "https://printers.tonersales.eu";
const strapi = new StrapiClient(BASE_URL);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& img': {
//       margin: theme.spacing(5),
//     },
//   },
// }));



export default function (props) {
	const lookup = async function(brand, code, item) {
		// let printers = await strapi.get("printers", {'brand.name_contains': brand, model_contains: code});
		// console.log(brand, code, item);
		props.history.push("/printer/"+item.id+"/"+item.brand.name + "-" + item.model.replace(' ', '-'));
	}

  	return (
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
				<SearchBox onSearch={(brand, code, item) => lookup(brand, code, item)}/>
			</Box>
		</Grid>
	);
}
