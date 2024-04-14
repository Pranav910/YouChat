import React, { memo, useState } from 'react'
import { Text, View } from 'react-native'
import styles from '../styles/chat'
import rightSvg from "../assets/right-side.svg"
import { Image } from 'expo-image'
import leftSvg from '../assets/left-side.svg'

function Chat({ chat }) {

  const [chatSide, setChatSide] = useState('right')

  // #202c33

  console.log("hello from chat section")

  return (
    <View style={styles.chatmain}>
      <View style={{ ...styles.chat, transform: [{ rotateY: chatSide === 'right' ? '0deg' : "180deg" }] }}>
        <View style={{ backgroundColor: chatSide === 'right' ? '#005c4b' : '#202c33', borderRadius: 10, borderTopRightRadius: 0, display: 'flex', flexDirection: chatSide === 'right' ? 'row' : 'row-reverse', position : 'relative'}}>
          {chat.type === 'text' ? <Text style={{ ...styles.chattext, transform: [{ rotateY: chatSide === 'right' ? '0deg' : "180deg" }], textAlign: chatSide === 'right' ? 'right' : 'left' }}>{chat.inMessage}</Text> : <Image source={chat.inMessage} contentFit='contain' style={{ height: chat.height, width: chat.width, borderRadius : 10, margin : 3}} />}
          <Text style={[{ alignSelf: 'flex-end', marginRight: chatSide === "right" ? 10 : 0, color: '#ffffff99', fontSize: 12, fontWeight: 400, marginBottom: 2, transform: [{ rotateY: chatSide === 'right' ? '0deg' : "180deg" }], marginLeft: chatSide !== "right" ? 10 : 0 }, chat.type === 'image'?{position : 'absolute', right : 0, color : 'white',  bottom : 3, marginRight : 10}:{}]}>
            {chat.chatTime}
          </Text>
        </View>
        {chatSide === 'right' ? <Image source={rightSvg} style={{ height: 10, width: 10, transform: [{ translateX: -1 }] }} contentFit='contain' /> : <Image source={leftSvg} style={{ height: 10, width: 10, transform: [{ translateX: -1 }] }} contentFit='contain' />}
      </View>
    </View>
  )
}

export default React.memo(Chat)