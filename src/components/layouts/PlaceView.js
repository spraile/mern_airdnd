import React, {useState} from 'react'
import {Link} from "react-router-dom"
import DayPicker from "./DayPicker"

const Places = ({selectedPlace, categories}) => {
	const [reservedDates, setReservedDates] = useState([])
	const [guestCount, setGuestCount] = useState(null)
	const [bookingDetails, setBookingDetails] = useState({
		guestCount : 0,
		reservedDates : [],
		price : 0
	})

	const backToMain = () => {
		window.location.href = "http://localhost:3000/"
	}
	const handleChangeReservedDates = (dates) => {
		setReservedDates(dates)
	}

	const handleChangeGuestCount = (e) => {
		setGuestCount({
			number : e.target.value
		})
	}

	const handleSaveDetails = () => {
		setBookingDetails({
			guestCount : guestCount.number,
			reservedDates : reservedDates,
			price : selectedPlace.baseprice*reservedDates.length,
			hostId : selectedPlace.hostId,
			hostName : selectedPlace.hostName,
			userId : JSON.parse(localStorage.getItem('user')).id,
			userName : JSON.parse(localStorage.getItem('user')).firstname + " " + JSON.parse(localStorage.getItem('user')).lastname,
			placeId : selectedPlace._id,
			placeName : selectedPlace.name
		})
	}

	const handleSendReservationRequest = () => {
		let url = 'http://localhost:8000/reservations/'
		fetch(url, {
			method : "POST",
			headers : {
				"Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token')
			},
			body : JSON.stringify(bookingDetails)
		})
		.then( data => data.json())
		.then( reservation => console.log(reservation))
		.catch(error => console.log(error))
	}
	if(!selectedPlace) {
		backToMain()
	} else {
		return (

			<div className="container">
				<div className="row">
					<div className="col-11">
						<h3>{selectedPlace.name}</h3>
						<small>{selectedPlace.location}</small>
					</div>
					<div className="col-1">
						<Link to="/my-places"><i class="fas fa-cog"></i></Link>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<img src={"http://localhost:8000"+selectedPlace.images[0].image} className="w-100"alt=""/>
					</div>
					<div className="col-12 col-md-6">
						<img src={"http://localhost:8000"+selectedPlace.images[1].image} className="w-100"alt=""/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-8">
						<h4>{categories.find(category => category._id == selectedPlace.categoryId).name+" hosted by " + selectedPlace.hostName }</h4>
						<p>{selectedPlace.description}</p>
					</div>
					<div className="col-12 col-md-4">
						<h4>{selectedPlace.baseprice}</h4>
						<button 
							type="button" 
							className="btn btn-primary" 
							data-toggle="modal" 
							data-target={"#C"+selectedPlace._id}
						>
							Check Availability
						</button>
						<button className="btn btn-success w-100" onClick={handleSendReservationRequest}>Reserve</button>


					</div>
				</div>
				<div className="modal fade" id={"C"+selectedPlace._id} tabIndex="-1" role="dialog">
					<div className="modal-dialog modal-lg">

						<div className="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Check availability</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
							<div className="container">
								<div className="row">
									<div className="col-12 col-md-6 px-5">
										<DayPicker handleChangeReservedDates={handleChangeReservedDates} selectedPlace={selectedPlace}/>
									</div>
									<div className="col-12 col-md-6 px-5">
										<input 
											type="number" 
											className="form-control" 
											placeholder="Number of guests"
											onChange={(e) => handleChangeGuestCount(e)}
										/>
										<div className="row">
											<div className="col-12 col-md-6">
												<p>{selectedPlace.baseprice} / night</p>
												<p>{selectedPlace.baseprice*reservedDates.length} for {reservedDates.length} nights</p>

											</div>
											<div className="col-12 col-md-6">
												<button className="btn btn-success ml-auto" onClick={handleSaveDetails} data-dismiss="modal">Save</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
								
			</div>


	)

	}
	}


export default Places;