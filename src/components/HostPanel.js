import React from 'react'
import EditPlace from './forms/EditPlace'
import DeletePlace from './forms/DeletePlace'
import AddImage from './forms/AddImage'
import DeleteImage from './forms/DeleteImage'
import MyPlacesNav from './layouts/MyPlacesNav'


const HostPanel = ({selectedPlace, categories, places, handleSelectedPlace}) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-2">
					<MyPlacesNav selectedPlace={selectedPlace} places={places} handleSelectedPlace={handleSelectedPlace}/>
				</div>
				<div className="col-12 col-md-6">
					<EditPlace selectedPlace={selectedPlace} categories={categories}/>											
				</div>
				<div className="col-12 col-md-4">					
					<AddImage selectedPlace={selectedPlace}/>
					<DeleteImage selectedPlace={selectedPlace}/>
					<DeletePlace selectedPlace={selectedPlace}/>
				</div>
			</div>
		</div>
	)
}

export default HostPanel;