import React, { useState, useEffect }  from 'react';
import {Button, Box, Modal, Card, CardMedia, CardContent,CardActions, IconButton, Typography } from '@material-ui/core';
import styles from "./styles.module.css"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import EventCard from "../EventCard"
import CreateEvent from "../CreateEvent"
import Filter from "../Filter"



const data1 = {
	"id":2,
	"name": "vou dar update",
	"start_date": "2001-01-12",
	"category": "festa",
	"description": "asdasdasd",
	"image_url": "aasdas"
}


const  Container = () => {
	const [events, setEvents] = useState(null)
	const [open1, setOpen1] = useState({"open":false, "type":"POST", "data":{}})
	const [open2, setOpen2] = useState(false)
	const [changed, setChange] = useState(false)


	const handleDataChange = (newEvent) => {
		setEvents(newEvent)
	}


	const handleChangeOnDatabase = () =>{
		setChange(!changed)
		console.log("Entrei no delete")
	}

	const alterModalHandle = (data) =>{
		setOpen1({"open":true, type:"PUT", "data":data})
		console.log(data)
	}
	const openModalHandle1 = () =>{
		setOpen1({"open":true, type:"POST", "data":{}})
	}

	const closeModalHandle1 = () =>{
		setOpen1(false)
	}


	const openModalHandle2 = () =>{
		setOpen2(true)
	}

	const closeModalHandle2 = () =>{
		setOpen2(false)
	}

	async function fetchFromDatabase() {
		const url = "http://localhost:8000/events"
			fetch(url, {	
				method: 'GET',
				headers: {
      				'Content-Type': 'application/json'
    			},
			})
			.then(response =>  response.json()
			)
			.then(data => {
			  	setEvents(data)
			  	console.log('Success:', events)
			  	console.log(events)	
			})
			.catch((error) => {
			  	console.error('Error:', error)
			});	
	}


	useEffect(() => {
		const fetchData = async () => {
			const url = "http://localhost:8000/events"
				fetch(url, {	
					method: 'GET',
					headers: {
	      				'Content-Type': 'application/json'
	    			},
				})
				.then(response =>  response.json()
				)
				.then(data => {
				  	console.log('Success:', data)
				  	setEvents(data)	
				})
				.catch((error) => {
				  	console.error('Error:', error)
				});
		}
		fetchData()
		console.log("Rodando o effect")
  	 }, [open1,changed]);

	return (
		<Box>
			<Button onClick={openModalHandle1}>Novo Evento</Button>
			<Button onClick={openModalHandle2}>Filtrar</Button>
			<Modal open={open1.open}>
				<CreateEvent type={open1.type} callback={closeModalHandle1} data={open1.data}/>
			</Modal>

			<Modal open={open2}>
				<Filter  closeModal={closeModalHandle2} setEvent={handleDataChange}/>
			</Modal>


			<Box class={styles.gallery}>
		 	 {events == null? null:events.map(record=> <EventCard record={record} onChangeCallback={handleChangeOnDatabase} onEditCallback={alterModalHandle}/>)}
			</Box>
		</Box>
	)

}

export default Container
	