import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from "../styles/roommodal"
import { BlurView } from "expo-blur"
import { CUSTOM_GREEN, PLACEHOLDER_COLOR } from '../utils/colors'

function RoomModal({ showModal }) {

    const [modalDisplay, setModalDisplay] = useState(true)
    const scale = useRef(new Animated.Value(0.8)).current

    function cancelJoin() {
        showModal()
    }

    const grow = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start()
    }

    const shrink = () => {
        Animated.timing(scale, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {

        grow()

        return () => shrink()

    }, [])

    return (
        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={20} blurReductionFactor={20} style={{ ...styles.modalmain, display: modalDisplay ? 'flex' : 'none' }} onStartShouldSetResponder={() => true} onResponderRelease={() => cancelJoin()} >

            <Animated.View style={[styles.dialog, { transform: [{ scale: scale }] }]} >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 500, }}>Join Room</Text>
                <TextInput style={styles.inputcode} placeholder='Enter Room Code' placeholderTextColor={PLACEHOLDER_COLOR} />
                <View style={{ display: 'flex', flexDirection: 'row', gap: 15, marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => cancelJoin()}><Text style={{ color: CUSTOM_GREEN, fontWeight: 700 }}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}><Text style={{ color: CUSTOM_GREEN, fontWeight: 700 }}>Create Room</Text></TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: CUSTOM_GREEN, padding: 7, borderRadius: 50, paddingLeft: 10, paddingRight: 10 }}><Text style={{ color: 'black', fontWeight: 700 }}>Join</Text></TouchableOpacity>
                </View>
            </Animated.View>

        </BlurView >
    )
}

export default memo(RoomModal)