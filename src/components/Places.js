import React from 'react'
import {Link} from "react-router-dom"

const Places = ({topPlaces,handleSelectedPlace}) => {

	return (
		<div>
			<div className="container">
				<h1>Explore</h1>
				<div className="row">
					<div className="col-12">
						<h3>Places to stay in the Philippines</h3>
						<div className="card-columns">					
							{ topPlaces.map(place => {
								return (
									<Link to={"/places/view"} onMouseOver={() => handleSelectedPlace(place._id)}>
										<div className="card border-0" key="">
											<img src={"http://localhost:8000"+place.images[0].image} className="card-img-top img-fluid" />
											<div className="card-body p-0 pt-2">
												<p className="card-text m-0"><small>{place.location}</small></p>
												<h5 className="card-title m-0">{place.name}</h5>
												<p className="card-text">{place.baseprice}</p>
											</div>	

										</div>	
									</Link>			
								)
							})}
						</div>
					</div>
					<div className="col-12">
						<h3>Top picks near you</h3>
						<div className="card-columns"> 
							<div className="card" key="">
								<img src="https://via.placeholder.com/150" className="card-img-top" />
								<div className="card-body">
									<h5 className="card-title">Name of place</h5>
									<p className="card-text">Location</p>
									<p className="card-text">Price</p>
									<p className="card-text">Description</p>
								</div>	

							</div> 
							<div className="card" key="">
								<img src="https://via.placeholder.com/150" className="card-img-top" />
								<div className="card-body">
									<h5 className="card-title">Name of place</h5>
									<p className="card-text">Location</p>
									<p className="card-text">Price</p>
									<p className="card-text">Description</p>
								</div>	

							</div> 
							<div className="card" key="">
								<img src="https://via.placeholder.com/150" className="card-img-top" />
								<div className="card-body">
									<h5 className="card-title">Name of place</h5>
									<p className="card-text">Location</p>
									<p className="card-text">Price</p>
									<p className="card-text">Description</p>
								</div>	

							</div>
							<div className="card" key="">
								<img src="https://via.placeholder.com/150" className="card-img-top" />
								<div className="card-body">
									<h5 className="card-title">Name of place</h5>
									<p className="card-text">Location</p>
									<p className="card-text">Price</p>
									<p className="card-text">Description</p>
								</div>	

							</div>
							<div className="card" key="">
								<img src="https://via.placeholder.com/150" className="card-img-top" />
								<div className="card-body">
									<h5 className="card-title">Name of place</h5>
									<p className="card-text">Location</p>
									<p className="card-text">Price</p>
									<p className="card-text">Description</p>
								</div>	

							</div>
						</div>
					</div>
				</div>				
			</div>

		</div>
	)
}


export default Places;