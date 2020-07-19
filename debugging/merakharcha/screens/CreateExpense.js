import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as expenseActions from "../store/actions";
import ImagePicker from "../components/ImagePicker";

const CreateExpense = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [amount, setAmount] = useState();
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitle(text);
  };
  const amountChangeHandler = (text) => {
    setAmount(text);
  };
  const commentChangeHandler = (text) => {
    setComment(text);
  };

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const saveExpenseHandler = () => {
    dispatch(expenseActions.addExpense(title, image, amount,comment));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={amountChangeHandler}
          value={amount}
        />
        <Text style={styles.label}>Any Comment</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={commentChangeHandler}
          value={comment}
        />

        <Button
          title="Save Expense"
          color={Colors.primary}
          onPress={saveExpenseHandler}
        />
      </View>
    </ScrollView>
  );
};

CreateExpense.navigationOptions = {
  headerTitle: "Add Expense",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default CreateExpense;
