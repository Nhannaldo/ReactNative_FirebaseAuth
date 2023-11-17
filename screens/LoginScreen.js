import React,{useEffect, useState} from "react";
import { Image, Text, View, StyleSheet, TextInput, TouchableHighlight,ScrollView } from "react-native";
import auth from '@react-native-firebase/auth'
export const LoginScreen = ({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    //const [passwordError, setPasswordError] = useState("");

    useEffect(()=>{
        const unsubscribe = auth().onAuthStateChanged(user=>{
            if(user){
                navigation.replace("Home");
            }
        })
        return unsubscribe
    },[])
    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            alert("Vui lòng nhập thông tin!")
            return; // Dừng quá trình đăng ký nếu có trường trống
        } 
        else{
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log("Đăng nhập thành công!")
                    // You can perform additional actions after successful login
                    //navigation.navigate("Home");
                })
                .catch(error => {
                    // Handle login errors
                    alert("Tài khoản không đúng. Vui lòng nhập lại!");
                });
        }
        };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.logo} >
                <Image style={styles.img} source={require('../assets/fire.jpg')}/>
                <Text style={{fontSize:25,textAlign: "center",fontWeight: "bold",color: "black"}}>Welcome back!</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.item}>
                    <Image  style={{width:25, height: 25,margin: 5, padding:10, alignItems: "center", resizeMode: 'stretch' }} source={require('../assets/email1.png')}/>
                    <TextInput
                        style={{flex: 1}}
                        name="email"
                        placeholder="Enter email"
                        autoCapitalize='none' 
                        textContentType='emailAddress' 
                        value={email}
                        onChangeText={text=>setEmail(text)} 
                    >
                    </TextInput>
                </View>
                
                <View style={styles.item}>
                    <Image  style={{width:25, height: 25,margin: 5, padding:10, alignItems: "center", resizeMode: 'stretch' }} source={require('../assets/key.png')}/>
                    <TextInput
                        style={{flex: 1}}
                        name="password"
                        placeholder="Enter password"
                        autoCapitalize='none' 
                        textContentType='password' 
                        value={password}
                        onChangeText={text=>setPassword(text)}
                        secureTextEntry ={!showPassword}
                    >
                    </TextInput>
                    <TouchableHighlight
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image style={{ width: 25, height: 25, margin: 5, padding: 10, alignItems: "center", resizeMode: "stretch",marginRight: 20 }}
                            source={showPassword ? require("../assets/eye1.png") : require("../assets/eye.png")}
                        />
                    </TouchableHighlight>
                </View>
                
                <TouchableHighlight
                    style={styles.btn}
                    onPress={handleLogin}
                >
                    <Text style={styles.txt}>Login</Text>
                </TouchableHighlight>
                <Text style={{color: "blue",textAlign: "center",margin: 15}} onPress={()=>navigation.navigate("Signup")}>Create a new account?</Text>
                <Text style={{color: "blue",textAlign: "center"}} onPress={()=>navigation.navigate("Forgot")}>Forgot Password</Text>
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    logo:{
        flex: 1,
        marginBottom: 10
    },
    img:{
        width: 400,
        height:200,
    },
    content:{
        flex: 2,
        marginLeft: 30
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