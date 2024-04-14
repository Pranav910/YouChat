import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { Appearance, Text, TouchableNativeFeedback, View, useColorScheme } from 'react-native'
import profile from '../assets/profile.svg'

function Chats({ handleOnPress, name, handleOnLongPress, id, isSelected, rippleColor }) {

    const defaultTheme = useColorScheme()
    const [theme, setTheme] = useState(defaultTheme)
    const [chatBackGroundColor, setChatBackGroundColor] = useState('transparent')
    const [chatSelected, setChatSelected] = useState(false)


    async function selectChatOnLongPress() {

        setChatBackGroundColor('transparent')
        setChatSelected(true)
        handleOnLongPress(id)
    }

    function handleOnPressOut() {
        setChatBackGroundColor('transparent')
    }

    function checkStillClick() {
        // setChatBackGroundColor('#ffffff2e')
    }


    useEffect(() => {


        const getThemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        })

        return () => {
            getThemeSubscription.remove()
        }

    }, [theme])

    // background={TouchableNativeFeedback.Ripple(theme === 'dark' ? '#ffffff2e' : '#7470702e', false)}

    return (
        <View style={{ backgroundColor: `${chatBackGroundColor}` }}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(rippleColor)} delayPressIn={70} onPressOut={handleOnPressOut} onPressIn={checkStillClick} onPress={() => handleOnPress(id, name)} delayLongPress={350} onLongPress={() => selectChatOnLongPress()}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, position: 'realative', padding: 15, width: '100%' }} >
                    <Image source={profile} style={{ height: 50, width: 50 }} contentFit='contain' />
                    <View>
                        <Text style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: '600', fontSize: 17 }}>{name} (You)</Text>
                        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>this is message...</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
            {isSelected && <View style={{ position: 'absolute', top: 0, bottom: 0, backgroundColor: '#ffffff0e', width: '100%', height: '100%' }} />}
        </View>
    )
}

export default Chats