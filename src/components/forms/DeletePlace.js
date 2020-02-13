import React, {useState} from 'react'

const DeletePlace = ({selectedPlace,handlePlacesStatus}) => {
	
	const handleSubmit = (e) => {
		e.preventDefault()
		let url = 'https://cap3db.herokuapp.com/'+selectedPlace._id
		fetch(url, {
			method : "DELETE",
			headers : {
				"Content-Type" : "application/json",
				"Authorization" : localStorage.getItem('token')
			}
		})
		.then(data => data.json())
		.then(newProduct => {
			handlePlacesStatus({
				lastUpdated : newProduct._id,
				status : 'pass',
				isLoading : true
			})
		})
	}

	return (
			<React.Fragment>

				<div className="row">
					<div className="col-12">
						<h3 className="mt-3">Unlist Place</h3>
						<hr/>
						<button type="button" class="btn btn-danger" data-toggle="modal" data-target={"#D"+selectedPlace._id}>
						  Unlist Place
						</button>
					</div>
				</div>
				<div class="modal fade" id={"D"+selectedPlace._id} tabindex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title">Warning</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				        Unlisting the place will make customers unable to see this listing. Are you sure?
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				        <form onSubmit={(e) => handleSubmit(e)} className="inline">						
							<button className="btn btn-danger">Unlist Place</button>
						</form>
				      </div>
				    </div>
				  </div>
				</div>
			</React.Fragment>
	)
}

export default DeletePlace