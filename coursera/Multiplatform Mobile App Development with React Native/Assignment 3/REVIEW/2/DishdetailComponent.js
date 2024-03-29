import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { Rating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';



const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                ratingCount={5}
                imageSize={20}
                readonly 
                startingValue={item.rating}
                style={styles.rating}
                />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
        <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
        </Animatable.View>
    );
}


function RenderDish(props) {

    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if(dx > 200)
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            else if(recognizeComment(gestureState))
                props.toggleModal();

            return true;
        }
    })
    
        if (dish != null) {
            console.log(this.view);
            return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef}  {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                        <View style={styles.formRow}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={props.toggleModal}
                            />
                        </View>
                        <Modal animationType = {"slide"} transparent = {false}
                        visible = {props.showModal}
                        onDismiss = {() => props.toggleModal() }
                        onRequestClose = {() => props.toggleModal() }>
                        <View style={styles.formRow}>
                        <Rating
                        showRating
                        onFinishRating={props.rating}
                        style={{margin: 0, padding: 0, height: 10}}
                        />
                        </View>
                        <Input
                        placeholder=" Author"
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={props.author}
                        />
                        <Input
                        placeholder=" Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        onChangeText={props.comment}
                        />       
                        <View style={styles.formItem}>
                        <Button
                            onPress={() => props.handleRating()}
                            title="Submit"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                            />
                        <Button
                            style={{marginTop: "5px"}}
                            onPress={() => props.toggleModal()}
                            title="Cancel"
                            color="#D3D3D3"
                            accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                    </Modal>
                </Card>
            </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            rating: '',
            author: '',
            comment: ''
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    handleRating(dishId){
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.setState({
            rating: '',
            author: '',
            comment: ''
        });
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                     favorite={this.props.favorites.some(el => el === dishId)}
                     onPress={() => this.markFavorite(dishId)}
                     toggleModal={() => this.toggleModal()} 
                     showModal={this.state.showModal}
                     rating={(rating) => this.setState({rating: rating})}
                     author={(author) => this.setState({author: author})}
                     comment={(comment) => this.setState({comment: comment})}
                     handleRating={()=> this.handleRating(dishId)}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
        marginTop: 20
    },
    rating: {
        marginLeft: 0,
        alignItems: 'flex-start'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);