import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import ExpenseItem from "../components/ExpenseItem";
import * as expenseActions from "../store/actions";

const MainScreen = (props) => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(expenseActions.loadExpenses());
  }, [dispatch]);

  if (expenses.length === 0 || !expenses) {
    return (
      <View style={styles.content}>
        <Text>No Expense found. Start adding some!</Text>
      </View>
    );
  }

  return (
    // <FlatList
    //   data={places}
    //   keyExtractor={(item) => item.id}
    //   renderItem={(itemData) => (
    //     <ExpenseItem
    //       image={itemData.item.imageUri}
    //       title={itemData.item.title}
    //       amount={itemData.item.amount}
    //       comment={itemData.item.comment}
    //       onSelect={() => {
    //         props.navigation.navigate("PlaceDetail", {
    //           placeTitle: itemData.item.title,
    //           placeId: itemData.item.id,
    //         });
    //       }}
    //     />
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ExpenseItem
          time={itemData.item.readableDate}
          image={itemData.item.imageUri}
          title={itemData.item.title}
          amount={itemData.item.amount}
          comment={itemData.item.comment}
        />
      )}
    />
  );
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Mera khata",
    headerTitleAlign:'center',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Expense"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("Create");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
