import React from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";


const AllItems = ({data}) => {

    const renderItem= ({item}) => (
        <View style={[styles.item_container, item.quantity <= 5 ? styles.low_item_container : styles.high_item_container  ]}>
            <Text style={[styles.item_detail, item.quantity <= 5 ? styles.low_item_detail : styles.high_item_detail]}>{item.name }</Text>
            <View style={[styles.item_quantity_detail]}>
                <Text style={[styles.item_detail, item.quantity <= 5 ? styles.low_item_detail : styles.high_item_detail]}>{item.quantity}</Text>
                <Text style={[styles.item_detail, item.quantity <= 5 ? styles.low_item_detail : styles.high_item_detail]} > ({item.unit}) </Text>
            </View>
        </View>
        
    )

    return(
        <View style={styles.container}>
            <Text style={styles.heading} >Items</Text>

            <FlatList 
                data={data}
                renderItem={renderItem }
                keyExtractor={ (item) => item.id.toString() }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingLeft: 10,
        paddingRight:10,
        
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
        paddingVertical:5,
        marginVertical: 4
    },
    item_quantity_detail: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    item_detail: {
        fontSize : 20,
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


})

export default AllItems;