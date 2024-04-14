import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, Text, View, useColorScheme } from 'react-native';
import MainScreen from './screens/MainScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import CameraScreen from './screens/CameraScreen';
import FingerPrintsScreen from './screens/FingerPrints';
import { setBackgroundColorAsync } from 'expo-system-ui';
import SetProfileScreen from './screens/SetProfileScreen';
import ContactsScreen from './screens/ContactsScreen';
import { DARK_THEMED_HEADER } from './utils/colors';

export default function App() {

  const defaultTheme = useColorScheme()
  const [theme, setTheme] = useState(defaultTheme)

  const NavigationStack = createNativeStackNavigator()

  useEffect(() => {

    const getThemeSubscription = Appearance.addChangeListener(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    })

    return () => getThemeSubscription.remove()

  }, [])



  return (
    <NavigationContainer theme={DarkTheme} screenOptions = {setBackgroundColorAsync('#181818')}>
      <NavigationStack.Navigator initialRouteName='MainScreen'>
        <NavigationStack.Screen name='MainScreen' component={MainScreen} options={{headerShown : false}}/>
        <NavigationStack.Screen name='ChatScreen' component={ChatScreen} options={{headerShown : false}}/>
        <NavigationStack.Screen name='SettingsScreen' component={SettingsScreen} options={{headerStyle : {backgroundColor : theme === 'light' ? '#699659' : '#202c33'}, headerTitle : "Settings"}}/>
        <NavigationStack.Screen name='CameraScreen' component={CameraScreen} options={{headerStyle : {backgroundColor : theme === 'light' ? '#699659' : '#202c33'}}}/>
        <NavigationStack.Screen name='FingerPrintsScreen' component={FingerPrintsScreen} options={{headerStyle : {backgroundColor : theme === 'light' ? '#699659' : '#202c33'}, headerTitle : "Privacy"}}/>
        <NavigationStack.Screen name='SetProfileScreen' component={SetProfileScreen} options={{headerTitle : "Profile", headerStyle : {backgroundColor : theme === 'light' ? '#699659' : '#202c33'}}}/>
        <NavigationStack.Screen name='Contacts' component={ContactsScreen} options={{headerStyle : {backgroundColor : DARK_THEMED_HEADER}}}/>
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
}
