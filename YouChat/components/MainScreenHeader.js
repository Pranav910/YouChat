import React, { memo, useEffect, useState } from 'react'
import { Appearance, Text, TouchableNativeFeedback, View, useColorScheme } from 'react-native'
import styles from '../styles/mainscreenheaderstyle'
import { Image } from 'expo-image';
import searchsvg from "../assets/search.svg"
import cameraoutline from '../assets/cameraoutline.svg'
import { DARK_THEMED_HEADER, LIGHT_THEMED_HEADER, RIPPLE_COLOR } from '../utils/colors';

function MainScreenHeader({ navigation }) {

    const defaultTheme = useColorScheme()
    const [theme, setTheme] = useState(defaultTheme)
    const [optionsMenuDisplay, setOptionsMenuDisplay] = useState('none')
    const [optionsBackDisplay, setOptionsBackDisplay] = useState('none')
    const [optionsMenuHeight, setOptionsMenuHeight] = useState(null)

    function openMainHeaderOptions() {
        setOptionsMenuDisplay(prev => prev === 'none' ? 'block' : 'none')
        showBack()
    }

    function showBack() {
        setOptionsBackDisplay('block')
    }

    useEffect(() => {

        const getThemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
            console.log(colorScheme)
        })

        return () => getThemeSubscription.remove()

    }, [theme])

    function handleLayout(e) {

        setOptionsMenuHeight(e.nativeEvent.layout.height)
    }

    function disableSelf() {
        setOptionsBackDisplay('none')
        setOptionsMenuDisplay('none')
    }

    return (
        <View style={{ ...styles.contianer, backgroundColor: theme === 'light' ? LIGHT_THEMED_HEADER : DARK_THEMED_HEADER, zIndex: 10 }}>
            <TouchableNativeFeedback onPressIn={disableSelf} background={TouchableNativeFeedback.Ripple('transparent')}>
                <View style={{ ...styles.backview, display: `${optionsBackDisplay}` }} ></View>
            </TouchableNativeFeedback>
            <View style={styles.subcontainer}>
                <Text style={styles.mainscreenheadertitle}>YouChat</Text>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <View>
                        <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR)} onPress={() => navigation.navigate('CameraScreen')}>
                                <View style={{ padding: 10 }}>
                                    <Image source={cameraoutline} style={{ height: 20, width: 20, }} contentFit='contain' />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View>
                        <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR)} onPress={() => console.log(defaultTheme)}>
                                <View style={{ padding: 10 }}>
                                    <Image source={searchsvg} style={{ height: 15, width: 15, }} contentFit='contain' />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View style={{ overflow: 'hidden', borderRadius: 100 }}>
                        <TouchableNativeFeedback style={styles.optionsBtn} background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR, false)} onPress={openMainHeaderOptions}>
                            <View style={styles.optionsBtn}>
                                <Text style={styles.dots}></Text>
                                <Text style={styles.dots}></Text>
                                <Text style={styles.dots}></Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
            <View onLayout={handleLayout} style={{ ...styles.optionsMenu, display: `${optionsMenuDisplay}`, transform: [{ translateY: (optionsMenuHeight * 90) / 100 }] }} >
                <View style={styles.touchablemain}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR, false)} style={styles.touchables} onPress={() => {
                        navigation.navigate('SettingsScreen')
                        disableSelf()
                    }}>
                        <View style={styles.touchableview}>
                            <Text style={styles.options}>Settings</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.touchablemain}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR, false)} style={styles.touchables} onPress={() => {
                        navigation.navigate('Contacts')
                        disableSelf()
                    }}>
                        <View style={styles.touchableview}>
                            <Text style={styles.options}>Contacts</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                {/* <View style={styles.touchablemain}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('white', false)} style={styles.touchables}>
                        <View style={styles.touchableview}>
                            <Text style={styles.options}>Settings</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View> */}
            </View>
        </View>
    )
}

export default memo(MainScreenHeader)