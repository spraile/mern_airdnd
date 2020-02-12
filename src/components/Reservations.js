import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"

const Reservations = ({places}) => {
	let hostPlaces = places.filter(place => place.hostId == JSON.parse(localStorage.getItem('user')).id)

 	const [reservations,setReservations] = useState([])
	useEffect(() => {
		fetch('http://localhost:8000/reservations/',{
			headers : {
				"Authorization" : localStorage.getItem('token')
			}
		})
		.then(data => data.json())
		.then(reservations => {
			setReservations(reservations)
		})
		.catch(error => console.log(error))
	},[])
	
	const handleActionButton = (decision,reservation) => {

		let stat = { status : decision}
		fetch('http://localhost:8000/reservations/'+reservation._id, {
			method : "PUT",
			headers : {
				"Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token'),
			},
			body : JSON.stringify(stat)
		})
		.then(data => data.json())
		.then(updated => console.log(updated))
		.catch(err => console.log(err))
		switch (decision) {
			case 'Accepted' :
				// console.log(reservation)
				console.log('Accepted')
				console.log('http://localhost:8000/places/'+reservation.placeId+"/reservation")
				fetch('http://localhost:8000/places/'+reservation.placeId+"/reservation", {
					method : "PUT",
					headers : {
						"Content-Type" : "application/json",
						"Authorization" : localStorage.getItem('token')
					},
					body : JSON.stringify(reservation.reservedDates)
				})
				.then(data => data.json())
				.then(kek => console.log(kek))
				break
			case 'Rejected' :
				console.log('Rejected')
				break
				
			case 'Completed' :
				console.log('Completed')
				break
			default :
				console.log("Error, no decision found")

		}
	}
	return (
		<div className="container">
			<h3>Reservations</h3>
			<hr/>
			<div className="row">
				<div className="col-12 col-md-3">
					<div className="btn-group-vertical w-100">
						<button className="btn btn-outline-info">Pending</button>
						<button className="btn btn-outline-info">Accepted</button>
						<button className="btn btn-outline-info">Rejected</button>
						<button className="btn btn-outline-info">Completed</button>
					</div>
					<div className="btn-group-vertical w-100">
						{hostPlaces.map(place => {
							return (
								<button className="btn btn-outline-info w-100">{place.name}</button>		
							)					
						})}

					</div>
				</div>
				<div className="col-12 col-md-9">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Reservation Code</th>
								<th scope="col">Place</th>
								<th scope="col">Reservation Start Date</th>
								<th scope="col">Customer</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								reservations.map(reservation => {
									return(									
										<tr>
											<th scope="row">{reservation.code}</th>
											<td>{reservation.placeId}</td>
											<td>Reservation date</td>
											<td>
												<button className="btn btn-success" onClick={() => handleActionButton("Accepted",reservation)}>Accept</button>
												<button className="btn btn-danger" onClick={() => handleActionButton("Rejected",reservation)}>Reject</button>
												<button className="btn btn-info" onClick={() => handleActionButton("Completed",reservation)}>Complete</button>

											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Reservations