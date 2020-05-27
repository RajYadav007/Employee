import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants'
import Home from './screens/Home'
import Createemployee from './screens/Createemployee'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers/reducer'

const store =createStore(reducer)

const Stack=createStackNavigator();

const myoptions =
{
  headerTintColor:"white",
  headerStyle:{backgroundColor:"#5993b5"}
}
 function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator >
      <Stack.Screen
       name="Home"
        component={Home}
        options={{...myoptions,title:"Home"}}
         />
      <Stack.Screen 
      name="Create"
       component={Createemployee} 
       options={{...myoptions,title:"Create Employee"}}
       />
      <Stack.Screen
       name="Profile"
        component={Profile}
        options={{...myoptions,title:"Profile"}}
        />
      </Stack.Navigator>
    </View>
  );
}

export default ()=>
{
  return(
    <Provider store={store}>
    <NavigationContainer>
     <App/>
    </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
       },
});
