import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import CardView from './CardView'

const ExpenseItem = props => {
  return (
    <CardView>
    <TouchableOpacity  style={styles.placeItem}>
      
       {/* <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}> */}
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
      <Text style={styles.amount}>{props.time}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.amount}>{props.amount}</Text>
        <Text style={styles.comment}>{props.comment}</Text>
      </View>
      
    </TouchableOpacity>
    </CardView>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
    fontFamily:'open-sans-bold'
  },
  amount: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'open-sans'
  },
  comment: {
    color: 'black',
    fontSize: 16,
    fontFamily:'open-sans'
  }
});

export default ExpenseItem;
