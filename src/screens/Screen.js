import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView ,TextInput,ActivityIndicator, Alert, FlatList,TouchableOpacity} from "react-native";
import { AntDesign, FontAwesome, Ionicons ,MaterialIcons} from "react-native-vector-icons"; 
import { Header } from "native-base";
import MiniCard from '../components/MiniCards';
import { useSelector, useDispatch } from "react-redux";

export default function Screen(props) {

    const [value,Setvalue] = useState("");
    // const [MiniCardData,SetMiniCardData] = useState([]);
    const [loading,Setloading] = useState(false);
    const dispatch = useDispatch();

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${value}&key=`;

    const MiniCardData = useSelector(state =>{
        return state
    })


    const FetchData = () =>{
        Setloading(true);
        fetch(url)
        .then(res=>res.json())
        .then(data => {
            console.log(data.items);
            Setloading(false);
            // SetMiniCardData(data.items);
            dispatch({type:'add',payload:data.items})
        }).catch(() =>{
            Alert.alert("Some error occured");
        })
    }
 
    return (
      <>
        <Header style={{backgroundColor:"black"}}>
          {/* <View style={{flex:1}}> */}
          {/* <View style={{flexDirection:"row",marginLeft:10,padding:5,elevation:5,backgroundColor:"lightgrey"}}> */}
          <MaterialIcons name="arrow-back" size={26} color="white"
          onPress={() => props.navigation.goBack()}
          />
          <TextInput
            placeholder="Search Youtube"
            value={value}
            style={{ width: "80%",marginRight:10, marginLeft: 10, marginBottom: 15 ,color:"white",backgroundColor:"lightgrey"}}
            onChangeText={(text) => Setvalue(text)}
          />
          <MaterialIcons name="send" size={26} color="white"
          onPress = {() => FetchData()}
          />
        </Header>

        {loading ? <ActivityIndicator style={{marginTop:50}} size="large" color="red" /> : null }

        <FlatList
        data={MiniCardData}
        keyExtractor={(item) => item.id.videoId}
        renderItem = {({item}) =>{
            return (
              <>
                  <MiniCard
                    videoId={item.id.videoId}
                    title={item.snippet.title}
                    channel={item.snippet.channelTitle}
                  />
                
              </>
            );
        }}
        />
          
        {/* </View>
        </View> */}
      </>
    );
} 
