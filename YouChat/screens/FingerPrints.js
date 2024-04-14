import React, { useEffect, useState } from 'react'
import { Switch, Text, TouchableNativeFeedback, View } from 'react-native'
import styles from '../styles/fingerprints'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GREENISH_RIPPLE } from '../utils/colors'

function FingerPrintsScreen() {

    const [fpEnabled, setFpEnabled] = useState(false)

    async function setFp() {
        setFpEnabled(async () => {

            await AsyncStorage.setItem('fpset', JSON.stringify(!fpEnabled))

            return !fpEnabled
        })
    }

    useEffect(() => {

        (async () => {
            const fpset = JSON.parse(await AsyncStorage.getItem('fpset'))
            if(fpset === null) AsyncStorage.setItem('fpset', JSON.stringify(fpEnabled))
            else setFpEnabled(fpset)
        })()

    }, [fpEnabled])

    return (
        <View style={styles.fpmain}>

            <View >

                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(GREENISH_RIPPLE)} onPress={setFp}>

                    <View style={styles.fpsub}>
                        <View style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 10, top: 0, alignSelf: 'center', }} />
                        <View style={styles.fpinter}>
                            <View style={styles.fpdesc}>
                                <Text style={styles.fptitle}>Unlock with fingerprint</Text>
                                <Text style={styles.fphint}>When enabled, you'll to use fingerprint to open YouChat. You can still answer calls if YouChat is locked.</Text>
                            </View>
                            <View style={styles.switchmain}>
                                <Switch value={fpEnabled}>

                                </Switch>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

export default FingerPrintsScreen