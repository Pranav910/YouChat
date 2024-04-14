import React, { useEffect, useState } from 'react'
import { Button, View } from 'react-native'
import * as Contacts from "expo-contacts"
import * as SMS from "expo-sms"
import styles from '../styles/contactsscreenstyles'
import {FlashList} from "@shopify/flash-list"
import Contact from '../components/Contact'
import { useCallback } from 'react/cjs/react.development'

function ContactsScreen({navigation}) {

    const [contact, setContact] = useState(null)

    useEffect(() => {

        async function getContacts() {
            try {
                const { status } = await Contacts.requestPermissionsAsync()

                if (status !== 'granted') {
                    console.log('CONTACTS PERMISSION DENIED');
                    return
                } else {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
                    })

                    const contactNames = data.map(contact => contact.name)

                    setContact(contactNames)
                    // console.log(contactNames)
                }

            } catch (error) {
                console.log(error);
            }
        }

        getContacts()

    }, [])

    const renderChats = useCallback(({ item }) => <Contact navigation = {navigation} name={item} />, [contact])

    return (
        <View style = {styles.main}>
            <FlashList
                data={contact}
                renderItem={renderChats}
                estimatedItemSize={100}
            />
        </View>
    )
}

export default React.memo(ContactsScreen)