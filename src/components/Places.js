import React from 'react'
import {Link} from "react-router-dom"

const Places = ({topPlaces,handleSelectedPlace, categories, places}) => {

	return (
		<div>
			<div className="container-fluid">
				<h1>Explore</h1>
				<div className="row">
					<div className="col-12 mt-5">
						<h3>Places to stay in the Philippines</h3>
						<div className="card-columns">					
							{ topPlaces.map(place => {
								return (
									<Link to={"/places/view"} onMouseOver={() => handleSelectedPlace(place._id) } className="myLink">
										<div className="card border-0" key={place._id}>
											<img src={"https://cap3db.herokuapp.com"+place.images[0].image} className="card-img-top img-fluid" />
											<div className="card-body p-0 pt-2">
												<p className="card-text m-0"><small>{place.location}</small></p>
												<h5 className="card-title m-0">{place.name}</h5>
												<p className="card-text">&#8369; {place.baseprice} / night</p>
											</div>	

										</div>	
									</Link>			
								)
							})}
						</div>
					</div>
					<div className="col-12 mt-5">
						<h3>Top picks near you</h3>
						<div className="card-columns" id="my-card-col"> 
							{places.map(place => {
								return (
									<Link to={"/places/view"} onMouseOver={() => handleSelectedPlace(place._id)} className="myLink">
										<div className="card border-0" key="place._id">
											<img src={"https://cap3db.herokuapp.com"+place.images[0].image} className="card-img-top img-fluid" />
											<div className="card-body p-0 pt-2">
												<p className="card-text m-0"><small>{place.location}</small></p>
												<h5 className="card-title m-0">{place.name}</h5>
												<p className="card-text">&#8369; {place.baseprice} / night</p>
											</div>	

										</div>	
									</Link>	
								)
							})}
							
							
						</div>
					</div>
				</div>				
			</div>

		</div>
	)
}


export default Places;