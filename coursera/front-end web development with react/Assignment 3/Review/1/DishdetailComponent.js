import React, { Component } from 'react'
import { CardTitle, Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import {LocalForm, Control, Errors } from 'react-redux-form';


const RenderDish = ({ dish }) => {
	return (
		<div className="col-12 col-md-5 m-1">
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle className="font-weight-bold">{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

const RenderComments = ({ comments, toggleModal }) => {
	return (
		<div className="col-12 col-md-5 m-1">
			<h4>Comments</h4>
			<ul className="list-unstyled">
				{comments.map((comment) => {

					return (
						<li key={comment.id} className="mt-3">
							<p>{comment.comment}</p>
							<p>-- {comment.author}, {Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
						</li>
					);
				})}
			</ul>
			<CommentFormcomponent/>
		</div>
	);
}

const DishDetail = (props) => {
	if (props.dish) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComments comments={props.comments}/>
				</div>
			</div>
		);
	}
	else {
		return (
			<div></div>
		);
	}
	
}

class CommentFormcomponent extends Component {
	constructor(props) {
	   super(props);

	   this.state = {
		   isModalOpen: false
	   };

	   this.toggleModal = this.toggleModal.bind(this);
	   this.handleSubmit = this.handleSubmit.bind(this);
   }

   toggleModal = ()=>{
	   this.setState({
		   isModalOpen : !this.state.isModalOpen
	   });
   }

   handleSubmit = (values) => {
	   this.toggleModal();
	   alert('Current State is: ' + JSON.stringify(values));
   }

   render() {
	   const required = (val) => val && val.length;
	   const minLength = (len) => (val) => !required(val) || val.length >= len;
	   const maxLength = (len) => (val) => !required(val) || val.length <= len;

	   return (
		   <>
			   <Button outline onClick={this.toggleModal}>
				   <span className="fa fa-edit"></span>{' '}
				   Submit Comment
			   </Button>
			   <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
				   <ModalHeader toggle={this.toggleModal}>
					   Submit Comment
				   </ModalHeader>
				   <ModalBody>
					   <LocalForm className="container" onSubmit={this.handleSubmit}> 
						   <Row className="form-group">
							   <Label for="rating">
								   Rating
							   </Label>
							   <Control.select model=".rating" id="rating" name="rating" className="form-control">
								   <option>1</option>
								   <option>2</option>
								   <option>3</option>
								   <option>4</option>
								   <option>5</option>
							   </Control.select>
						   </Row>
						   <Row className="form-group">
							   <Label for="author">
								   Your Name
							   </Label>
							   <Control.text model=".author" className="form-control" id="author" name="author" placeholder="Your Name"
								   validators={{
									   required,
									   minLength: minLength(3),
									   maxLength: maxLength(15)
								   }}
							   />
							   <Errors
								className="text-danger"
								model=".author"
								show="touched"
								messages={{
									required: "Required",
									minLength: "Must be 3 characters of more",
									maxLength: "Must be 15 charactesr of less"
								}}
								/>
						   </Row>
						   <Row className="form-group">
							   <Label for="comment">
								   Comment
							   </Label>
							   <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6"/>
						   </Row>
						   <Row className="form-group">
							   <Button color="primary" type="submit">
								   Submit
							   </Button>
						   </Row>
					   </LocalForm>
				   </ModalBody>
			   </Modal>  
		   </>
	   )
   }
}

export default DishDetail;