//import liraries
import { StatusBar } from 'expo-status-bar';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate } from '../../utils/formatStrings';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// create a component
const Saved = () => {
    const navigation = useRouter();
    const [savedArticles, setSavedArticles] = useState([]);
    const [saveStatus, setSaveStatus] = useState([]);
    const [urlList, setUrlList] = useState([]);


    const handleClick = (item) => {
        console.log("Item from Saved: ", item)
        
        navigation.push({pathname: `/newsdetails`, params: {newsObject: item.url}});
    };

    useEffect(() =>{
        const urls = savedArticles.map((item) => item.url);
        setUrlList(urls);
    }, [savedArticles]);

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
                const updatedStatus = [...saveStatus]
                updatedStatus[index] = true
                setSaveStatus(updatedStatus)

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
                const updatedStatus = [...saveStatus]
                updatedStatus[index] = false;
                setSaveStatus(updatedStatus);
                console.log("Removed! ")

            }
            
        } catch (error) {
            
            console.log("Error Saving news", error)
            
        }
    }

    useFocusEffect(
        useCallback(
            () => {
                const loadSavedArticles = async () => {
                    try {
                        
                        const savedArticles = await AsyncStorage.getItem("savedArticles");
                        const savedArticlesArray = (savedArticles===undefined || savedArticles === null) ? []: JSON.parse(savedArticles);
                                                
                        setSavedArticles(savedArticlesArray);
                    } catch (error) {
                        console.log("Error loading saved articles ", error)
                    }
                };

                loadSavedArticles();
            }, [urlList, navigation]) 
    );

    const renderItem = ({item, index}) => {
        return(
            <Pressable 
                style={{marginLeft:"5%", marginRight:"10%", marginBottom:"6%", marginTop :"0%",}}
                key={index}     
                onPress={() => handleClick(item)}
            >
                <View style= {{flexDirection:"row",justifyContent:"flex-start",boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",width:"100%",}}>

                    <Image
                        source={{uri: item.urlToImage === null ? "../assets/images/gray-image-placeholder.png": item.urlToImage}}
                        style={{ width: hp(10), height: hp(9), borderRadius: '10px'}}
                    />
                    
                    <View style={{width: "70%", paddingLeft: "5%", justifyContent: "center", marginTop: "0%"}}>

                        <Text style={{fontSize: 15, lineHeight: 25, fontWeight: '700', color: '#111827'}}>
                            {
                                item.author ? (
                                item.author.length > 20 
                                ? item.author.slice(0,20) + '...' 
                                : item.author
                                ) : item.category
                            }
                        </Text>

                        <Text style={{color: "#1F2937", fontWeight: "500", textTransform: 'capitalize', maxWidth: '94%', fontSize: hp(2), lineHeight: 20}}>
                            {
                                item.title.length > 50 
                                ? item.title.slice(0, 50) + "..." 
                                : item.title.split(" - ")[0] || "N/A"
                            }
                        </Text>

                        <Text style={{fontSize:12, lineHeight: 20, color: "#374151"}}>
                            { formatDate(item.publishedAt) } 
                        </Text>

                    </View>

                    <View style={{width: "10%", justifyContent: 'center'}}>
                            <Pressable onPress={() => toggleSave(item, index)}>
                                <MaterialIcons name={"bookmark-remove"} size={20}/>
                            </Pressable>
                        </View>

                </View>
            </Pressable>       
        );
    };

    return (
        <SafeAreaView style={{padding: '5%', backgroundColor: '#FCFBFA'}}>
            <StatusBar style='dark' />

            <Header label={'Saved'} subLabel={'Articles Saved for Later'} iconName={'download-done'} />

            <View style={{ marginTop: '5%', backgroundColor: '#FCFBFA'}}>
            <FlatList 
                nestedScrollEnabled={true} 
                scrollEnabled={false}
                data={savedArticles}  
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}  
            />
            </View>
        </SafeAreaView>
    );
};

//make this component available to the app
export default Saved;
