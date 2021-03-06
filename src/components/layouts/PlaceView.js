import React, {useState} from 'react'
import {Link} from "react-router-dom"
import DayPicker from "./DayPicker"


const Places = ({selectedPlace, categories, handleReservationsStatus}) => {
	const [reservedDates, setReservedDates] = useState([])
	const [guestCount, setGuestCount] = useState(null)
	const [bookingDetails, setBookingDetails] = useState({
		guestCount : 0,
		reservedDates : [],
		price : 0
	})

	const backToMain = () => {
		window.location.href = "https://cap3client.herokuapp.com/"
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
	let usr = JSON.parse(localStorage.getItem('user'))
	if(!usr) {
		usr = { role : ""}
	}
	const icon = (usr) => {
		if(usr) {
			if(usr.id == selectedPlace.hostId) {
				return (
					<Link to="/my-places"><i class="fas fa-cog"></i></Link>
				)
			}
		}
	}

	const handleSendReservationRequest = () => {
		let url = 'https://cap3db.herokuapp.com/reservations/'
		fetch(url, {
			method : "POST",
			headers : {
				"Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token')
			},
			body : JSON.stringify(bookingDetails)
		})
		.then( data => data.json())
		.then( reservation => {
			handleReservationsStatus({
				lastUpdated : reservation._id,
				status : 'pass',
				isLoading : true
			})
			window.location.href = "https://cap3client.herokuapp.com/reservations"
		})
		.catch(error => console.log(error))
	}
	if(!selectedPlace) {
		backToMain()
	} else {
		return (

			<div className="container">
				<div className="row pt-5">
					<div className="col-11">
						<h3>{selectedPlace.name}</h3>
						<small>{selectedPlace.location}</small>
					</div>
					<div className="col-1">
						{icon(usr)}
					</div>
				</div>
				<div className="row py-3">
					<div className="col-12 col-md-6">
						<img src={"https://cap3db.herokuapp.com"+selectedPlace.images[0].image} className="w-100 my-img"alt=""/>
					</div>
					<div className="col-12 col-md-6">
						<img src={"https://cap3db.herokuapp.com"+selectedPlace.images[1].image} className="w-100 my-img"alt=""/>
					</div>
				</div>
				<div className="row py-3">
					<div className="col-12 col-md-8">
						<h4>{categories.find(category => category._id == selectedPlace.categoryId).name+" hosted by " + selectedPlace.hostName }</h4>
						<p>{selectedPlace.description}</p>
					</div>
					<div className="col-12 col-md-4">
						<h4><strong>&#8369;{selectedPlace.baseprice}</strong> / night</h4>
						<div className={usr.role == 'host' ? "d-none" : "" }>
						<h4 className={!bookingDetails.guestCount ? "d-none" : ""}><strong>&#8369;{bookingDetails.price}</strong> for {reservedDates.length} nights</h4>
						<button 
							type="button" 
							className="btn btn-primary w-100 border-radius-0 my-3" 
							data-toggle="modal" 
							data-target={"#C"+selectedPlace._id}
						>
							{ bookingDetails.guestCount ? "Edit" : "Check Availability"}
						</button>
						<button className={!bookingDetails.guestCount ? "btn btn-success w-100 border-radius-0 d-none" : "btn btn-success w-100 border-radius-0"} onClick={handleSendReservationRequest}>Reserve</button>
						</div>


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
									<div className="col-12 col-md-6 p-3">
										<input 
											type="number" 
											className="form-control" 
											placeholder="Number of guests"
											onChange={(e) => handleChangeGuestCount(e)}
										/>
										<div className="row py-3">
											<div className="col-12 col-md-6">
												<p className="pt-3"><strong>&#8369; {selectedPlace.baseprice}</strong> / night</p>
												<p><strong>&#8369; {selectedPlace.baseprice*reservedDates.length}</strong> for {reservedDates.length} nights</p>

											</div>
											<div className="col-12 col-md-6">
												<button className="btn btn-success border-radius-0 w-100 my-3 " onClick={handleSaveDetails} data-dismiss="modal">Save</button>
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