import React, {useState} from 'react'

const MyPlacesNav = ({selectedPlace, places, handleSelectedPlace}) => {
	let hostPlaces = places.filter(place => place.hostId == JSON.parse(localStorage.getItem('user')).id)
	return (
		<div className="btn-group-vertical">
			{
				hostPlaces.map(place => {
					return (
						<button className="btn btn-info border" onClick={() => handleSelectedPlace(place._id)}>{place.name}</button>
					)
				})
			}
		</div>
	)
}

export default MyPlacesNav