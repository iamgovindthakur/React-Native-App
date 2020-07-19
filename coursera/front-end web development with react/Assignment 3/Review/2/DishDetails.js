import React, {Component} from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Button, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';

import { Control, LocalForm, Errors } from 'react-redux-form';

import { Link } from 'react-router-dom'


function RenderComments({comments}) {
    if (comments == null) {
        return (<div></div>)
    }

    const Comments = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                &nbsp;
                {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                </p>
            </li>
        )

    })
    
    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {Comments}
            </ul>

            <CommentForm> 
            </CommentForm>
        </div>
    )
}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

const DishDetail = (props) => {

    const dish = props.dish

    if (dish === null) {
        return (<div></div>)
    }

    const dishItem = <RenderDish dish={dish} />

    const commentItem =  <RenderComments 
                            comments={props.comments}
                            
                        />

    return (
        <div className="container">

            <div className="row">

                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr/>
                </div>
            </div>

            <div className='row'>
                {dishItem}
                {commentItem}
            </div>
        </div>
        
    )
}

const required   = (val) => val && val.length
const maxLength  = (len) => (val) => !(val) || (val.length <= len)
const minLength  = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

  
    handleSubmit(values) {

        this.toggleModal();

        console.log('Current State is: ' + JSON.stringify(values));

    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span>Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm> 
                            <Row  className="form-group">
                                <Label for="rating" md={12}>Rating</Label>
                                <Col  md={12}>

                                    <Control.select defaultValue="5" model=".rating" id="rating" name="rating" className="form-control" >

                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author"  md={12}>Your Name</Label>

                                <Col  md={12}>

                                    <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" 
                                    validators={{ 
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15) }} />

                                    <Errors 
                                    className="text-danger" 
                                    model=".author" 
                                    show="touched" 
                                    messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less' }} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="feedback"  md={12}>Your feedback</Label>
                                <Col  md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" resize="none" rows="6" className="form-control" validators={{ required }} />
                                    <Errors 
                                        className="text-danger" 
                                        model=".comment" 
                                        show="touched" 
                                        messages={{ required: 'Required' }} />
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

export default DishDetail