import { StyleSheet } from "react-native";
import { DARK_THEMED_HEADER } from "../utils/colors";

export default styles = StyleSheet.create({
    container: {
        // backgroundColor: '#699659',
        backgroundColor : DARK_THEMED_HEADER,
        height: 120,
        marginBottom : 10,
        // maxHeight : '14%',
        elevation : 10,
        zIndex : 100
    },
    backprofile : {
        display :'flex',
        flexDirection : 'row',
        alignItems : 'center',
        gap : 5,
        height : 'auto',
        padding : 5
    },
    subcontainer : {
        position : 'absolute',
        bottom : 0,
        paddingBottom : 10,
        paddingLeft : 10,
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        width : '100%',
        paddingRight : 10
    },
    backprofilemain : {
        overflow : 'hidden',
        height : 'auto',
        borderRadius : 50,
    },
    options: {
        height: 3.5,
        width: 3.5,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    optionsBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent : 'center',
        alignItems : 'center',
        gap: 2,
        borderRadius : 100,
        width : 20,
        height : 20,
        padding : 15,
    }
})