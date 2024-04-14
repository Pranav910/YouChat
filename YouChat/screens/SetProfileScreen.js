import React, { useEffect, useState } from 'react'
import { TextInput, TouchableNativeFeedback, View } from 'react-native'
import styles from "../styles/setprofilescreen"
import { Image } from 'expo-image'
import profileimg from "../assets/profile.svg"
import * as ImagePicker from "expo-image-picker"
import camerablack from "../assets/camerablack.svg"
import AsyncStorage from "@react-native-async-storage/async-storage"
import nameprofile from "../assets/nameprofile.svg"
import about from "../assets/about.svg"
import { PLACEHOLDER_COLOR } from '../utils/colors'

function SetProfileScreen() {

    const [profile, setProfile] = useState({
        displayProfile: null,
        name: null,
        about: null
    })

    async function pickProfile() {
        let displayProfile = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        })

        if (!displayProfile.canceled) {
            await AsyncStorage.setItem('profile', JSON.stringify(
                {
                    ...profile,
                    displayProfile: displayProfile.assets[0].uri
                }
            ))

            setProfile(prev => {
                return (
                    {
                        ...prev,
                        displayProfile: displayProfile.assets[0].uri
                    }
                )
            })
        }
    }

    async function setName(name) {
        setProfile(prev => { return { ...prev, name } })
    }

    useEffect(() => {

        async function getProfile() {

                const profile = JSON.parse(await AsyncStorage.getItem('profile'))
    
                if (profile === null) setProfile({
                    displayProfile: null,
                    name: null,
                    about: null
                })
                else setProfile(profile)
        }

        getProfile()

    }, [])

    return (
        <View style={styles.main}>

            <View style={styles.profileopts}>
                <View style={styles.setProfile}>
                    <TouchableNativeFeedback onPress={pickProfile} background={TouchableNativeFeedback.Ripple('transparent')}>
                        <View style={{ borderRadius: 100 }}>
                            <Image source={profile.displayProfile ? profile.displayProfile : profileimg} contentFit='cover' style={{ height: 200, width: 200, borderRadius: 100 }} />
                            <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#00a884', borderRadius: 100 }}>
                                <Image source={camerablack} style={{ height: 20, width: 20, margin: 10 }} />
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={[styles.setname, styles.container]}>
                    <View>
                        <Image source={nameprofile} style={{ height: 20, width: 20 }} />
                    </View>
                    <View>
                        <TextInput
                            style={[styles.input]}
                            placeholder='Name'
                            placeholderTextColor={PLACEHOLDER_COLOR}
                            value={profile.name}
                            onChangeText={setName}
                        />
                    </View>
                </View>
                <View style={[styles.line]}></View>
                <View style={[styles.container]}>
                    <View >
                        <Image source={about} style={{ height: 20, width: 20 }} />
                    </View>
                    <View>
                        <TextInput
                            style={[styles.input]}
                            placeholder='About'
                            placeholderTextColor={PLACEHOLDER_COLOR}
                        />
                    </View>
                </View>
            </View>

        </View>
    )
}

export default SetProfileScreen