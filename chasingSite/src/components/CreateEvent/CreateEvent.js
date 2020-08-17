import React,  { useState }  from 'react';
import {Box, TextField, IconButton, Typography, MenuItem, Button, FormLabel} from '@material-ui/core';
import styles from "./styles.module.css"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import CloseIcon from "@material-ui/icons/Close" 



async function saveDatabase(data,type) {
	const url = "http://localhost:8000/events"
	await fetch(url, {
		method: type,
		headers: {
      		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(data)
	}).then(response => response.json())
	.then(data => {
  		console.log('Success:', data);	
	})
	.catch((error) => {
  		console.error('Error:', error);
	}); 	
}

const  CreateEvent = ({type, data, callback}) => {

	type == "POST"? (data = {
		"name": "aaaaaa",
		"start_date": "",
		"category": "balada",
		"description": "aaaa",
		"image_url": "aaa"
	}): data = data

	
	let title = ""
	let buttonText = ""


	const [info, setInfo] = useState(data)
	

	const onClick = () =>{
		console.log(type)
		saveDatabase(info,type)
		callback()
	}

	const handleChange = (event) => {
		const target = event.target 
		const value  = target.value
		const name = target.name

		setInfo({
      		...info,
      		[name]: value
   		});

	}	

	return (
		<Box class = {styles.container}>
		<form class={styles.form}>
			<Box class={styles.header}>
				<FormLabel>{type==="POST"?"Criar um novo evento":"Deixar o evento alterado"}</FormLabel>
				<IconButton size="small" color="primary" onClick = {callback}>
          			<CloseIcon/>
       			</IconButton>
			</Box>
			<TextField name="name" id="standard-basic" label="Nome do Evento" value={info.name} onChange={handleChange}/> 
			<TextField name="category" id="standard-basic" label="Categoria" select value={info.category} onChange={handleChange}>
				<MenuItem value="festa">Festa</MenuItem>
				<MenuItem value="balada">Balada</MenuItem>
				<MenuItem value="cultural">Cultural</MenuItem>
				<MenuItem value="gala">Gala</MenuItem>
			</TextField>
			<TextField name="start_date" type="date" label="Data de Inicio" value={info.date} onChange={handleChange} 
				InputLabelProps={{
            		shrink: true,
          		}}
			/> 
			<TextField name="description" id="standard-basic" label="Descricao" multiline value={info.description} onChange={handleChange}/> 
			<TextField name= "image_url" id="standard-basic" label="ImageUrl" value={info.image} onChange={handleChange}/>
			<Button onClick = {onClick} >{type==="POST"?"Criar":"Alterar"}</Button>
		</form>
	</Box>
	)
}

export default CreateEvent
