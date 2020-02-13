import React, {useState, useEffect} from 'react'

const EditPlace = ({categories, selectedPlace,handlePlacesStatus}) => {
    const [place,setPlace] = useState({
		name : selectedPlace.name,
		baseprice : selectedPlace.baseprice,
		categoryId : selectedPlace.categoryId,
		minrec : selectedPlace.minrec,
		maxrec : selectedPlace.maxrec,
		location : selectedPlace.location,
    })

    useEffect(() => {
    	setPlace({
    		name : selectedPlace.name,
    		baseprice : selectedPlace.baseprice,
    		categoryId : selectedPlace.categoryId,
    		minrec : selectedPlace.minrec,
    		maxrec : selectedPlace.maxrec,
    		location : selectedPlace.location,
    	})
    },[selectedPlace._id])

	const formData = new FormData()

	const handleChangeText = (e) => {
		setPlace({
			...place,
			[e.target.name] : e.target.value
		})
	}

	const handleEditPlace = (e) => {
		e.preventDefault()
		console.log(place)
		let url = 'https://cap3db.herokuapp.com/'+selectedPlace._id
		fetch(url, {
			method : "PUT",
			// mode : "no-cors",
			headers : {
				"Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token'),
			},
			body : JSON.stringify(place),
		})
		.then(data => data.json())
		.then(newPlace => {
			handlePlacesStatus({
				lastUpdated : newPlace._id,
				status : 'pass',
				isLoading : true
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

    return (
        <React.Fragment>
				<h3 className="mt-3">{selectedPlace.name}</h3>
				<hr/>
				<form onSubmit={handleEditPlace} >
					<div className="form-group">
						<label htmlFor="name">Name: </label>
						<input 
							type="text" 
							name="name"
							id="name"
							className="form-control"
							onChange={(e) => handleChangeText(e)}
							value={place.name}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="location">Location: </label>
						<input 
							type="text" 
							name="location"
							id="location"
							className="form-control"
							value={place.location}
							onChange={(e) => handleChangeText(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="baseprice">Base Price: </label>
						<input 
							type="number" 
							name="baseprice" 
							id="baseprice" 
							className="form-control"
							value={place.baseprice}
							onChange={(e) => handleChangeText(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="minrec">Minimum number of people recommended: </label>
						<input 
							type="number" 
							name="minrec" 
							id="minrec" 
							className="form-control"
							value={place.minrec}
							onChange={(e) => handleChangeText(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="maxrec">Maximum number of people recommended: </label>
						<input 
							type="number" 
							name="maxrec" 
							id="maxrec" 
							className="form-control"
							value={place.maxrec}
							onChange={(e) => handleChangeText(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="categoryId">Category: </label>
						<select 
							name="categoryId" 
							id="categoryId" 
							className="form-control"
							onChange={(e) => handleChangeText(e)}
						>
							<option disabled selected>Select category</option>
							{
								categories.map(category => {
									if(category._id == selectedPlace.categoryId){
										return (
											<option value={category._id} selected>{category.name}</option>
									)
									} else {
										return (
											<option value={category._id}>{category.name}</option>
										)
									}
								})
							}
						</select>
					</div>

					<button className="btn btn-primary">Update Place</button>
				</form>
			</React.Fragment>
    )
}

export default EditPlace