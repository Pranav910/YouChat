import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    chatmain: {
        width: '100%',
        margin: 2,
    },
    chat: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent : 'flex-end',
        alignItems: 'flex-start',
        paddingRight: 10,
        paddingLeft: 10,
        // width : 'auto'
    },
    chattext: {
        // backgroundColor: '#37373a',
        padding: 5,
        paddingLeft : 10,
        paddingRight : 10,
        // borderRadius: 10,
        color: 'white',
        margin : 0,
        maxWidth : 200,
    },
})