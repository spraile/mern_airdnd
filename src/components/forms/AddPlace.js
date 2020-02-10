import React, {useState} from 'react'

const AddPlaceForm = () => {
    const [place,setPlace] = useState({
		name : "",
		baseprice : "",
		description : "",
		categoryId : "",
		image : ""
	})

	const formData = new FormData()

	const handleChangeText = (e) => {
		setPlace({
			...place,
			[e.target.name] : e.target.value
		})
	}

	const handleChangeFile = e => {
		console.log(e.target.files[0])
		setPlace({
			...place,
			image : e.target.files[0]
		})
		console.log(place)
	}
	const handleSubmitProduct = (e) => {
		e.preventDefault()
		formData.append('name', product.name)
		formData.append('baseprice', product.price)
		formData.append('description', product.description)
		formData.append('categoryId', product.categoryId)
		formData.append('userId', product.categoryId)
		formData.append('hostId', product.categoryId)
		formData.append('image', product.image)

		for (var value of formData.values()) {
		   console.log(value); 
		}
		let url = 'http://localhost:3001/products/'
		fetch(url, {
			method : "POST",
			// mode : "no-cors",
			headers : {
				// "Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token'),
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
				<form onSubmit={handleSubmitProduct} enctype="multipart/form-data">
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
						<label htmlFor="price">Price: </label>
						<input 
							type="number" 
							name="price" 
							id="price" 
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