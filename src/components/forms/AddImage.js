import React, {useState} from 'react'

const AddImage = ({selectedPlace, handlePlacesStatus}) => {
    const [place,setPlace] = useState({})

	const formData = new FormData()
	
	const handleChangeImage = (e) => {
		console.log(e.target.files[0])
		setPlace({ image : e.target.files[0]})
		console.log(place)
	}

	const handleAddImage = (e) => {
		e.preventDefault()
		console.log(place)
		formData.append('image',place.image)
		console.log(formData.get('image'))

		let url = 'http://localhost:8000/places/'+selectedPlace._id+"/add-image"
		fetch(url, {
			method : "PUT",
			// mode : "no-cors",
			headers : {
				// "Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token'),
			},
			body : formData,
		})
		.then(data => data.json())
		.then(newPlace => console.log(newPlace))
		.catch(error => {
			console.log(error)
		})
	}

    return (
        <React.Fragment>
				<h3 className="mt-3"><i class="far fa-image"></i>   Add Image</h3>
				<hr/>
				<form onSubmit={handleAddImage} >
					<div className="form-group">
						<label htmlFor="image">Image</label>
						<input 
							type="file" 
							name="image" 
							id="image" 
							className="form-control-file"
							onChange={(e) => handleChangeImage(e)} 
						/>
					</div>

					<button className="btn btn-primary">Add Image</button>
				</form>
		</React.Fragment>
    )
}

export default AddImage