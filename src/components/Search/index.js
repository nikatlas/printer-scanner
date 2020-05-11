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
    '& > * ': {
      padding: theme.spacing(2),
    },
  },
}));


export default (function(props) {
	const [term, setTerm] = React.useState('');
	const [brand, setBrand] = React.useState('');
	const [item, setItem] = React.useState(undefined);
	const [brandOptions, setBrandOptions] = React.useState([]);
	const [termOptions, setTermOptions] = React.useState([]);
	const classes = useStyles();

	const lookupBrand = async function(b) {
		let brands = await strapi.get("brands", {'name_contains': b, _limit: 7});
		setBrand(b);
		setBrandOptions(brands);
	}
	
	const lookup = async function(code) {
		let printers = await strapi.get("printers", {'brand.name_contains': brand, model_contains: code, _limit: 7});
		setTerm(code);
		setItem(undefined);
		setTermOptions(printers);
	}

	const runPost = async function() {
		if(!item) {
			if(!term) {
				props.onFail(brand, term);
			} else {
				let res = await strapi.get("printers",  {'brand.name_contains': brand, model_contains: term, _limit: 1})
				res.length ? props.onSearch(brand, term, res[0]) : props.onFail(brand, term);
			}
		} else {
			props.onSearch(brand, term, item);
		}
	}
	// console.log(brand, term, item);
	return (
		<Grid container direction="row" className = {classes.root}>
      		<Grid item
      		xs={12}
      		sm={12}
      		md={6}
      		lg={4}>
	      		<Autocomplete
				autoComplete
				autoHighlight
				freeSolo
				  id="brand-term"
				  options={brandOptions}
				  getOptionLabel={(option) => option.name}
				  style={{width: '100%'}}
				  onChange={(e, v) => v && setBrand(v.name)}
				  renderInput={(params) => <TextField {...params} label="Μάρκα Εκτυπωτή" placeholder="HP, Lexmark, Samsung..." variant="outlined" value={brand} onChange={(v) => lookupBrand(v.target.value)}/>}
				/>
      		</Grid>
			<Grid item
      		xs={12}
      		sm={12}
      		md={6}
      		lg={5}>
	      		<Autocomplete
				autoComplete
				autoHighlight
				freeSolo
				  id="search-term"
				  options={termOptions}
				  getOptionLabel={(option) => option.model}
				  style={{width: '100%'}}
				  onChange={(e, v) => v && (setTerm(v.model) || setItem(v))}
				  renderInput={(params) => <TextField {...params} label="Κωδικός Εκτυπωτή" variant="outlined" value={term} onChange={(v) => lookup(v.target.value)}/>}
				/>
      		</Grid>
      		<Grid item
      		xs={12}
      		lg={3}>
	      		<Button 
	      		size="large"
	      		style={{height:56, width:'100%'}}
		      	onClick={() => runPost()}
		        variant="contained"
		        color="primary"
		        startIcon={<SearchIcon/>}>
		      		Βρες το
	      		</Button>
      		</Grid>
		</Grid>
	);
});