import React from 'react'
import {Link} from "react-router-dom"
import DayPicker from "./DayPicker"

const Places = ({selectedPlace, handleSelectedPlace}) => {
	const backToMain = () => {
		window.location.href = "http://localhost:3000/"
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
						<Link to="/my-places">EDIT ICON</Link>
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
						<h4>{selectedPlace.categoryId+" hosted by host ID"}</h4>
						<p>{selectedPlace.description}</p>
					</div>
					<div className="col-12 col-md-4">
						<h4>{selectedPlace.baseprice}</h4>
						<button className="btn btn-success w-100">Check Availability</button>
						<button 
							type="button" 
							className="btn btn-primary" 
							data-toggle="modal" 
							data-target={"#C"+selectedPlace._id}
						>
							Check Availability
						</button>


					</div>
				</div>
				<div className="modal fade" id={"C"+selectedPlace._id} tabindex="-1" role="dialog">
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
										<DayPicker />
									</div>
									<div className="col-12 col-md-6 px-5">
										<input type="number" className="form-control" placeholder="Number of guests"/>
										<button className="btn btn-success">Save</button>
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