import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image ,FlatList,Alert} from 'react-native';
import {Card} from 'react-native-paper';
import {FAB} from 'react-native-paper';
import {useDispatch,useSelector} from 'react-redux'

const Home =(props)=>
{
    //const [data,setData]=useState([])
   // const [loading,setLoading]=useState(true)
   const dispatch=useDispatch()
const{ data,loading}=   useSelector((state)=>{
return state
   })
const fetchData=()=>
{
    fetch("https://bhhehel.herokuapp.com/")
    .then(res=>res.json())
    .then(results=>{
        //setData(results)
        //setLoading(false)
        dispatch({type:"ADD_DATA",payload:results})
        dispatch({type:"SET_LOADING",payload:false})

    }).catch(err=>{
Alert.alert("something went wrong")
    })
}
    useEffect(()=>{
     fetchData()
    },[])
    const renderList=((item)=>  
    {
        return (
            <Card style={styles.mycard}
            onPress={()=>props.navigation.navigate("Profile",{item})}
            >
            <View style={styles.cardview}>
            <Image
            style={{width:50,height:50,borderRadius:50/2}} 
            source={{uri:item.picture}}
            />
            <View>
            <Text  style={styles.text}> {item.name}</Text>
        <Text  style={styles.text}> {item.position}</Text>
            </View>
       
            </View>
            
        </Card>
        )

    })
   
    return (
      <View style ={{backgroundColor:"red",flex:1}}>
          
          <FlatList
            data ={data}
            renderItem={({item})=>
            {
            return renderList(item)
            } }
           
            onRefresh={()=>fetchData()}
            refreshing={loading}
            keyExtractor={(item, index) => item._id.toString()}
           // KeyExtractor={item=>`""${item._id}`}
            />
           

            <FAB onPress={()=>props.navigation.navigate("Create")}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={theme}
                />

      </View> 
        
    )
}
const theme={
    colors:{accent:"blue"},

}
const styles =StyleSheet.create(
    {
        mycard:
        {
            margin:5,

        },
        cardview:
        {
            flexDirection:"row",
            padding:8

        },
        text:
        {
            fontSize:20,
            marginLeft:10,
           

        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          },
    }
)
export default Home