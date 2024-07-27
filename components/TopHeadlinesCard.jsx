//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


const {width, height} = Dimensions.get('window');

// create a component
const TopHeadlinesCard = ({item, handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <View style={{marginVertical: 'auto',position: 'relative', alignItems: 'center' , shadowColor: 'black',
                    shadowOffset: {width: 0, height: 5},
                    shadowRadius: 20,
                    shadowOpacity: 0.05}}>
                <Image 
                    source={{uri: item.urlToImage}}
                    style={[styles.image, {width: width * 0.9, height: height * 0.22}]}
                    resizeMode='stretch'

                />

                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={styles.background}
                    start={{x: 0.5, y:0}}
                    end={{x: 0.5, y:1}}
                />

                <View style={styles.newsContent}>
                    <View style={{marginTop:"5%"}}>
                        <View style={{maxWidth: '95%'}}>
                            <Text style={styles.newsTitleText}>
                                {
                                    item.title.length > 60 
                                    ? item.title.slice(0, 58) + "..." 
                                    : item.title.split(" - ")[0] || "N/A"
                                }
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.newsAuthorText}>
                                {
                                    item.author ? (item.author.length > 20 
                                    ? item.author.slice(0,20) + '...' 
                                    : item.author) : item.source.name
                                }
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

// define your styles
const styles = StyleSheet.create({
    image: {
        borderRadius: '10px',
        marginHorizontal: 'auto'
    },
    background: {
        position: 'absolute',
        bottom: 0,
        width: "95%",
        height: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    newsContent: {
        position: 'absolute',
        left: '8%',
        bottom: '10%',
        right: '10%',
        justifyContent: 'flex-end',
        height: '80%'
    },
    newsTitleText: {
        color: 'white',
        fontSize:"20%",
        lineHeight:25,
        fontWeight: '600',
        textTransform:"capitalize"
    },
    newsAuthorText: {
        color: 'white',
        fontSize:"12%",
        lineHeight:25,
        fontWeight: "500"
    }
});

//make this component available to the app
export default TopHeadlinesCard;
