import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import {
  Pressable,
  TextInput,
  StyleSheet,
  StatusBar,
  FlatList,
  Modal
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import { fetchProducts } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import { Colors } from "../assests/colors";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { descData } from "../redux/descriptionDataSlice";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [flatLoader, setFlatLoader] = useState(false);
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const { products } = useSelector((state) => state.products);
  const {list} =useSelector((state)=>state.searchData);
  const {value}=useSelector((state)=>state.desc)
  const [ searchValue,setSearchValue]=useState("");
  const [dataList,setDataList]=useState(data);
  let filteredData=[]

  useEffect(() => {
    dispatch(fetchProducts());
  }, [products]);

  useEffect(()=>{
   if(loadMore===true){
      setDataList(data?.slice(0,10))
     }
     else
      setDataList(data)
  },[data,loadMore])


  useEffect(() => {
    setData(products)
    setTimeout(() => setLoader(false), 3000);
  }, [loader]);

  const searchFunction=()=>{
     filteredData=data.filter((item)=>item?.title.toLowerCase().includes(searchValue.toLowerCase()))
     setDataList(filteredData)
  }


  return (
    <View>
      {loader ? (
        <View style={styles.loader}>
          <ActivityIndicator size={100} color={Colors?.primary} />
        </View>
      ) : (
        <SafeAreaView>
          <View style={{ height: "100%" }}>
            <Header />
            <StatusBar barStyle="light-content" />
            <View>
              <View style={styles.homescreensearch}>
                <TextInput
                  placeholder="Enter the Title ..."
                  style={styles.homescreeninput}
                  value={searchValue}
                  onChangeText={setSearchValue}
                />
                <Pressable>
                  <AntDesign
                    name="search1"
                    size={34}
                    style={{ marginLeft: 10 }}
                    color="black"
                    onPress={searchFunction}
                  />
                </Pressable>
                <Pressable>
                  <Ionicons
                    name="filter-outline"
                    size={30}
                    style={{ marginLeft: 30 }}
                    color="black"
                    onPress={()=>navigation.navigate("Filter")}
                  />
                </Pressable>
              </View>
              <ScrollView>
                {flatLoader ? (
                  <View style={styles.loader}>
                    <ActivityIndicator size={50} color={Colors?.primary} />
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={dataList}
                      renderItem={({ item }) => {
                        return (
                          <Pressable onPress={()=>{
                            dispatch(descData(item.id))
                            navigation.navigate("Desc")
                          }}>
                            <View style={styles.flatmain}>
                            <View style={styles.flatone}>
                              <Image
                                source={{ uri: item.image }}
                                style={{ height: 50, width: 50, margin: 20 }}
                              />
                            </View>
                            <View style={styles.flattwo}>
                              <Text>{item.title}</Text>
                              <Text style={{ color: Colors.primary }}>
                                $ {item.price}
                              </Text>
                              <Text>{item.category}</Text>
                            </View>
                          </View>
                          </Pressable>
                        );
                      }}
                      keyExtractor={(item) => item.id}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                )}
                {loadMore ? <View
                  style={{
                    marginTop: 20,
                    marginBottom: 160,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Footer setFlatLoader={setFlatLoader}
                  flatLoader={flatLoader}
                  setLoadMore={setLoadMore} />
                </View>:<View
                  style={{
                    marginTop: 20,
                    marginBottom: 160,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                </View>}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

const MainScreen = () => {
  return (
    <Provider store={store}>
      <View>
        <HomeScreen />
      </View>
    </Provider>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  homescreeninput: {
    width: 280,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "grey",
  },
  homescreensearch: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginVertical: 10,
  },
  loader: {
    marginTop: 370,
  },
  flatmain: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 0.5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F8F8FF",
  },
  flatone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flattwo: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
  },
});
