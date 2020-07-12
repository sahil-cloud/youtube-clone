import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from "react-native";
import Head from "../components/Header";
import {WebView} from 'react-native-webview';
import { Button } from "native-base";


export default function VideoPlayer ({route,navigation}) {
    const {videoId , title} = route.params;

    return (
      <View style={{ flex: 1 }}>
        <Head />

        <View
          style={{
            width: "100%",
            height: 200,
          }}
        >
          <WebView
            javaScriptEnabled={true}
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            width: Dimensions.get("screen").width,
            margin: 9,
            color: "white",
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            color: "white",
          }}
        />
        <View style={{ alignItems: "flex-end" }}>
          <Button full light style={{backgroundColor:"black"}}
          onPress={() => navigation.goBack()}
          >
            <Text style={{color:"white",fontSize:20,marginTop:10}}>Back</Text>
          </Button>
        </View>
      </View>
    );
}