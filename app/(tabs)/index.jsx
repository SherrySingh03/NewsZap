//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

// create a component
const Index = () => {
    return <Redirect href="/home" />
};


//make this component available to the app
export default Index;
