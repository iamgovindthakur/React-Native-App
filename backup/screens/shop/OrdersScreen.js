import React from "react";
import { Text, FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = (props) => {
  const order = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      data={order}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Order Screen",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.os === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default OrdersScreen;
