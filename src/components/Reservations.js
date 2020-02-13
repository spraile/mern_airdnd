import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"

const Reservations = ({places,reservations,handlePlacesStatus, handleReservationsStatus}) => {
	
	const [hostPlaces, setHostPlaces] = useState([])
	useEffect(() => {
		let hostoPlaces = places.filter(place => place.hostId == JSON.parse(localStorage.getItem('user')).id)
		setHostPlaces(hostoPlaces)
	},[])
	
 	
	
	const handleActionButton = (decision,reservation) => {
		let stripe = {
			userId : reservation.userId,
			price : reservation.price
		}

		// fetch('http://localhost:8000/reservations/stripe',{
		// 	method : "POST",
		// 	headers : {
		// 		"Content-Type" : "application/json",
		// 		"Authorization" : localStorage.getItem('token'),
		// 	},
		// 	body : JSON.stringify(stripe)
		// })
		// .then(data => data.json())
		// .then(result => {
		// 	let receiptUrl = result.receipt_url
		// 	let stat = { status : decision, url : receiptUrl }
		// 	fetch('http://localhost:8000/reservations/'+reservation._id, {
		// 	method : "PUT",
		// 	headers : {
		// 		"Content-Type" : "application/json",
		// 		"Authorization" : localStorage.getItem('token'),
		// 	},
		// 	body : JSON.stringify(stat)
		// })
		// 	.then(data => data.json())
		// 	.then(updated => {
		// 		handleReservationsStatus({
		// 			lastUpdated : updated._id,
		// 			status : 'pass',
		// 			isLoading : true
		// 		})
		// })
		// .catch(err => console.log(err))
		// })
		// .catch(err => console.log(err))
		
		
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
				.then(kek => {
					handlePlacesStatus({
					lastUpdated : kek._id,
					status : 'pass',
					isLoading : true
			})
				})
				fetch('http://localhost:8000/reservations/stripe',{
					method : "POST",
					headers : {
						"Content-Type" : "application/json",
						"Authorization" : localStorage.getItem('token'),
					},
					body : JSON.stringify(stripe)
				})
				.then(data => data.json())
				.then(result => {
					let receiptUrl = result.receipt_url
					let stat = { status : decision, url : receiptUrl }
					fetch('http://localhost:8000/reservations/'+reservation._id, {
					method : "PUT",
					headers : {
						"Content-Type" : "application/json",
						"Authorization" : localStorage.getItem('token'),
					},
					body : JSON.stringify(stat)
				})
				.then(data => data.json())
				.then(updated => {
					handleReservationsStatus({
						lastUpdated : updated._id,
						status : 'pass',
						isLoading : true
					})
				})
				.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
				break
			case 'Rejected' :
				console.log('Rejected')
				let stat = { status : decision }
				fetch('http://localhost:8000/reservations/'+reservation._id, {
				method : "PUT",
				headers : {
					"Content-Type" : "application/json",
					"Authorization" : localStorage.getItem('token'),
				},
				body : JSON.stringify(stat)
				})
				.then(data => data.json())
				.then(updated => {
					handleReservationsStatus({
						lastUpdated : updated._id,
						status : 'pass',
						isLoading : true
					})
				})
				.catch(err=>console.log(err))
				break
				
			case 'Completed' :
				console.log('Completed')
				break
			default :
				console.log("Error, no decision found")

		}
	}
	return (
		<div className="container my-3">
			<h3>Reservations</h3>
			<hr/>
			<div className="row">
				<div className="col-12 col-md-3">
					<div className="btn-group-vertical w-100">
						<button className="btn btn-outline-info">All</button>
						<button className="btn btn-outline-info">Pending</button>
						<button className="btn btn-outline-info">Accepted</button>
						<button className="btn btn-outline-info">Rejected</button>
					</div>
					<div className="btn-group-vertical w-100 my-5">
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
								<th scope="col">Status</th>
								<th scope="col">{JSON.parse(localStorage.getItem('user')).role == 'host' ?"Customer" : "Host"}</th>
								<th scope="col" className="">Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								reservations.map(reservation => {
									return(									
										<tr>
											<th scope="row">{reservation.code}</th>
											<td>{reservation.placeName}</td>
											<td>{reservation.status}</td>
											<td>{JSON.parse(localStorage.getItem('user')).role == 'host' ? reservation.userName : reservation.hostName}</td>
											<td className={JSON.parse(localStorage.getItem('user')).role == 'host' ?"" : "d-none"}>
												<button className={reservation.status == 'Pending' ? "btn btn-success w-100" : "btn btn-success w-100 d-none"} onClick={() => handleActionButton("Accepted",reservation)}>Accept</button>
												<button className={reservation.status =='Pending' ? "btn btn-danger w-100" : "btn btn-danger w-100 d-none"} onClick={() => handleActionButton("Rejected",reservation)}>Reject</button>
												{/* <button className="btn btn-info" onClick={() => handleActionButton("Completed",reservation)}>Complete</button> */}

											</td>
											<td className={JSON.parse(localStorage.getItem('user')).role == 'user' ?"" : "d-none"}>
												<a className="btn btn-info w-100" href={ reservation.url !== "None" ? reservation.url : "#"}>{ reservation.url == "None" ? "Waiting for reservation acceptance" : "Payment details"}</a>
												{/* <button className="btn btn-info" onClick={() => handleActionButton("Completed",reservation)}>Complete</button> */}

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