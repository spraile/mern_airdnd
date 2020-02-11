import React, {useState} from 'react'

const AddImage = ({selectedPlace}) => {
    const [place,setPlace] = useState({})

	const formData = new FormData()

	const handleAddImage = (e) => {
		e.preventDefault()
		console.log(place)
		formData.append('images',place.image)

		let url = 'http://localhost:8000/places/'+selectedPlace._id
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
				<h3 className="mt-3"><i class="far fa-image"></i></h3>
				<hr/>
				<form onSubmit={handleAddImage} >
					<div className="form-group">
						<label htmlFor="image">Image</label>
						<input 
							type="file" 
							name="image" 
							id="image" 
							className="form-control-file"
							onChange={(e) => handleAddImage(e)} 
						/>
					</div>

					<button className="btn btn-primary">Add Image</button>
				</form>
		</React.Fragment>
    )
}

export default AddImage