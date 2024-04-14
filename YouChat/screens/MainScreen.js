import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Appearance, BackHandler, FlatList, Switch, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles/mainscreenstyle';
import Chats from '../components/Chats';
import MainScreenHeader from '../components/MainScreenHeader';
import { Image } from 'expo-image';
import trash from '../assets/trash.svg'
import plus from "../assets/plus.svg"
import RoomModal from '../components/RoomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

let socket

export default function MainScreen({ navigation }) {

  let chats = [{ name: 'Pranav Suryavanshi', id: 1 }, { name: 'Pranav Suryavanshi', id: 2 }, { name: 'Pranav Suryavanshi', id: 3 }, { name: 'Pranav Suryavanshi', id: 4 }, { name: 'Pranav Suryavanshi', id: 5 }, { name: 'Pranav Suryavanshi', id: 6 }, { name: 'Pranav Suryavanshi', id: 7 }, { name: 'Pranav Suryavanshi', id: 8 }, { name: 'Pranav Suryavanshi', id: 9 }, { name: 'Pranav Suryavanshi', id: 10 }]

  const defaultTheme = useColorScheme()
  const [theme, setTheme] = useState(defaultTheme)
  const [chatsSelected, setChatsSelected] = useState([])
  const [allChats, setAllChats] = useState(chats)
  const [modal, setModal] = useState(false)
  const [rippleColor, setRippleColor] = useState('#ffffff2e')
  const [test, setTest] = useState(true)


  let fadein = useRef(new Animated.Value(0)).current
  let fadeout = useRef(new Animated.Value(1)).current
  let opcity = useRef(new Animated.Value(1)).current

  // Animation functions : 
  const shrink = () => {
    Animated.timing(fadein, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start()
  }

  const grow = () => {
    Animated.timing(fadeout, {
      toValue: 0,
      timing: 200,
      useNativeDriver: true
    }).start()
  }

  const opacity = () => {
    Animated.timing(opcity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  //////////////////////////////////

  function setSelectedChats(chatID) {
    setRippleColor('transparent')
    setChatsSelected([...chatsSelected, chatID])
    shrink()
    grow()
  }


  function handleOnPress(id, name) {
    if (chatsSelected.length) {
      return setSelectedChats(id)
    }
    navigation.navigate('ChatScreen', { name })
  }

  // useEffect(() => {

  //   socket = socketio('http://192.168.9.35:8080/')

  // }, [])

  useEffect(() => {

    const getThemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    })

    const handleBackButtonPress = () => {
      if (modal) {
        showModal()
        return () => BackHandler.removeEventListener('hardwareBackPress')
      }
      setChatsSelected([])
      setRippleColor('#ffffff2e')
      if (chatsSelected.length < 1) return
      return () => BackHandler.removeEventListener('hardwareBackPress')
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress)


    return () => {
      getThemeSubscription.remove()
      backHandler.remove()
    }

  }, [theme, chatsSelected, modal])

  useEffect(() => {

    (async () => {
      const fpset = JSON.parse(await AsyncStorage.getItem('fpset'))
      if (fpset === null) return
      else console.log('fp enabled')
    })()

    setTest('bye')

  }, [])



  async function showModal() {
    setModal(!modal)
  }

  function isSelected(id) {
    return chatsSelected.includes(id)
  }

  async function deleteChats() {

    chats = chats.filter((val) => {
      if (!chatsSelected.includes(val.id)) return val
    })

    setAllChats(chats)
    setChatsSelected([])
  }

  return (
    <Animated.View style={{ ...styles.container, backgroundColor: theme === 'dark' ? '#111b21' : 'white' }}>
      <ExpoStatusBar style='light' />

      {modal && <RoomModal showModal={showModal} />}

      <View style={{ height: '100%', width: '100%', }}>
        <MainScreenHeader navigation={navigation} />

        <FlatList
          indicatorStyle='white'
          data={allChats}
          renderItem={({ item }) => <Chats id={item.id} handleOnPress={handleOnPress} handleOnLongPress={setSelectedChats} name={item.name} isSelected={isSelected(item.id)} rippleColor={rippleColor} />}
        />


        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={chatsSelected.length ? deleteChats : showModal}>
          {chatsSelected.length ? <Image source={trash} contentFit='contain' style={{ height: 20, width: 20 }} /> : <Image source={plus} contentFit='contain' style={{ height: 20, width: 20 }} />}
        </TouchableOpacity>

      </View>
    </Animated.View>
  )
}