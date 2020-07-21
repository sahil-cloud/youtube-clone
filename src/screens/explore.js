import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView,ActivityIndicator,FlatList ,TouchableOpacity} from "react-native";
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


export default function Explore() {
    const navigation = useNavigation();

    const [Data, setData] = useState([]);
    const [loading, Setloading] = useState(true);

    useEffect(() =>{
        fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=40&regionCode=in&key=`
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.items);
            Setloading(false);
            setData(data.items);
            // dispatch({type:'add',payload:data.items})
          })
          .catch(() => {
            Alert.alert("Some error occured");
          });
    },[])

  return (
    <View style={{flex:1}}>
      <Head />
      <ScrollView>
        <Text style={{ fontSize: 20, margin: 10 ,color:"white",marginLeft:20}}>Trending..</Text>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 80 }}
            size="large"
            color="red"
          />
        ) : null}
        <FlatList
          data={Data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("VideoPlayer", {
                    videoId: item.id,
                    title: item.snippet.title,
                  })
                }
              >
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={{
                        uri: `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
                      }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>

                  <CardItem style={{ backgroundColor: "black" }}>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
                        }}
                      />
                      <Body>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "400",
                            color: "white",
                          }}
                        >
                          {item.snippet.title}
                        </Text>
                        <Text note style={{ color: "white" }}>
                          {item.snippet.channelTitle}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
