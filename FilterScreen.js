import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../assests/colors";
import FilterType from "../components/FiterTypes";
import { filterData } from "../redux/searchDataSlice";
import { useNavigation } from "@react-navigation/native";

const FilterPage = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch=useDispatch();
  const navigation=useNavigation();

  const [category,setCategory] = useState([
    { id:"1",item: "men's clothing", isSelected: false },
    { id:"2",item: "jewelery", isSelected: false },
    { id:"3",item: "electronics", isSelected: false },
    { id:"4",item: "women's clothing", isSelected: false },
  ]);
  const [price,setPrice] = useState([
    { id:"1",item: "upto $50", isSelected: false },
    { id:"2",item: "$50 to $100", isSelected: false },
    { id:"3",item: "Above $100", isSelected: false },
  ]);
  const [rating,setRating] = useState([
    { id:"1",item: "below 3", isSelected: false },
    { id:"2",item: "3 to 4", isSelected: false },
    { id:"3",item: "4 to 5", isSelected: false },
  ]);

  const [categoryValue,setCategoryValue]=useState("");

  useEffect(()=>{
    for(let value of category ){
      if(value.isSelected===true){
        setCategoryValue(value.item)
      }
    }
  },[category])

  const [priceValue,setPriceValue]=useState("");

  useEffect(()=>{
    for(let value of price ){
      if(value.isSelected===true){
        setPriceValue(value.item)
      }
    }
  },[price])

  const [ratingValue,setRatingValue]=useState("");

  useEffect(()=>{
    for(let value of rating ){
      if(value.isSelected===true){
        setRatingValue(value.item)
      }
    }
  },[rating])

  let filterValues=[]

  let categoryArrays=products.filter((item)=>item?.category.toLowerCase().includes(categoryValue.toLowerCase()))

  let priceArrays=products.filter((item)=>{
    let num=Math.round(Number(item.price))
    if(priceValue == "upto $50" && num <= 50  )
    {
      return true
    }
    else if(priceValue == "$50 to $100" && num>50 && num<=100  )
      {
        return true
      }
    else if(priceValue == "Above $100" && num>100){
      return true
    }
    return false
  })
  let ratingArrays=products.filter((item)=>{
    let num=Number(item.rating.rate)
  
    if(ratingValue == "below 3" && num <= 3  )
    {
      return true
    }
    else if(ratingValue == "3 to 4" && num>3 && num<=4  )
      {
        return true
      }
    else if(ratingValue == "4 to 5" && num>=5){
      return true
    }
    return false
  })

  const saveFunction=()=>{
    Array.prototype.push.apply(categoryArrays,priceArrays,ratingArrays);
    dispatch(filterData(categoryArrays));
    navigation.navigate("Home");

  }
  

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 40, paddingLeft: 10, marginTop: 20 }}>
          Filters
        </Text>
        <Entypo
          name="cross"
          size={35}
          color="black"
          style={{ marginRight: 15, marginTop: 20 }}
          onPress={()=> navigation.navigate("Home")}
        />
      </View>
      <View>
        <FilterType array={category} setArray={setCategory} />
        <FilterType array={price} setArray={setPrice}/>
        <FilterType array={rating} setArray={setRating}/>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              marginLeft: 40,
              marginTop: 20,
              height: 45,
              width: 80,
              backgroundColor: Colors.primary,
              borderRadius: 10,
              borderWidth: 0.5,
            }}
            onPress={()=>{    
              saveFunction()
            }}
          >
            <Text style={{ fontSize: 30, textAlign: "center" }}>Save</Text>
          </Pressable>
          <Pressable
            style={{
              marginRight: 40,
              marginTop: 20,
              height: 45,
              width: 90,
              borderRadius: 10,
              borderWidth: 0.5,
            }}
            onPress={()=> navigation.navigate("Home")}
          >
            <Text style={{ fontSize: 30, textAlign: "center" }}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default FilterPage;
