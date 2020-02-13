import React, {useState} from 'react'

const MyPlacesNav = ({selectedPlace, places, handleSelectedPlace}) => {
	let hostPlaces = places.filter(place => place.hostId == JSON.parse(localStorage.getItem('user')).id)
	return (
		<div className="btn-group-vertical py-3">
			{
				hostPlaces.map(place => {
					return (
						<button className="btn btn-outline-info border-radius-0 w-100" onClick={() => handleSelectedPlace(place._id)}>{place.name}</button>
					)
				})
			}
		</div>
	)
}

export default MyPlacesNav