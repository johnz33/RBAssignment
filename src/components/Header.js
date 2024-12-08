import React from 'react'
import { StyleSheet, View,Text, Pressable,Image } from 'react-native'
import { Colors } from '../assests/colors'
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect,useState } from 'react';
import { onAuthStateChanged,signOut,getAuth } from 'firebase/auth';
import { app } from '../pages/LoginScreen';
import { useNavigation } from '@react-navigation/native';

const Header = ({value}) => {

  const [user,setUser]=useState(null)  //track user authentication state
  const auth=getAuth(app);
  const navigation=useNavigation();

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })

    return ()=>unsubscribe();
  },[auth]);

  const handlelogOut =async()=>{
    console.log("user logged out successfully")
    await signOut(auth);
    navigation.navigate("Login")
  }

  return (
    <View style={styles.headermain}>
       <View style={styles.header}>
       <Image source={require("../assests/images/paper.png")} style={{height:30,width:30,tintColor:"white",marginLeft:10}}/>
        <Text style={styles.title}>
          RBassign<Text style={styles.titlesub}>ment...</Text>
        </Text>
       </View>
       <View>
       <Pressable onPress={handlelogOut}>
       <Text style={{fontSize:18,paddingRight:5}}>LogOut</Text>
       </Pressable>
       </View>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headermain:{
          backgroundColor:Colors.primary,
          height:60,
          display:"flex",
          flexDirection:'row',
          alignItems:'center',
          justifyContent:"space-between"
    },
    header:{
        display:"flex",
        flexDirection:'row',
        alignItems:'center'
    },
    title: {
        color: "white",
        textAlign: "center",
        paddingLeft:10,
        fontSize: 30
      },
      titlesub: {
        color: "black",
      }
})