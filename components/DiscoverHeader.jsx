import {View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function MiniHeader({label}) {
    return (
        <View style={styles.miniContainer}>
            <Text style={styles.miniText}>{label}</Text>

            <Text style={[styles.miniText, {color: 'red'}]}> View all</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    miniContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '5%',
        marginBottom: '3%',
        // marginHorizontal: 'auto'
        
    },
    miniText: {
        fontFamily: "Roboto",
        fontSize: 20,
        color: 'gray',
        fontWeight: '600',
        textTransform: 'capitalize'
    }
})