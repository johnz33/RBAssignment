import React from "react";
import { View,Text,Pressable, FlatList } from "react-native";
import { Colors } from "../assests/colors";


const FilterType=({array,setArray})=>{

    
    return(
        <View>
        <Text style={{ fontSize: 30, paddingLeft: 10, marginTop: 20 }}>
          Category
        </Text>
        <View style={{ marginLeft: 20, marginTop: 20,width:150 }}>
              {array.map((value)=>{
                return(<View key={value.id}>
                  <Pressable onPress={()=>{
                        let newArr=array.map((item)=>item.id === value.id ? { ...item, isSelected: true } : { ...item, isSelected: false })
                        setArray(newArr)
                      }} style={{backgroundColor:value.isSelected?"grey":"white",marginBottom:5,borderRadius:5}}>
                    <Text style={{ fontSize: 20, width: 150, height: 30 }}>
                      {value.item}
                    </Text>
                  </Pressable>
                </View>)
              })}
           
        </View>
      </View>
    )
}

export default FilterType;