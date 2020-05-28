import React, { useState } from 'react';
import { StyleSheet, Text, View,Image ,FlatList,Modal,Alert, KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const Createemployee=({navigation,route})=>
{
    const getDetails=(type)=>{
        if(route.params)
        {
            switch(type)
            {
                    case "name":
                    return route.params.name
                    case "phone":
                    return route.params.phone
                    case "email":
                    return route.params.email
                    case "salary":
                    return route.params.salary
                    case "picture":
                    return route.params.picture
                    case "position":
                    return route.params.position
            }
            
        }
        return ""
    }
    
    const [name,setName]=useState(getDetails("name"))
    const [phone,setPhone]=useState(getDetails("phone"))
    const [email,setEmail]=useState(getDetails("email"))
    const [picture,setPicture]=useState(getDetails("picture"))
    const [salary,setSalary]=useState(getDetails("salary"))
    const [position,setPosition]=useState(getDetails("position"))
    const [modal,setModal]=useState(false)
    const[enableshift,setenableShift]=useState(false)
    
     const submitData = ()=>{
        fetch("https://ghatiyaaadmi.herokuapp.com/send-data",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved successfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
            
          Alert.alert("someting went wrong")
      })
  }
  const updateDetails=()=>
  {
    fetch("https://ghatiyaaadmi.herokuapp.com/update ",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          id:route.params._id,
            name,
            email,
            phone,
            salary,
            picture,
            position
        })
    })
    .then(res=>res.json())
    .then(data=>{
        Alert.alert(`${data.name} is updated sucessfully`)
        navigation.navigate("Home")
    })
    .catch(err=>{
       
      Alert.alert("someting went wrong")
  }) 
  }

    const pickFromGallery = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
             let data =  await ImagePicker.launchImageLibraryAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
              if(!data.cancelled){
                  let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}` 
                    
                }
                  handleUpload(newfile)
              }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }
     const pickFromCamera = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
             let data =  await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
            if(!data.cancelled){
                let newfile = { 
                  uri:data.uri,
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test.${data.uri.split(".")[1]}` 
  
              }
                handleUpload(newfile)
            }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }
  
  
     const handleUpload = (image)=>{
          const data = new FormData()
          data.append('file',image)
          data.append('upload_preset','employ')
          data.append("cloud_name","dpusza2dk")
  
          fetch("https://api.cloudinary.com/v1_1/dpusza2dk/image/upload",{
              method:"post",
              body:data
          }).then(res=>res.json()).
          then(data=>{
             // console.log(data)
              setPicture(data.url)
              setModal(false)
          }).catch(err=>{
              Alert.alert("error while uploading")
          })
     }
     
  
    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
  <View>
        <TextInput
        label='Name'
        style={styles.inputstyle}
        value={name}
        onFocus={()=>setenableShift(false)}
        theme={theme}
        mode="outlined"
        onChangeText={text => setName(text )}
        />
        <TextInput
        label='Email'
        style={styles.inputstyle}
        value={email}
        onFocus={()=>setenableShift(false)}
        theme={theme}
        mode="outlined"
        onChangeText={text => setEmail(text )}
        />
        <TextInput
        label='Phone'
        style={styles.inputstyle}
        value={phone}
        onFocus={()=>setenableShift(false)}
        theme={theme}
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={text => setPhone(text )}
        />
        <TextInput
        label='Salary'
        style={styles.inputstyle}
        value={salary}
       onFocus={()=>setenableShift(true)}
        theme={theme}
        mode="outlined"
        onChangeText={text => setSalary(text )}
        />
        <TextInput
        label='Position'
        style={styles.inputstyle}
        value={position}
       onFocus={()=>setenableShift(true)}
        theme={theme}
        mode="outlined"
        onChangeText={text => setPosition(text )}
        />

        <Button
        style={styles.inputstyle}
         icon={picture==""?"upload":"check"}
         theme={theme}
          mode="contained"
           onPress={() =>setModal(true)}
           >
            Upload Image
        </Button>
        {
            route.params?
            <Button
            style={styles.inputstyle}
             icon="content-save"
             theme={theme}
              mode="contained"
               onPress={() =>updateDetails()}
               >
                Update details
            </Button>
            :
        <Button
        style={styles.inputstyle}
         icon="content-save"
         theme={theme}
          mode="contained"
           onPress={() =>submitData()}
           >
            Save
        </Button>
             }
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=>
            {
                setModal(flase)
            }}
            >
                <View style={styles.modalview}>
                    <View  style={styles.modalviewbutton}>
                    <Button 
                    icon="camera" 
                    theme={theme}
                    mode="contained"
                     onPress={() =>pickFromCamera()}
                     >
                    Camera
                    </Button>
                <Button 
                icon="image-area" 
                theme={theme}
                mode="contained"
                 onPress={() =>pickFromGallery()}
                 >
                    Gallery
                </Button>
                    </View>
                    <Button 
                    icon="camera" 
                    theme={theme}
                     onPress={() =>setModal(false)}>
                    Cancel
                 </Button>
                </View>
        </Modal>

        
  </View>
  </KeyboardAvoidingView>
    )
}

const theme={
    colors:{primary:"blue"},

}


const styles =StyleSheet.create(
    {
        root:
        {
            flex:1,
        

        },
        inputstyle:
        {
            margin:5,
        },
        modalviewbutton:
        {
            flexDirection:"row",
            justifyContent:"space-around",
            padding:10
        },
        modalview:
        {
            position:"absolute",
            bottom:2,
            width:"100%",
            backgroundColor:"white"

        }

    })

export default  Createemployee