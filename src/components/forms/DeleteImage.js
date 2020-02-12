import React, {useState} from 'react'

const RemoveImage = ({selectedPlace}) => {
	let imageIdState = ""
	let imageImageState = ""
	if(selectedPlace.name) {
		imageIdState = selectedPlace.images[0]._id
		imageImageState = selectedPlace.images[0].image
	}
	const [imageId,setImageId] = useState(imageIdState) 
	const [imageImage,setImageImage] = useState(imageImageState) 

	const handleChange = (e) => {
		let imageInfo = e.target.value.split(" ")
		console.log(imageInfo)
		setImageId(imageInfo[0])
		setImageImage(imageInfo[1])
		// setTimeout(showImage,2000)
		// console.log(imageId)
		// console.log(imageImage)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let url = 'http://localhost:8000/places/'+selectedPlace._id+"/"+imageId
		console.log(url)
		fetch(url, {
			method : "PUT",
			headers : {
				"Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token')
			}
		})
		.then(data => data.json())
		.then(category => console.log(category))
	}
	if(selectedPlace.name) {
	return (
			<div className="row">
				<div className="col-12">
					<h3 className="mt-3">Delete Category</h3>
					<hr/>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="category">Category: </label>
							<select 
								name="image-id" 
								id="image-id" 
								className="form-control"
								onChange={(e) => handleChange(e)}
							>
								<option disabled>Select Image</option>
								{ selectedPlace.images.map( image => {
									return (
										<option value={image._id + " " + image.image}>{image.image.slice(9)}</option>
									)
								})}
							</select>
							<img src={"http://localhost:8000"+imageImage} alt="Image to be deleted" className="img-fluid"/>					
						</div>
						<button className="btn btn-danger">Remove Image</button>
					</form>
				</div>
			</div>
	)
		
	} else {
		return (
			<div className="row">
				<div className="col-12">
					<h3 className="mt-3">Delete Category</h3>
					<hr/>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="category">Category: </label>
							<select 
								name="image-id" 
								id="image-id" 
								className="form-control"
								onChange={(e) => handleChange(e)}
							>
								<option disabled selected>Select Image</option>
								
							</select>
							<img src={"http://localhost:8000"+imageImage} alt="Image to be deleted" className="img-fluid"/>					
						</div>
						<button className="btn btn-danger">Remove Image</button>
					</form>
				</div>
			</div>
		)
	}
}

export default RemoveImage