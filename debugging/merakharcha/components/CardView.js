import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardView = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 30,
    backgroundColor: 'white',
    flex:1,
    marginVertical:10
    
  }
});

export default CardView;
