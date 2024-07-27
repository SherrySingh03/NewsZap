import {View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function Loading() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="red" />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: "1",
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center' 
    }
})