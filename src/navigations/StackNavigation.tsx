import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

// import screens
import Home from 'screens/Home';
import Details from 'screens/Details';
import Search from 'screens/Search';
import Login from 'screens/Login';
import colors from 'libs/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();

const navigatorOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    color: colors.white,
    fontFamily: 'Poppins-Bold',
  },
  headerBackImage: () => (
    <Icon name="arrow-back" color={colors.white} size={25} />
  ),
};

const loginOptions: StackNavigationOptions = {
  headerShown: false,
};

const homeOptions = (navigation: any) => ({
  headerTitle: 'MOVIE APP',
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
      <Icon name="search" color={colors.white} size={25} />
    </TouchableOpacity>
  ),
  headerRightContainerStyle: {
    paddingHorizontal: 30,
  },
});

const searchOptions: StackNavigationOptions = {
  headerTitleContainerStyle: {
    width: '100%',
  },
};

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={navigatorOptions}>
      <Stack.Screen name="Login" component={Login} options={loginOptions} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => homeOptions(navigation)}
      />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Search" component={Search} options={searchOptions} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
