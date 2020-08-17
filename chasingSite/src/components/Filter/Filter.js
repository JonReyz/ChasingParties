import React,  { useState }  from 'react';
import {Box, TextField, IconButton, Typography, MenuItem, Button, FormLabel} from '@material-ui/core';
import styles from "./styles.module.css"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import CloseIcon from "@material-ui/icons/Close" 



async function filterEvents(data, setEvent) {
	const url = "http://localhost:8000/events/filter"
	await fetch(url, {
		method: "POST",
		headers: {
      		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(data)
	}).then(response => response.json())
	.then(data => {
  		console.log('Success:', data);
  		setEvent(data)	
	})
	.catch((error) => {
  		console.error('Error:', error);
	}); 	
}

const  Filter = ({closeModal, setEvent}) => {

	const [filters, setFilters] = useState({"category":"", "start_date": "" })
	

	const onClick = () =>{
		const data = filterEvents(filters,setEvent)		
	}

	const handleChange = (event) => {
		const target = event.target 
		const value  = target.value
		const name = target.name

		setFilters({
      		...filters,
      		[name]: value
   		});

	}	

	return (
		<Box class = {styles.container}>
		<form class={styles.form}>
			<Box class={styles.header}>
				<FormLabel>Filtros</FormLabel>
				<IconButton size="small" color="primary" onClick={closeModal}>
          			<CloseIcon/>
       			</IconButton>
			</Box>
			<TextField name="category" id="standard-basic" label="Categoria" select value={filters.category} onChange={handleChange}>
				<MenuItem value="festa">Festa</MenuItem>
				<MenuItem value="balada">Balada</MenuItem>
				<MenuItem value="cultural">Cultural</MenuItem>
				<MenuItem value="gala">Gala</MenuItem>
			</TextField>


			<TextField name="start_date" type="date" label="Data de Inicio" value={filters.start_date} onChange={handleChange}  
				InputLabelProps={{
            		shrink: true,
          		}}
			/> 

			<Button onClick = {onClick} >Buscar</Button>
		</form>
	</Box>
	)
}

export default Filter
