import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View ,Image, ScrollView,ActivityIndicator,FlatList} from 'react-native';
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
import Head from '../components/Header';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=india&regionCode=in&key=AIzaSyDpcRqLAhVCWYmJuKLqKMOuifWVFNvDyLU`;


// const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${value}&key=AIzaSyDpcRqLAhVCWYmJuKLqKMOuifWVFNvDyLU`;

//  https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=date&q=gaming&key=AIzaSyDpcRqLAhVCWYmJuKLqKMOuifWVFNvDyLU

export default function Home() {

    const navigation = useNavigation();
    const [Data, setData] = useState([]);
    const [loading, Setloading] = useState(true);
    useEffect(() => {
      fetch(
        url
      )
        .then((res) => res.json())
        .then((data) => {
        //   console.log(data.items);
          Setloading(false);
          setData(data.items);
          // dispatch({type:'add',payload:data.items})
        })
        .catch(() => {
          Alert.alert("Some error occured");
        });
    }, []);
    return (
      <>
        <View style={{flex:1}}>
          <Head />
          <ScrollView>
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
                  onPress={() => navigation.navigate('VideoPlayer',{
                      videoId:item.id.videoId,
                      title:item.snippet.title
                  })}
                  >
                    <Card>
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
          </ScrollView>
        </View>
      </>
    );
}



{/* <CardItem>
  <Left>
    <Button transparent>
      <Icon active name="thumbs-up" />
      <Text>12 Likes</Text>
    </Button>
  </Left>
  <Body>
    <Button transparent>
      <Icon active name="chatbubbles" />
      <Text>4 Comments</Text>
    </Button>
  </Body>
  <Right>
    <Text>11h ago</Text>
  </Right>
</CardItem> */}