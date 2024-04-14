import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import profile from "../assets/profile.svg"
import styles from "../styles/contact"
import { RIPPLE_COLOR } from '../utils/colors'

function Contact({ name, navigation }) {
    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate('ChatScreen', { name })} background={TouchableNativeFeedback.Ripple(RIPPLE_COLOR)}>
            <View style={styles.main}>
                <View>
                    <Image source={profile} style={{ height: 50, width: 50 }} />
                </View>
                <View>
                    <Text style={{ color: 'white' }}>{name}</Text>
                </View>

            </View>
        </TouchableNativeFeedback>
    )
}

export default Contact