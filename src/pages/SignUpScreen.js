import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { View,Text, ScrollView, SafeAreaView, TextInput, Pressable,StyleSheet,Image} from 'react-native'
import { Colors } from '../assests/colors';

const firebaseConfig = {
  apiKey: "AIzaSyBD3lxiCA-oxYyrcSWJEmMgO9zTlGsNZI4",
  authDomain: "ecom-f1503.firebaseapp.com",
  databaseURL: "https://ecom-f1503-default-rtdb.firebaseio.com",
  projectId: "ecom-f1503",
  storageBucket: "ecom-f1503.firebasestorage.app",
  messagingSenderId: "893064240316",
  appId: "1:893064240316:web:2e0fecefe0baec1eab44b9",
  measurementId: "G-NC6P6M2Y67"
};

const app=initializeApp(firebaseConfig);

export {app};


const AuthScreen = ({email,setEmail,password,setPassword,confirmPassword,setConfirmPassword,passwordMatch,setIsLogin,handleAuthentication}) => {

  return (
    <SafeAreaView>
      <View style={styles.authmain}>
        <Text style={styles.title}>
          RBassign<Text style={styles.titlesub}>ment...</Text>
        </Text>
        <Text style={styles.login}>Sign Up</Text>
        <TextInput
          value={email}
          placeholder="please enter email ..."
          style={styles.email}
          onChangeText={setEmail}
        />
        <TextInput
          value={password}
          placeholder="please enter password...."
          style={styles.password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

       {passwordMatch &&   <View style={{marginBottom:-10}}><Text style={{color:Colors?.primary}}>Password does not match</Text></View>}
       
        <TextInput
          value={confirmPassword}
          placeholder="Confirm password...."
          style={styles.password}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
        <Pressable style={styles.button} onPress={handleAuthentication}>
          <Text style={{ color: "white" }}>Sign Up</Text>
        </Pressable>
        <View>
          <Text onPress={()=>setIsLogin(!isLogin)} style={{paddingTop:10}}>
            
          </Text>
        </View>
        <Image source={require("../assests/images/paper.png")} style={{height:80,width:80,marginTop:90,tintColor:Colors.primary,marginLeft:20}}/>

      </View>
    </SafeAreaView>
  );
};

const SignUpScreen = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [user,setUser]=useState(null)  //track user authentication state
  const [passwordMatch,setPasswordMatch]=useState(false)
  const navigation=useNavigation();
  const auth=getAuth(app);
  const userDetails={password:password,confirmPassword:confirmPassword}

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })

    return ()=>unsubscribe();
  },[auth]);

  const handleAuthentication = async()=>{
    try{
        if(userDetails?.password !== userDetails?.confirmPassword ){
           return setPasswordMatch(true)
        }
        else{
          await createUserWithEmailAndPassword(auth,email,password);
          console.log("user created successfully");
          navigation.navigate("Login")
        }
 
    } catch(error){
      console.log("Authentication Error",error.message)
    }
  }
  
  return (
    <ScrollView>
      <AuthScreen 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      passwordMatch={passwordMatch}
      setIsLogin={setPasswordMatch}
      handleAuthentication={handleAuthentication}/>
    </ScrollView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  authmain: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: Colors?.primary,
    textAlign: "center",
    fontSize: 40,
    marginTop: 80,
  },
  titlesub: {
    color: "black",
  },
  login: {
    fontSize: 20,
    marginTop: 60,
  },
  email: {
    width: 200,
    borderWidth: 1.5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 5,
    borderColor: Colors?.primary,
  },
  password: {
    width: 200,
    borderWidth: 1.5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
    borderColor: Colors?.primary,
  },
  button: {
    backgroundColor: Colors?.primary,
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
  },
});