import React from 'react'

const Places = ({selectedPlace, handleSelectedPlace}) => {
	const backToMain = () => {
		window.location.href = "http://localhost:3000/"
	}
	if(!selectedPlace) {
		backToMain()
	} else {
		return (

			<div className="container">
				<h3>{selectedPlace.name}</h3>
				<small>{selectedPlace.location}</small>
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
					</div>
				</div>
								
			</div>


	)

	}
	}


export default Places;