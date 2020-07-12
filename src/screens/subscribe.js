import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Head from "../components/Header";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import { useNavigation } from "@react-navigation/native";


export default function Subscribe() {
    const navigation = useNavigation();


  const [Data, setData] = useState([]);
  const [loading, Setloading] = useState(true);

  useEffect(() => {
    fetchData("india");
  },[])

  const fetchData = (query) =>{
    setData([]);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&order=date&q=${query}&regionCode=in&key=AIzaSyDpcRqLAhVCWYmJuKLqKMOuifWVFNvDyLU`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        Setloading(false);
        setData(data.items);
        // dispatch({type:'add',payload:data.items})
      })
      .catch(() => {
        Alert.alert("Some error occured");
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <Head />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: 10,
        }}
      >
        <Button light style={{ width: 120, backgroundColor: "orangered" }} onPress={() => fetchData("gaming")}>
          <Text style={{ marginLeft: 15, color: "white", fontSize: 20 }}>
            Gaming
          </Text>
        </Button>
        <Button light style={{ width: 120, backgroundColor: "orangered" }} onPress={() => fetchData("sports")}>
          <Text style={{ marginLeft: 25, color: "white", fontSize: 20 }}>
            Sports
          </Text>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: 10,
        }}
      >
        <Button light style={{ width: 120, backgroundColor: "orangered" }} onPress={() => fetchData("music")}>
          <Text style={{ marginLeft: 15, color: "white", fontSize: 20 }}>
            Music
          </Text>
        </Button>
        <Button light style={{ width: 120, backgroundColor: "orangered" }} onPress={() => fetchData("news")}>
          <Text style={{ marginLeft: 25, color: "white", fontSize: 20 }}>
            News
          </Text>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: 10,
        }}
      >
        <Button light style={{ width: 120, backgroundColor: "orangered" }} onPress={() => fetchData("kids")}>
          <Text style={{ marginLeft: 15, color: "white", fontSize: 20 }}>
            Kids
          </Text>
        </Button>
        <Button light style={{ width: 120, backgroundColor: "orangered" }} onPress={() => fetchData("technology")}>
          <Text style={{ marginLeft: 25, color: "white", fontSize: 20 }}>
            Tech
          </Text>
        </Button>
      </View>
      <View style={{flex:1}}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 80 }}
            size="large"
            color="red"
          />
        ) : null}
        <FlatList
          data={Data}
          keyExtractor={(item) => item.id.videoId}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("VideoPlayer", {
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                  })
                }
              >
                <Card style={{backgroundColor:"black"}}>
                  <CardItem cardBody>
                    <Image
                      source={{
                        uri: `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`,
                      }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>

                  <CardItem style={{backgroundColor:"black"}}>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`,
                        }}
                      />
                      <Body>
                        <Text style={{ fontSize: 18, fontWeight: "400",color:"white" }}>
                          {item.snippet.title}
                        </Text>
                        <Text note style={{color:"white"}}>{item.snippet.channelTitle}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
