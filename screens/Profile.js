import React from 'react';
import { StyleSheet, Text, View,Image,Linking,Platform,Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { MaterialIcons,Entypo } from '@expo/vector-icons'; 
import { Title,Card,Button} from 'react-native-paper';


const Profile=(props)=>
{
    const {_id,name,email,phone,salary,picture,position} = props.route.params.item
    const deleteEmploye = ()=>{
        fetch("https://employee123kl.herokuapp.com/delete",{
            method:"post",
            headers:{
             'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} deleted`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
         Alert.alert("someting went wrong")
        })
    }
     const openDial=()=>
     {
   if(Platform.OS==="android")
    {Linking.openURL(`tel:${phone}`)}
   else
   {
    Linking.openURL(`telprompt:${phone}`)   
   }
     }
    return (
        <View style={styles.root}>
            <LinearGradient
            colors={["#533ef7","#57a5b5"]}
            style={{height:"20%"}}
            />
            <View style={{alignItems:"center"}}>
            <Image
            style={{width:140,height:140,borderRadius:70,marginTop:-50}}
            source={{uri:picture}}
            />
            </View>
            <View style={{alignItems:"center",margin:15}}>
            <Title>{name}</Title>
            <Text style={{fontSize:18}}>{position}</Text>
            </View>
            <Card style={styles.cardstyle} onPress={()=>{
                Linking.openURL(`mailto:${email}`)
            }}>
             <View style={styles.cardcontent}>
             <MaterialIcons name="email" size={32} color="blue" />
             <Text style={styles.textstyle}>{email}</Text>
             </View>
            </Card>
            <Card style={styles.cardstyle} onPress={()=>openDial()}>
             <View style={styles.cardcontent}>
             <Entypo name="phone" size={32} color="blue" />
             <Text style={styles.textstyle}>{phone}</Text>
             </View>
            </Card>
            <Card style={styles.cardstyle}>
             <View style={styles.cardcontent}>
             <MaterialIcons name="attach-money" size={32} color="blue" />
             <Text style={styles.textstyle}>{salary}</Text>
             </View>
            </Card>

            <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
               <Button 
               icon="account-edit"
               theme={theme}
                mode="contained"
                 onPress={() => 
                 {props.navigation.navigate("Create",
                 {_id,name,email,phone,salary,picture,position}
                 )}}>
                    Edit
                </Button>
                <Button icon="delete"
                 mode="contained"
                theme={theme}
                  onPress={() => deleteEmploye()}>
                    Fire Employee
                </Button>
            </View>
        </View>
    )
}
const theme={
    colors:{primary:"blue"},

}
const styles = StyleSheet.create(
    {
        root:
        {
            flex:1,

        },
        cardstyle:
        {
            margin:3,


        },
        cardcontent:
        {
            flexDirection:"row",
            padding:8,

        },
        textstyle:
        {
          fontSize:18,
          marginTop:2,
          marginLeft:5,
          

        }
    }
)

 
export default Profile