import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Picker, Switch, Button, Text, Alert } from 'react-native'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'

export class Reservation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            guests: 1,
            isAC: true,
            date: '',
        }
    }

    toggleSwitch = () => { this.setState(prevState => ({ isAC: !prevState.isAC })) }

    handleReservation = () => {
        console.log(JSON.stringify(this.state))
        Alert.alert(
            'Reservation Confirmation',
            'Number Of Guests:' + this.state.guests + '\nAC/Non-AC:' + (this.state.isAC ? 'AC' : 'Non-AC') + '\nDate and Time:' + this.state.date,
            [{
                text: 'Cancel',
                style: 'cancel',
                onPress: () => this.resetForm()
            },
            {
                text: 'Confirm',
                onPress: () => this.resetForm()
            }
            ],
            { cancelable: false }
        )
    }
    resetForm = () => {
        this.setState({
            guests: 1,
            isAC: true,
            date: ''
        })
    }

    render() {
        return (
            <Animatable.View animation='zoomIn' duration={1500} delay={400}>
                <ScrollView>
                    <View style={styles.FormView}>
                        <Text style={styles.FormLabel}>Number Of Guests:</Text>
                        <Picker style={styles.FormItem} selectedValue={this.state.guests} onValueChange={(itemValue, itemIndex) => { this.setState({ guests: itemValue }) }}>
                            <Picker.Item value='1' label='1' />
                            <Picker.Item value='2 ' label='2' />
                            <Picker.Item value='3' label='3' />
                            <Picker.Item value='4' label='4' />
                            <Picker.Item value='5' label='5' />
                            <Picker.Item value='6' label='6' />
                            <Picker.Item value='7' label='7' />
                            <Picker.Item value='8' label='8' />
                            <Picker.Item value='9' label='9' />
                            <Picker.Item value='10' label='10' />
                            <Picker.Item value='11' label='11' />
                            <Picker.Item value='12' label='12' />
                        </Picker>
                    </View>
                    <View style={styles.FormView}>
                        <Text style={styles.FormLabel}>Non-AC/AC:</Text>
                        <Switch style={styles.FormItem} onValueChange={this.toggleSwitch} value={this.state.isAC} thumbColor={this.state.isAC ? "#f5dd4b" : "#f4f3f4"} />
                    </View>
                    <View style={styles.FormView}>
                        <Text style={styles.FormLabel} >Date And Time:</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format='\At h:mm:ss A On DD-MM-YYYY'
                            mode="datetime"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            placeholder="Select Date and Time"
                            minDate='12-06-2020'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={date => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8, flex: 1 }}>
                        <Button title="Reserve" color="#512DA8" onPress={this.handleReservation} accessibilityLabel="Learn more about this button" />
                    </View>
                </ScrollView>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    FormView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20
    },
    FormLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 2,
        marginLeft: 25
    },
    FormItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation
