import React from "react";
import { View, Text ,Image, StyleSheet} from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const DescriptionScreen = () => {

  const { products } = useSelector((state) => state.products);
  const {value}=useSelector((state)=>state.desc);

  const descriptionData=products[value-1]

  return (
    <View >
      <Header />
      <View style={styles.main}>
      <View style={styles.descmain}>
        <Image
          source={{ uri:descriptionData.image }}
          style={{ height: 100, width: 100, marginHorizontal: "35%",marginVertical:20 }}
        />
        <Text style={{fontSize:20,textAlign:'center'}}>{descriptionData.title}</Text>
        <Text style={{fontSize:15,textAlign:'center'}}>{descriptionData.category}</Text>
          <Text style={{fontSize:15,textAlign:'center'}}>$ {descriptionData.price}</Text>
          <Text style={{fontSize:15,textAlign:'center'}}>Rating:{descriptionData.rating.rate}</Text>
          <Text style={{fontSize:15,textAlign:'center'}}>Available{descriptionData.rating.count}</Text>
        <Text style={{fontSize:15,textAlign:'center'}}>{descriptionData.description}</Text>
      </View>
      </View>
    </View>
  );
};

export default DescriptionScreen;

const styles=StyleSheet.create({
  main:{
    display:"flex",
    alignItems:'center',
    marginTop:100
  },
  descmain:{
    backgroundColor:"#F8F8FF",
    width:"90%",
    height:400,
    textAlign:'center',
    borderRadius:20
  },
})