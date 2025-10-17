import React, { useState,useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AllItems from './AllItems';
import Create from './Create';
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = () => {

    const [view, setView] =useState(0);
    const [data, setData] = useState([])

// Load saved data whenever apps starts
useEffect( () => {
    const loadData = async()=>{
        try {
            const savedData = await AsyncStorage.getItem('inventory');
            if(savedData != null){
                setData(JSON.parse(savedData));
            }
            else {
                // Default items if no data found
                setData( [
                    { id: 1, name: 'Wheat', quantity: 5, unit: 'kg' },
                    { id: 2, name: 'Rice', quantity: 10, unit: 'kg' },
                    { id: 3, name: 'Sugar', quantity: 3, unit: 'kg' },
                    { id: 4, name: 'Salt', quantity: 2, unit: 'kg' },
                    
                    ])
            }
        } catch (error) {
            console.log("Error loading data: ",error)
        }
        loadData();
    }
},[] )

// Save data whenever data gets updated
useEffect( () => {
    const saveData = async () => {
        try {
           await AsyncStorage.setItem('inventory', JSON.stringify(data));
        } catch (error) {
            console.log('Error saving dta: ', error)
        }
    }
    if(data.length > 0 ) saveData();
} , [data])

    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Dashboard</Text>
            <View style={styles.button_container}>
                <Pressable style= {[styles.button, view ===0 ? {backgroundColor: '#86eb6bff'} : null]} onPress={()=> setView(0)}>
                    <Text style={[styles.button_text, view ===0 ? {color: '#ffffff', fontWeight: 'bold',fontSize:17} : null]}>All Items</Text>
                </Pressable>
                <Pressable style= {[styles.button, view ===1 ? {backgroundColor: '#86eb6bff'} : null]} onPress={()=> setView(1)}>
                    <Text style={[styles.button_text, view ===1 ? {color: '#ffffff', fontWeight: 'bold',fontSize:17} : null]}>Low Stock</Text>
                </Pressable>
                <Pressable style= {[styles.button, view ===2 ? {backgroundColor: '#86eb6bff'} : null]} onPress={()=> setView(2)}>
                    <Text style={[styles.button_text, view ===2 ? {color: '#ffffff', fontWeight: 'bold',fontSize:17} : null]}>Create</Text>
                </Pressable>
            </View>

            <View style={[{flex: 1}]}>
                {view === 0 && <AllItems data={data} />}
                {view === 1 && <AllItems data={data.filter((items)=>  items.quantity <= 5 )}/>}
                {view === 2 && <Create data = {data} setData= {setData} />} 
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingLeft: 15,
        paddingTop: 10,
    },
    heading: {
        fontSize: 35,
        marginBottom: 10,
        fontWeight: 'bold',

    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingRight: 40,
        marginBottom:30,
    },
    button: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#8bff7cff',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    button_text: {
        fontSize: 15,
        color: '#59cc70ff',
    },


})


export default HomeScreen;