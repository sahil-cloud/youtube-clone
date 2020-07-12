import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {AntDesign , FontAwesome} from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

// <Icon name="rocket" size={30} color="#900" />

export default function Head () {

  const navigation = useNavigation();

    return (
      <>
        <Header style={{backgroundColor:"black"}}>
          <Left style={{flexDirection:"row",marginLeft:5}}>
            <AntDesign name="youtube" size={36} color="red" />
            <Title style={{marginTop:5,fontSize:20,color:"white"}}>YouTube</Title>
          </Left>
          <Right>
            <Button transparent>
              <AntDesign name="search1" size={24} color='white'
              onPress={() => navigation.navigate("Screen")}
              />
            </Button>
            <Button transparent>
              <FontAwesome name="video-camera" size={24} color="white" />
            </Button>
            <Button transparent>
              <FontAwesome name="user-circle-o" size={24} color="white" />
            </Button>
          </Right>
        </Header>
      </>
    );
}