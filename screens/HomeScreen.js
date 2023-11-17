import  React  from  'react';
import  {  View,  StyleSheet,  TouchableOpacity, Text  }  from  'react-native'; 
import  auth  from  '@react-native-firebase/auth';
export const HomeScreen = ({navigation}) => {
    const  handleLogout  =  ()  =>  {
        auth()
        .signOut()
        .then(()=>{
            navigation.replace("Login")
        })
        .catch(error  =>  alert(error.message));
    };
    return (
        <View  style={styles.container}>
            <Text style={{marginBottom:20}}>Email: {auth().currentUser?.email}</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={handleLogout}
            >
                <Text style={styles.btntext}>Sing Out</Text>
            </TouchableOpacity>
        </View>
    );
};
        
const  styles  =  StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn:{
        backgroundColor:"green",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        
    },
    btntext:{
        color: 'white',
        fontWeight:'bold',
        fontSize: 16,
    }
});
        