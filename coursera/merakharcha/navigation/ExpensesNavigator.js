import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import MainScreen from '../screens/MainScreen.js';
import CreateExpense from '../screens/CreateExpense';
import Colors from '../constants/Colors';

const ExpensesNavigator = createStackNavigator(
  {
    Home: MainScreen,
    Create: CreateExpense,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(ExpensesNavigator);
