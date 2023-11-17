import React,{useState} from "react";
import { Image, Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView } from "react-native";
import auth from '@react-native-firebase/auth'
export const ForgotPasswordScreen = ({navigation})=>{

    const [email, setEmail] = useState("");
    const handleResetPassword = ()=>{
        auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    console.log("Đã gửi email đặt lại mật khẩu! Kiểm tra hộp thư của bạn.");
                    alert("Gửi yêu cầu thành công!") ;
                })
                .catch(error => {
                    console.error('Error sending password reset email', error);
                    alert('Error sending password reset email. Please try again.');
                });
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={{fontSize:25,textAlign: "left",fontWeight: "bold",color: "black",margin:10}}>Reset your password!</Text>
                <View style={styles.item}>
                    <Image  style={{width:25, height: 25,margin: 5, padding:10, alignItems: "center", resizeMode: 'stretch' }} source={require('../assets/email1.png')}/>
                    <TextInput
                        style={{flex: 1}}
                        name="email"
                        placeholder="Enter email"
                        autoCapitalize='none' 
                        keyboardType='email-address' 
                        textContentType='emailAddress' 
                        value={email}
                        onChangeText={text=>setEmail(text)}
                        //value={values.email} 
                        //onChangeText={handleChange('email')} 
                        //onBlur={handleBlur('email')}
                    >
                    </TextInput>
                </View>
                
                <TouchableHighlight
                    style={styles.btn}
                    onPress={handleResetPassword}
                >
                    <Text style={styles.txt}>Send Reset Email</Text>
                </TouchableHighlight>
                <Text style={{color: "blue",textAlign: "center",margin: 15}} onPress={()=>navigation.navigate("Login")}>Go back to Login</Text>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    img:{
        width: 400,
        height:200,
    },
    content:{
        flex: 1,
        marginLeft: 30,
        marginTop: 40
    },
    item:{
        borderColor: "gray",
        width: "95%",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 10
    },
    btn:{
        width: "95%",
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 10,
    },
    txt:{
        textAlign: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: "white"
    }
});