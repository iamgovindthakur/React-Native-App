import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, Modal, StyleSheet, PanResponder, Alert } from 'react-native'
import { Card, Icon, Rating, Input, AirbnbRating, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavourite, postComment } from '../redux/ActionCreators'
import { withNavigation } from 'react-navigation'
import * as Animatable from 'react-native-animatable'

function RenderDish(props) {
    const dish = props.dish

    this.handleViewRef = ref => this.view = ref

    const recongnizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200)
            return 'right'
        else if (dx > 200)
            return 'left'
        else
            return false
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => (true),
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? "finished" : "Not Done"))
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recongnizeDrag(gestureState) === 'right') {
                Alert.alert(
                    'Add to Favourites?',
                    'Are you sure to add ' + dish.name + ' to your favourites?',
                    [{
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => console.log('You cancelled the operation')
                    }, {
                        text: 'Ok',
                        onPress: () => props.favourite ? console.log('Already Favourite') : props.onPress()
                    }],
                    { cancelable: false }
                )
            }
            else if (recongnizeDrag(gestureState) === 'left') {
                return props.toggleModal()
            }
            return true
        }
    })
    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={1500} delay={500} ref={this.handleViewRef} {...panResponder.panHandlers}>
                <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ margin: 10 }}>{dish.description}</Text>
                    <View style={styles.rowView}>
                        <Icon raised reverse name={props.favourite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
                            onPress={() => props.favourite ? console.log('Already Favourite') : props.onPress()} />
                        <Icon raised reverse name="pencil-square-o" type="font-awesome" color="#512DA8"
                            onPress={() => props.toggleModal()} />
                    </View>
                </Card>
            </Animatable.View>
        )
    }
    else {
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <View style={{ alignItems: 'flex-start' }} >
                    <Rating imageSize={14} readonly startingValue={item.rating} />
                </View>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }
    return (
        <Animatable.View animation="fadeInUp" duration={1500} delay={500}>
            <Card title='Comments'>
                <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    )
}

class DishDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            author: null,
            comment: null,
            rating: 5
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    markFavourite = dishId => {
        this.props.postFavourite(dishId)
    }

    toggleModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal }))
    }
    resetModal = () => {
        this.setState({
            author: null,
            comment: null,
            rating: 5
        })
    }

    ratingCompleted = (rating) => {
        this.setState({ rating: rating })
    }

    handleComment = (dishId) => {
        const dateNow = new Date()
        const newComment = {
            id: this.props.comments.comments.filter(item => item.dishId === dishId).length,
            dishId: dishId,
            rating: this.state.rating,
            comment: this.state.comment,
            author: this.state.author,
            date: dateNow.toISOString()
        }
        this.props.postComment(newComment)
    }



    render() {
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favourite={this.props.favourites.some(item => item === dishId)} onPress={() => this.markFavourite(dishId)} toggleModal={this.toggleModal} />

                <RenderComments comments={this.props.comments.comments.filter(item => dishId === item.dishId)} />
                <Modal visible={this.state.showModal} transparent={false} onDismiss={() => { this.toggleModal(); this.resetModal() }}
                    onRequestClose={() => { this.toggleModal(); this.resetModal() }} animationType={"slide"}>

                    <View>
                        <AirbnbRating
                            count={5}
                            showRating
                            defaultRating={this.state.rating}
                            onFinishRating={(rating) => this.ratingCompleted(rating)}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => this.setState({ author: value })}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        <Button buttonStyle={{ marginTop: 20, backgroundColor: '#b84dff' }} title='Submit' color="#512DA8" onPress={() => { this.handleComment(dishId); this.resetModal(); this.toggleModal() }} />
                        <Button buttonStyle={{ marginTop: 20, backgroundColor: '#ff1a1a' }} title='Cancel' color="#512DA8" onPress={() => { this.toggleModal(); this.resetModal() }} />
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#99ffcc'
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    favourites: state.favourites
})

const mapDispatchToProps = dispatch => ({
    postFavourite: (dishId) => dispatch(postFavourite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DishDetail))