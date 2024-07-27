import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from 'react-native';

import { useNavigation } from 'expo-router';
import { Feather, Octicons, MaterialIcons } from '@expo/vector-icons';

export default function Header({label, subLabel, iconName}) {
    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    const textTheme = colorScheme === 'light' ? styles.lightText : styles.darkText
    return (
        <View style={styles.headerContainer}>
            {/* <View style={{flexDirection: 'row'}}>
                <Text 
                    style={[styles.headerTitle, textTheme]}
                    >
                    News 
                    
                </Text>
            </View>

            <Feather name='search' style={[styles.headerTitle, textTheme, {fontSize: '30%', right: '35%'}]}/> */}

            <View>

            <View style={{"paddingLeft":"0%","paddingRight":"10%","marginBottom":"5%","justifyContent":"space-between", marginTop: '6%'}}>
                <Text style={{fontSize: 40, color: 'red', fontFamily: 'Roboto'}}>
                    {label}
                {iconName ? <MaterialIcons name={iconName} style={[styles.headerTitle, {fontSize: 30, marginLeft: '5%'}]} /> : null }

                </Text>

                <Text style={{fontSize: 20, lineHeight: 30, color: 'gray', }}>{subLabel}</Text>
            </View>
            </View>


            {/* <Switch value={colorScheme==='dark'} onChange={toggleColorScheme} /> */}
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: 'auto',
        marginLeft: '5%',
        // marginRight: '5%',
        marginTop: '5%',
    },
    headerTitle: {
        fontSize: 30,
        lineHeight: 70,
        textTransform: 'uppercase', 
        fontWeight: 500,
        // fontFamily: "Helvetica",
    },
    lightText: {
        color: 'red'
    },
    darkText: {
        color: '#ffffff'
    }
})