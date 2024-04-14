import React, { memo, useEffect, useState } from 'react'
import { Appearance, Text, TouchableNativeFeedback, View, useColorScheme } from 'react-native'
import styles from '../styles/chatscreenheader'
import backBtn from '../assets/back.svg'
import { Image } from 'expo-image'
import profile from '../assets/profile.svg'
import { useNavigation } from '@react-navigation/native'
import { DARK_THEMED_HEADER, LIGHT_THEMED_HEADER, RIPPLE_COLOR } from '../utils/colors'

function ChatScreenHeader({name}) {

    const defaultTheme = useColorScheme()
    const [theme, setTheme] = useState(defaultTheme)
    const navigation = useNavigation()

    useEffect(() => {

        const getThemeSubscription = Appearance.addChangeListener(() => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        })

        return () => getThemeSubscription.remove()

    }, [theme])

    

    return (
        <View style={{ ...styles.container, backgroundColor: theme === 'dark' ? DARK_THEMED_HEADER : LIGHT_THEMED_HEADER }}>
            <View style={styles.subcontainer}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.backprofilemain}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR, false)} onPress={() => navigation.goBack()}>
                            <View style={styles.backprofile}>
                                <Image source={backBtn} contentFit='contain' style={{ height: 20, width: 20, overlayColor: 'white' }} />
                                <Image source={profile} style={{ height: 35, width: 35 }} contentFit='contain' />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '400', marginLeft: 3 }}>{name}</Text>
                </View>
                <View>
                    <View style={{ overflow: 'hidden', borderRadius: 100 }}>
                        <TouchableNativeFeedback style={styles.optionsBtn} background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR, false, 500)} >
                            <View style={styles.optionsBtn}>
                                <Text style={styles.options}></Text>
                                <Text style={styles.options}></Text>
                                <Text style={styles.options}></Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default memo(ChatScreenHeader)