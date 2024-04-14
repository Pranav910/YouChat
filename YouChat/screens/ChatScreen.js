import { StatusBar } from 'expo-status-bar'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Appearance, TextInput, TouchableNativeFeedback, TouchableOpacity, View, useColorScheme } from 'react-native'
import styles from '../styles/chatscreenstyle'
import ChatScreenHeader from '../components/ChatScreenHeader'
import { Image, ImageBackground } from 'expo-image'
import send from '../assets/send.svg'
import Chat from '../components/Chat'
import chatbackgrounddark from '../assets/chatbackgrounddark.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from "expo-file-system"
import { FlashList } from '@shopify/flash-list'
import paperclip from '../assets/paperclip.svg'
import camera from '../assets/camera.svg'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { PLACEHOLDER_COLOR, RIPPLE_COLOR } from '../utils/colors'

//"hello", "world", "how", "are", "you", "i", "hope", "you", "are", "doing", "quite", "well", "hows", "your", "study", "is", "going", "onn", "study", "well", "bodys"

let socket

function ChatScreen({ navigation, route }) {

    const defaultTheme = useColorScheme()
    const [theme, setTheme] = useState(defaultTheme)
    const [inMessage, setInMessage] = useState('')
    const [chats, setChats] = useState([])
    const chatsRef = useRef()
    const date = new Date()
    const { name } = route.params


    function inputMessage(msg) {
        setInMessage(msg)
    }

    async function sendMsg() {
        console.log('sendMsg')
        if (!inMessage) return
        const hours = date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours() === 0 ? (date.getHours() + 12).toString() : date.getHours().toString()

        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString()

        setChats(prev => {

            async function storeData() {
                try {
                    await AsyncStorage.setItem("chats", JSON.stringify([{ inMessage, chatTime: hours + ":" + minutes + " " + (date.getHours() > 12 ? "PM" : date.getHours() === 12 ? "PM" : "AM"), type: 'text' }, ...prev]))
                } catch (e) {
                    console.log("failed to store the chats :", e)
                }
            }

            storeData()

            return ([{ inMessage, chatTime: hours + ":" + minutes + " " + (date.getHours() > 12 ? "PM" : date.getHours() === 12 ? "PM" : "AM"), type: 'text' }, ...prev])
        })

        // setChats(prev => [{ inMessage, chatTime: hours + ":" + minutes + " " + (date.getHours() > 12 ? "PM" : date.getHours() === 12 ? "PM" : "AM"), type: 'text' }, ...prev])
        // chatsRef.current.scrollToOffset({offset : 0, animated : false})

        setInMessage('')
    }

    async function selectImages() {
        try {


            const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1
            })

            const aspectRatio = result.assets[0].width / result.assets[0].height

            const isLandscape = aspectRatio > 1

            const resizedImage = await ImageManipulator.manipulateAsync(result.assets[0].uri, [{
                resize: {
                    width: isLandscape ? 250 : 250,
                }
            }])

            console.log(resizedImage)

            let newWidth = resizedImage.width
            let newHeight = resizedImage.height
            console.log(newHeight)

            const hours = date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours() === 0 ? (date.getHours() + 12).toString() : date.getHours().toString()

            const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString()

            // if (!result.canceled) setChats(prev => [{ inMessage: result.assets[0], chatTime: hours + ":" + minutes + " " + (date.getHours() > 12 ? "PM" : date.getHours() === 12 ? "PM" : "AM"), type: 'image', height: newHeight, width: newWidth }, ...prev])

            setChats(prev => {

                async function storeData() {
                    try {
                        await AsyncStorage.setItem("chats", JSON.stringify([{ inMessage: result.assets[0], chatTime: hours + ":" + minutes + " " + (date.getHours() > 12 ? "PM" : date.getHours() === 12 ? "PM" : "AM"), type: 'image', height: newHeight, width: newWidth }, ...prev]))
                    } catch (e) {
                        console.log("failed to store the chats :", e)
                    }
                }

                storeData()

                return ([{ inMessage: result.assets[0], chatTime: hours + ":" + minutes + " " + (date.getHours() > 12 ? "PM" : date.getHours() === 12 ? "PM" : "AM"), type: 'image', height: newHeight, width: newWidth }, ...prev])
            })

            chatsRef.current.scrollToOffset({ offset: 0, animated: false })
        }
        catch (err) {
            return
        }
    }

    console.log(chats)

    useEffect(() => {

        const getThemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        })

        return () => {
            getThemeSubscription.remove()
        }

    }, [theme])

    useEffect(() => {

        async function makeDirectory() {

            await FileSystem.makeDirectoryAsync(`${FileSystem.bundleDirectory}Download/YouChat`)
            const folderInfo = await FileSystem.getInfoAsync(`${FileSystem.bundleDirectory}YouChat`)
            console.log("Folder uri", folderInfo.uri);
        }


        makeDirectory()

        // async function getitem() {
        //     const storage = await AsyncStorage.getItem("chats")
        //     if (storage === null) setChats([])
        //     else setChats(JSON.parse(await AsyncStorage.getItem("chats")))
        // }

        // async function removeitem() {
        //     try {
        //         await AsyncStorage.removeItem("chats")

        //         console.log("chats storage cleared")
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }

        // getitem()

        // return () => removeitem()

    }, [])

    const renderChats = useCallback(({ item }) => <Chat chat={item} />, [chats])


    return (
        <ImageBackground source={chatbackgrounddark} imageStyle={{ opacity: 0.06 }} style={{ ...styles.container, backgroundColor: theme === 'dark' ? '#0b141a' : 'white', height: '100%', position: 'relative' }}>
            <StatusBar style='light' />

            <ChatScreenHeader name={name} />

            <FlashList
                data={chats}
                ref={chatsRef}
                renderItem={renderChats}
                inverted
                estimatedItemSize={200}
            />

            {/* <Image source={images[0].uri} style = {{height : 50, width : 50, alignSelf : 'flex-end'}}/> */}

            <View style={styles.sendmsg}>
                <View style={styles.inputmsgmain}>
                    <TextInput
                        style={styles.inputmsg}
                        placeholder='Message'
                        placeholderTextColor={PLACEHOLDER_COLOR}
                        value={inMessage}
                        onChangeText={inputMessage}
                        numberOfLines={1}
                        multiline={true}
                    />
                    <View style={styles.msgoptions}>
                        <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR)} onPress={selectImages}>
                                <View style={{ padding: 9 }}>
                                    <Image source={paperclip} style={{ height: 22, width: 22, transform: [{ scaleX: -1 }, { rotateZ: '360deg' }] }} />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR)} onPress={() => navigation.navigate('CameraScreen')}>
                                <View style={{ padding: 9 }}>
                                    <Image source={camera} style={{ height: 22, width: 22, }} />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={sendMsg}>
                    <View style={styles.send}>
                        <View style={styles.sendsym}>
                            <Image source={send} contentFit='contain' style={{ height: 25, width: 25, transform: [{ translateX: 2 }] }} />
                        </View>
                        {!inMessage && <View style={styles.prevent} />}
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default memo(ChatScreen)