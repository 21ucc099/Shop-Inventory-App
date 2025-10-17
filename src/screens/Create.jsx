import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const Create = ({ data, setData }) => {

    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [unit, setUnit] = useState('kg');
    const [isEdit, setIsEdit] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    const renderItem = ({ item }) => (
        <View style={[styles.item_container, item.quantity <= 5 ? styles.low_item_container : styles.high_item_container]}>
            <Text style={[styles.item_detail, item.quantity <= 5 ? styles.low_item_detail : styles.high_item_detail]}>{item.name}</Text>
            <View style={[styles.item_quantity_detail]}>
                <Text style={[styles.item_detail, item.quantity <= 5 ? styles.low_item_detail : styles.high_item_detail]}>{item.quantity}</Text>
                <View style={styles.update_container} >
                    <Text style={[styles.item_detail, item.quantity <= 5 ? styles.low_item_detail : styles.high_item_detail]} > ({item.unit}) </Text>
                    <View style={styles.update_button_container}>
                        <TouchableOpacity
                            style={styles.edit_button_container}
                            onPress={() => editItem(item)}
                        >
                            <Text style={styles.edit_button}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.del_button_container}
                            onPress={() => delItem(item.id)}
                        >
                            <Text style={styles.del_button}>Delete</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </View>

    )

    const addItem = () => {
        
        if (!itemName || !itemQuantity || !unit) {
            Alert.alert('Error', 'Enter field properly')
            setItemName('')
            setItemQuantity('')
            return;
        }
        const newItem = {
            id: data.length + 1,
            name: itemName,
            quantity: Number(itemQuantity),
            unit: unit
        }
        setData([...data, newItem])
        setItemName('')
        setItemQuantity('')
        setIsEdit(false)
    }
    
    const delItem = (id) => {
        setData(data.filter( (item)=> item.id != id ))
    }
    
    const editItem = (item) => {
        setIsEdit(true)
        setItemName(item.name)
        setEditItemId(item.id)
    }

    const updateItem = () => {
        setData( data.map( (item) => (
            item.id === editItemId ? {...item, name: itemName , quantity: Number(itemQuantity), unit} : item
         ) ) )
        setIsEdit(false)
        setItemName('')
        setItemQuantity('')
        setEditItemId(null);
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={[styles.input_name_container]}
                placeholder="Enter item"
                placeholderTextColor='#000000ff'
                fontSize={18}
                value={itemName}
                onChangeText={(value) => { setItemName(value) }}

            />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.input_quantity_container}
                    placeholder="Enter quantity"
                    placeholderTextColor='#000000ff'
                    fontSize={18}
                    value={itemQuantity}
                    onChangeText={(value) => { setItemQuantity(value) }}
                    keyboardType="decimal-pad"
                />
                <View style={styles.picker_container}>
                    <Picker
                        selectedValue={unit}
                        style={styles.picker}
                        onValueChange={(value) => setUnit(value)}
                    >
                        <Picker.Item label="KiloGram" value={"kg"} />
                        <Picker.Item label="Litre" value={"litre"} />
                        <Picker.Item label="Packet" value={"packet"} />
                        <Picker.Item label="Piece" value={"piece"} />
                        <Picker.Item label="Tube" value={"tube"} />
                        <Picker.Item label="Bottle" value={"bottle"} />
                        <Picker.Item label="Loaf" value={"loaf"} />
                        <Picker.Item label="Pack" value={"pack"} />
                        <Picker.Item label="Dozen" value={"dozen"} />
                        {/* <Picker.Item label="" value={""} /> */}
                    </Picker>

                </View>
            </View>

            <TouchableOpacity
                style={styles.submit}
                onPress={ () => isEdit ? updateItem() : addItem() }
            >
                <Text style={styles.submit_text}>{ isEdit ? 'EDIT ITEM IN STOCK' : 'ADD ITEM IN STOCK'}  </Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={styles.heading} >All Items</Text>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    input_name_container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#a8dbffff',
        height: 40,
        width: 330,
        marginTop: 3,
        marginBottom: 7,
    },
    input_quantity_container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#a8dbffff',
        height: 40,
        width: 150,
        marginBottom: 10,

    },
    picker_container: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#a8dbffff',
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:40,
    },
    picker: {
        color: '#1f1f1fff',
        fontSize: 18,
        width:140,        
    },
    submit: {
        borderWidth: 1,
        borderRadius: 30,
        height: 40,
        width: 200,
        backgroundColor: '#71deffff',
        justifyContent: 'center',
        marginLeft: 55,
    },
    submit_text: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },

    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    item_container: {
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 5,
        height: 40,
        paddingVertical: 5,
        marginVertical: 4
    },
    item_quantity_detail: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    item_detail: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    low_item_container: {
        backgroundColor: '#ff9494ff',
    },
    high_item_container: {
        backgroundColor: '#92dbffff',
    },
    low_item_detail: {
        color: '#ffffff',
    },
    high_item_detail: {
        color: '#ffffff',
    },
    update_container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    update_button_container: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginLeft: 20,
        alignSelf: 'center',
        
    },
    edit_button_container: {
        marginRight: 5,
        width: 35,
        height:40 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    del_button_container: {
        width: 60,
        height:40 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    edit_button: {
        fontSize: 20,
    },
    del_button: {
        fontSize:20,
    },

})

export default Create;