import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "react-native-vector-icons";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function MiniCard (props) {
    const navigation = useNavigation();

    return (
      <>
        <List>
          <ListItem thumbnail>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VideoPlayer", {
                  videoId: props.videoId,
                  title: props.title,
                })
              }
            >
              <Left>
                <Thumbnail
                  square
                  style={{ width: 150, height: 120 }}
                  source={{
                    uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
                  }}
                />
              </Left>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VideoPlayer", {
                  videoId: props.videoId,
                  title: props.title,
                })
              }
            >
              <Body>
                <Text
                  style={{ fontSize: 15, fontWeight: "400", marginBottom: 10 ,color:"white"}}
                >
                  {props.title}
                </Text>
                <Text note numberOfLines={1} style={{color:"white"}}>
                  {props.channel}
                </Text>
              </Body>
            </TouchableOpacity>
          </ListItem>
        </List>
      </>
    );
}

