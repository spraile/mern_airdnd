import React from 'react'
import EditPlace from './forms/EditPlace'
import DeletePlace from './forms/DeletePlace'
import AddImage from './forms/AddImage'
import DeleteImage from './forms/DeleteImage'
import MyPlacesNav from './layouts/MyPlacesNav'


const HostPanel = ({selectedPlace, categories, places, handleSelectedPlace, handlePlacesStatus}) => {
	let hostPlaces = places.filter(place => place.hostId == JSON.parse(localStorage.getItem('user')).id)
	console.log(hostPlaces)
	return (
		<div className="container">
			
			<div className="row">
				<div className="col-12 col-md-3">
					<MyPlacesNav selectedPlace={selectedPlace} places={places} handleSelectedPlace={handleSelectedPlace} handlePlacesStatus={handlePlacesStatus}/>
				</div>
				<div className="col-12 col-md-6">
					<EditPlace selectedPlace={selectedPlace} categories={categories} handlePlacesStatus={handlePlacesStatus}/>											
				</div>
				<div className="col-12 col-md-3">					
					<AddImage selectedPlace={selectedPlace} handlePlacesStatus={handlePlacesStatus}/>
					<DeleteImage selectedPlace={selectedPlace} handlePlacesStatus={handlePlacesStatus}/>
					<DeletePlace selectedPlace={selectedPlace} handlePlacesStatus={handlePlacesStatus}/>
				</div>
			</div>
		</div>
	)
}

export default HostPanel;