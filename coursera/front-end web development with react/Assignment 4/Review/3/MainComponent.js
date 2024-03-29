
import React, { Component } from 'react';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch, Route ,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';
import DishDetail from './DishdetailComponent';

import '../App.css';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps= state=>{

  return{
    dishes :state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders

  }
}

const mapDispatchToProps= (dispatch) =>({

addComment: (dishId, rating, author, comment) =>dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {

constructor(props) {

  super(props);
}


render(){

  const HomePage =()=>{

    return(
      <Home dish={this.props.dishes.filter((dishes)=>dishes.featured)[0]}
      promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
      leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
      />
    );
  }
  return (
    <div>
    <Header />
      <Switch>
        <Route path="/home" component={HomePage}/>
       
        <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/> }/>
        <Route exact path="/contactus" component={Contact}/>
        <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders}/>}/>
        <Redirect to="/home"/>
      </Switch>
      
      <Footer />
      
      
      </div>
    
  );
}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
