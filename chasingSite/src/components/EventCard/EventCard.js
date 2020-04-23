import React from 'react';
import {Button, Card, CardMedia, CardContent,CardActions, IconButton } from '@material-ui/core';
import styles from "./styles.module.css"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"


const  EventCard = () => (
    <Card class={styles.container}>
    	
    	<CardMedia class = {styles.image} image ="data:image/jpeg;base64,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"/>
    	<CardContent class = {styles.content} ></CardContent>
    	<CardActions class = {styles.actions}>
    		<IconButton size="small" color="primary">
          		<DeleteIcon/>
          		Delete
        	</IconButton>
        	<IconButton size="small" color="primary">
          		<EditIcon/>
          		Edit
        	</IconButton>
    	</CardActions>
    </Card>
)

export default EventCard
