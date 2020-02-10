import React, {useState} from 'react'

const AddPlaceForm = ({categories}) => {
    const [place,setPlace] = useState({})

	const formData = new FormData()

	const handleChangeText = (e) => {
		setPlace({
			...place,
			[e.target.name] : e.target.value
		})
	}

	const handleChangeFile = e => {
		let allImages = [{}]		
		for (var value of e.target.files) {
			console.log(value.name)
			allImages.push(value)
		}
				 
		setPlace({
			...place,
			images : allImages.slice(1)
		})
	}
	const handleSubmitPlace = (e) => {
		e.preventDefault()
		formData.append('name', place.name)
		formData.append('baseprice', place.baseprice)
		formData.append('location', place.location)
		formData.append('minrec', place.minrec)
		formData.append('maxrec', place.maxrec)
		formData.append('description', place.description)
		formData.append('categoryId', place.categoryId)
		formData.append('hostId', place.hostId)
		place.images.forEach(image => {
			formData.append('images',image)
		})

		console.log(formData.get('images'))
		for (var value of formData.values()) {
		   console.log(value); 
		}
		let url = 'http://localhost:8000/places/'
		fetch(url, {
			method : "POST",
			// mode : "no-cors",
			headers : {
				// "Content-Type" : "application/json",
				"Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlM2ZmZGY1MmVkMGEwMWE4NzdhYTUxMyIsImlhdCI6MTU4MTM3MzQ3MX0.eI95wId94F0i1Zeq5kO5N3JieX2r9IrBT7Xtg9b2gHk',
				"Access-Control-Allow-Origin" : "*"
			},
			body : formData,
		})
		.then(data => data.json())
		.then(newProduct => console.log(newProduct))
		.catch(error => {
			console.log(error)
		})
	}

    return (
        <React.Fragment>
				<h3 className="mt-3">Add Product</h3>
				<hr/>
				<form onSubmit={handleSubmitPlace} enctype="multipart/form-data">
					<div className="form-group">
						<label htmlFor="name">Name: </label>
						<input 
							type="text" 
							name="name"
							id="name"
							className="form-control"
							onChange={(e) => handleChangeText(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="location">Location: </label>
						<input 
							type="text" 
							name="location"
							id="location"
							className="form-control"
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
									return (
										<option value={category._id}>{category.name}</option>
									)
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="image">Image</label>
						<input 
							type="file" 
							name="image" 
							id="image" 
							className="form-control-file"
							multiple 
							onChange={(e) => handleChangeFile(e)} 
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description: </label>
						<textarea 
							name="description" 
							id="description" 
							rows="5" 
							className="form-control" 
							onChange={(e) => handleChangeText(e)}
						></textarea>
					</div>
					<button className="btn btn-primary">Add Product</button>
				</form>
			</React.Fragment>
    )
}

export default AddPlaceForm