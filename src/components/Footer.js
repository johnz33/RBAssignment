import React, { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Colors } from "../assests/colors";
import { useSelector } from "react-redux";

const Footer = ({ setFlatLoader, flatLoader, setLoadMore }) => {
  const onLoader = () => {
    setFlatLoader(true);
    setLoadMore(false);
    setTimeout(
      () => {
        setFlatLoader(false);
      },
      1000,
      [flatLoader]
    );
  };

  return (
    <View>
      <Pressable
        style={{
          height: 40,
          width: 100,
          display: "flex",
          justifyContent: "center",
          backgroundColor: Colors.primary,
          borderRadius: 20,
          marginHorizontal: "100px",
        }}
        onPress={onLoader}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Load More</Text>
      </Pressable>
    </View>
  );
};

export default Footer;