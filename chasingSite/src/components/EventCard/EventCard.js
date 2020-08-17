import React from 'react';
import {Button, Card, CardMedia, CardContent,CardActions, IconButton, Typography } from '@material-ui/core';
import styles from "./styles.module.css"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"






async function database(data, type) {
	const url = "http://localhost:8000/events"
	fetch(url, {
		method: type,
		headers: {
      		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
  		console.log('Success:', data);	
	})
	.catch((error) => {
  		console.error('Error:', error);
	}); 	
}


const  EventCard = ({record, onChangeCallback, onEditCallback}) => {
 
 const deleteHandle = () => {
 	const data = {
 		id:record.id
 	}
 	
 	const type = "DELETE"
 	database(data,type)
 	onChangeCallback()
 }  


 const editHandle = () => {
  onEditCallback(record)
 }

return (
    <Card class={styles.card}>
    	
    	<CardMedia class = {styles.image} image = {record.image_url}/>
       <CardContent>
        <Typography>{record.name}</Typography>
        <Typography>{record.start_date}</Typography>
        <Typography>{record.category}</Typography>
        <Typography>{record.description}</Typography>
      </CardContent>
    	<CardActions class = {styles.actions}>
    		<IconButton size="small" color="primary" onClick={deleteHandle}>
          		<DeleteIcon /> 
          		Delete
        </IconButton>
        <IconButton size="small" color="primary" onClick = {editHandle}>
          		<EditIcon/>
          		Edit
        </IconButton>
    	</CardActions>
    </Card>
 )

}

export default EventCard
