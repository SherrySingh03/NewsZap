//import liraries
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialIcons } from '@expo/vector-icons';
import {WebView} from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing'

const {width, height} = Dimensions.get('window');
// create a component
const NewsDetails = () => {

    const item = useLocalSearchParams();
    const navigation = useRouter();
    
    const [isSaved, setIsSaved] = useState(false);
    const [visible, setVisible] = useState(false);
    
    const shareContent = async() => {
        const resp = await Sharing.shareAsync(item.newsObject);
    }

    const toggleSave = async (item, index) => {

        try {

            const savedArticles = await AsyncStorage.getItem("savedArticles")
            
            let savedArticlesArray = (savedArticles===undefined || savedArticles === null) ? []: JSON.parse(savedArticles);

            const isArticleSaved = savedArticlesArray.some(
                (savedArticles) => savedArticles.url === item.url
            )

            if (!isArticleSaved || savedArticlesArray.length===0) {

                savedArticlesArray.push(item);
                // console.log(savedArticlesArray)
                let stringifyArr = JSON.stringify(savedArticlesArray)
                await AsyncStorage.setItem(
                    "savedArticles",
                    stringifyArr
                );
                
                setIsSaved(true);

                console.log("Saved!")
            } 
            else{

                const updatedSavedArticlesArray = savedArticlesArray.filter(
                    (savedArticle) => savedArticle.url !== item.url
                );

                let updatedArr = JSON.stringify(updatedSavedArticlesArray)

                await AsyncStorage.setItem(
                    "savedArticles",
                    updatedArr
                );
                setIsSaved(false);
                console.log("Removed! ")

            }
            
        } catch (error) {
            
            console.log("Error Saving news", error)
            
        }
    }

    useEffect(() => {

        const loadSavedArticles = async () => {
                    try {
                        
                        const savedArticles = await AsyncStorage.getItem("savedArticles");
                        const savedArticlesArray = (savedArticles===undefined || savedArticles === null) ? []: JSON.parse(savedArticles);
                        
                        const isArticleSavedList = savedArticlesArray.some((savedArticle) => savedArticle.url === item.newsObject);
                        
                        setIsSaved(isArticleSavedList);
                    } catch (error) {
                        console.log("Error loading saved articles ", error)
                    }
                    
                };
                loadSavedArticles(); 
            }, [item.newsObject]);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Pressable onPress={() => navigation.back()} >
                        <Ionicons name='chevron-back-outline' size={28} color={'gray'}  />
                    </Pressable>
                </View>

                <View style={styles.anotherContainer}>
                <Pressable style={{borderRadius: '9999px'}}>
                        <MaterialIcons name='ios-share' size={28} color={'gray'} onPress={shareContent} />
                    </Pressable>
                </View>
                <Pressable style={{borderRadius: '9999px'}}>
                        <MaterialIcons name={isSaved ? "bookmark-added" : 'bookmark-outline'} onPress={toggleSave} size={28} color={'gray'}  />
                    </Pressable>
            </View>

            <WebView 
                source={{uri: item.newsObject}}
                onLoadStart={() => setVisible(true)}
                onLoadEnd={() =>setVisible(false)}
            />

            {
                visible && (
                    <ActivityIndicator
                        size={"large"}
                        color={'red'}
                        style={{
                            position: 'absolute',
                            top: height/2,
                            left: width/2 
                        }}
                    />
                )
            }
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        "paddingLeft":"1%",
        "paddingRight":"4%",
        "paddingBottom":"1%",
        "paddingTop":"15%",
        "flexDirection":"row",
        "justifyContent":"space-between",
        "alignItems":"center",
        "width":"100%",
        "backgroundColor":"#ffffff"
    },
    subContainer: {
        "padding":"2%",
        "justifyContent":"center",
        "alignItems":"center",
        "borderRadius":"9999px",
        "backgroundColor":"#F3F4F6"
    },
    anotherContainer: {"marginLeft":"2%","flexDirection":"row", justifyContent: "center", alignItems: 'center', "borderRadius":"9999px","backgroundColor":"#ffffff"}
});

//make this component available to the app
export default NewsDetails;
