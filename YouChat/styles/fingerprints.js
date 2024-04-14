import { StyleSheet } from "react-native";
import { DARK_THEMED_BODY, HINT_COLOR } from "../utils/colors";

export default styles = StyleSheet.create({
    fpmain: {
        height: '100%',
        backgroundColor: DARK_THEMED_BODY
    },
    fpsub: {
        height: 'auto',
        borderBottomColor: '#ffffff12',
        borderBottomWidth: 0.5,
        width : '100%',
    },
    fpdesc: {
        display: 'flex',
        flexDirection: 'column',
        
    },
    fphint: {
        color: HINT_COLOR,
    },
    fptitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    switchmain: {
        paddingLeft: 20,
        zIndex : -1
    },
    fpinter: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: -1,
        paddingLeft : 50,
        paddingRight : 50,
        width : '100%',
        padding : 20
    }
})