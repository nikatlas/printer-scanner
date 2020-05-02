import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';

import StrapiClient from 'strapi-client';
const BASE_URL = "https://printers.tonersales.eu";
const strapi = new StrapiClient(BASE_URL);


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));


export default (function(props) {
	const [term, setTerm] = React.useState('');
	const [brand, setBrand] = React.useState('');
	const [brandOptions, setBrandOptions] = React.useState([]);
	const [termOptions, setTermOptions] = React.useState([]);
	const classes = useStyles();

	const lookupBrand = async function(b) {
		let brands = await strapi.get("brands", {'name_contains': b});
		setBrand(b);
		setBrandOptions(brands);
	}
	
	const lookup = async function(code) {
		let printers = await strapi.get("printers", {'brand.name_contains': brand, model_contains: code});
		setTerm(code);
		setTermOptions(printers);
	}
	console.log(brand, term);
	return (
		<Grid container direction="row" className = {classes.root}>
      		<Autocomplete
			  id="brand-term"
			  options={brandOptions}
			  getOptionLabel={(option) => option.name}
			  style={{ width: 300 }}
			  onChange={(e, v) => v && setBrand(v.name) && v}
			  renderInput={(params) => <TextField {...params} label="Μάρκα Εκτυπωτή" placeholder="HP, Lexmark, Samsung..." variant="outlined" value={brand} onChange={(v) => lookupBrand(v.target.value)}/>}
			/>
			<Autocomplete
			  id="search-term"
			  options={termOptions}
			  getOptionLabel={(option) => option.model}
			  style={{ width: 400 }}
			  onChange={(e, v) => v && setTerm(v.model) && v}
			  renderInput={(params) => <TextField {...params} label="Κωδικός Εκτυπωτή" variant="outlined" value={term} onChange={(v) => lookup(v.target.value)}/>}
			/>
      		<Button 
      	onClick={() => props.onSearch(brand,term)}
        variant="contained"
        color="primary"
        startIcon={<SearchIcon/>}>
      			Βρες το
      		</Button>
		</Grid>
	);
});