import React,{useState} from "react";
import { Image, Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView } from "react-native";
import auth from '@react-native-firebase/auth'
export const SignupScreen= ({navigation})=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowConfirmPassword] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [confirmpasswordError, setConfirmPasswordError] = useState("");
    const handleSignup = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.trim() || !password.trim() || !confirmpassword.trim()) {
        alert("Vui lòng nhập thông tin!")
        return; // Dừng quá trình đăng ký nếu có trường trống
    } 
    else{
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Đăng ký thành công:", user.email);
            // You can perform additional actions after successful registration
            //navigation.navigate("Login");
        })
        .catch(() => {
            if (!emailRegex.test(email)) {
                setEmailError("Email không đúng định dạng");
                //return; // Dừng quá trình đăng ký nếu có lỗi email
            } else {
                setEmailError("");
            }
            if (password.length < 6) {
                setPasswordError("Mật khẩu phải ít nhất 6 ký tự");
            } else {
                setPasswordError("");
            }
        });
    }
    if(confirmpassword !== password){
        setConfirmPasswordError("Mật khẩu không khớp");
    }
    else{
        setConfirmPasswordError("");
    }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.logo} >
                <Image style={styles.img} source={require('../assets/fire.jpg')}/>
                <Text style={{fontSize:25,textAlign: "center",fontWeight: "bold",color: "black"}}>Create a new account!</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.item}>
                    <Image  style={{width:25, height: 25,margin: 5, padding:10, alignItems: "center", resizeMode: 'stretch' }} source={require('../assets/email1.png')}/>
                    <TextInput
                        style={{flex: 1}}
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChangeText={text=>setEmail(text)}
                    >
                    </TextInput>
                </View>
                {emailError ? (
                    <Text style={{ color: "red", marginLeft: 10 }}>{emailError}</Text>
                ) : null}
                <View style={styles.item}>
                    <Image  style={{width:25, height: 25,margin: 5, padding:10, alignItems: "center", resizeMode: 'stretch' }} source={require('../assets/key.png')}/>
                    <TextInput
                        style={{flex: 1}}
                        name="password"
                        placeholder="Enter password"
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
                {passwordError ? (
                    <Text style={{ color: "red", marginLeft: 10 }}>{passwordError}</Text>
                ) : null}

                <View style={styles.item}>
                    <Image  style={{width:25, height: 25,margin: 5, padding:10, alignItems: "center", resizeMode: 'stretch' }} source={require('../assets/key.png')}/>
                    <TextInput
                        style={{flex: 1}}
                        name="password"
                        placeholder="Enter password"
                        value={confirmpassword}
                        onChangeText={text=>setConfirmPassword(text)}
                        secureTextEntry ={!showconfirmPassword}
                    >
                    </TextInput>
                    <TouchableHighlight
                        onPress={() => setShowConfirmPassword(!showconfirmPassword)}
                    >
                        <Image style={{ width: 25, height: 25, margin: 5, padding: 10, alignItems: "center", resizeMode: "stretch",marginRight: 20 }}
                            source={showconfirmPassword ? require("../assets/eye1.png") : require("../assets/eye.png")}
                        />
                    </TouchableHighlight>
                </View>
                {confirmpasswordError ? (
                    <Text style={{ color: "red", marginLeft: 10 }}>{confirmpasswordError}</Text>
                ) : null}
                <TouchableHighlight
                    style={styles.btn}
                    onPress={handleSignup}
                >
                    <Text style={styles.txt}>Signup</Text>
                </TouchableHighlight>
                <Text style={{color: "blue",textAlign: "center",margin: 15}} onPress={()=>navigation.navigate("Login")}>Already have an account?</Text>
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