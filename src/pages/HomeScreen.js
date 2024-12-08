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
  const navigation = useNavigation();
  const { products,error } = useSelector((state) => state.products);
  const { list } = useSelector((state) => state.searchData);
  const { value } = useSelector((state) => state.desc);
  const [searchValue, setSearchValue] = useState("");
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [products]);

  useEffect(() => {
    let filterResults = data;

    for (let value of list) {
      if (value != "") {
        setLoadMore(false)
        filterResults = filterResults.filter((item) => {
          if (item.category.toLowerCase() === value) {
            return true;
          }
          else if (
            value === "upto $50" ||
            value === "$50 to $100" ||
            value === "Above $100"
          ) {
            let num = Math.round(Number(item.price));
            if (value == "upto $50" && num <= 50) {
              return true;
            } else if (value == "$50 to $100" && num > 50 && num <= 100) {
              return true;
            } else if (value == "Above $100" && num > 100) {
              return true;
            }
          }
          else if (
            value === "below 3" ||
            value === "3 to 4" ||
            value === "4 to 5"
          ) {
            let num=Number(item.rating.rate)
  
            if(value === "below 3" && num <= 3  )
            {
              return true
            }
            else if(value === "3 to 4" && num>3 && num<=4  )
              {
                return true
              }
            else if(value === "4 to 5" && num>=5){
              return true
            }
          }
        });
      }
    }
    if (loadMore === true) {
      setDataList(filterResults?.slice(0, 10));
    } else setDataList(filterResults);
  }, [data, loadMore, list]);

  useEffect(() => {
    setData(products);
    setTimeout(() => setLoader(false), 2000);
  }, [loader]);

  const searchFunction = () => {
    let filteredData = data.filter((item) =>
      item?.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDataList(filteredData);
  };

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
            {error? <View><Text>{error}</Text></View>:<View>
              <View style={styles.homescreensearch}>
                <TextInput
                  placeholder="Enter the Title ..."
                  style={styles.homescreeninput}
                  value={searchValue}
                  onChangeText={setSearchValue}
                />
                <Pressable onPress={searchFunction}>
                  <Image source={require("../assests/images/loupe.png")} style={{height:25,width:25,marginLeft:8,marginTop:7}}/>
                </Pressable>
                <Pressable onPress={() => {
                      navigation.navigate("Filter");
                    }}>
                  <Image source={require("../assests/images/sort.png")} style={{height:30,width:30,marginLeft:25,marginTop:3}}/>
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
                          <Pressable
                            onPress={() => {
                              dispatch(descData(item.id));
                              navigation.navigate("Desc");
                            }}
                          >
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
                {loadMore ? (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 160,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Footer
                      setFlatLoader={setFlatLoader}
                      flatLoader={flatLoader}
                      setLoadMore={setLoadMore}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 160,
                      display: "flex",
                      alignItems: "center",
                    }}
                  ></View>
                )}
              </ScrollView>
            </View>}
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
    marginTop: 300,
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
