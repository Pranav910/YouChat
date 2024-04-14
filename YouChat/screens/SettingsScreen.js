import React, { useEffect, useState } from 'react'
import { Appearance, Text, TouchableNativeFeedback, View, useColorScheme } from 'react-native'
import styles from '../styles/settings'
import { Image } from 'expo-image'
import privacysvg from '../assets/privacy.svg'
import defaultprofile from '../assets/defaultprofile.svg'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DARK_THEMED_BODY, RIPPLE_COLOR } from '../utils/colors'

function SettingsScreen({ navigation }) {

    const defaultTheme = useColorScheme()
    const [theme, setTheme] = useState(defaultTheme)
    const [displayProfile, setDisplayProfile] = useState(null)

    useEffect(() => {

        const getThemeSubscription = Appearance.addChangeListener(() => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        })


        return () => getThemeSubscription.remove()

    }, [theme])

    useEffect(() => {
        
        async function getProfile()
        {
            const displayProfileImage = JSON.parse(await AsyncStorage.getItem('profile'))
            
            if(displayProfileImage !== null) setDisplayProfile(displayProfileImage.displayProfile)
            else setDisplayProfile(defaultprofile)

        }

        getProfile()

    }, [])

    return (
        <View style={{ ...styles.container, backgroundColor: theme === 'dark' ? DARK_THEMED_BODY : 'white' }}>

            <View >
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR)} onPress={() => navigation.navigate('SetProfileScreen')}>
                    <View style={styles.profile}>
                        <Image source={displayProfile} style={{ height: 60, width: 60, borderRadius: 100 }} />
                        <Text style={{ color: 'white', fontSize: 18 }}>Pranav</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

            <View style={styles.privacy}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR)} onPress={() => navigation.navigate('FingerPrintsScreen')}>
                    <View style={styles.privacysub}>
                        <Image source={privacysvg} style={{ height: 25, width: 25 }} />
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <Text style={{ color: 'white', fontSize: 17, }}>Privacy</Text>
                            <Text style={{ color: '#a2aeb3', fontWeight: 400 }}>Add Finger Print </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>

        </View>
    )
}

export default SettingsScreen