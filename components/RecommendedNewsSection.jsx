//import liraries
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { MMKV } from 'react-native-mmkv'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
import { formatDate } from '../utils/formatStrings';

const RecommendedNewsSection = ({newsProps}) => {

    // const storage = new MMKV();
    const navigation = useRouter();
    const [urlList, setUrlList] = useState([]);
    const [saveStatus, setSaveStatus] = useState([])

    const handleClick = (item) => {
        navigation.navigate({pathname: "/newsdetails", params: {newsObject: item.url}});
    }

    // function formatDate(isoDate) {
    //     const options = {
    //         weekday: "short",
    //         day: "2-digit",
    //         month: "short",
    //         year: "numeric"
    //     }

    //     const date = new Date(isoDate);
    //     return date.toLocaleDateString(undefined, options);
    // }   

    useEffect(() =>{
        const urls = newsProps.map((item) => item.url);
        setUrlList(urls);
    }, [newsProps]);


    const toggleSave = async (item, index) => {

        try {

            // const hello = JSON.stringify(item)
            // await storeData(hello)

            // const out = await AsyncStorage.getItem('my-key')
            // // console.log("Output: ", out)
            // // console.log(typeof(out))
            // if(out !== null && out !== undefined) 
            //     {
            //         const abc = JSON.parse(out)
            //         // console.log("ABC: ", abc)
            //         // console.log(typeof(abc))
            //     }
            // const savedArticles = storage.getString("savedArticles");
            // const savedArticles = storage.getString("savedArticles");
            
            const savedArticles = await AsyncStorage.getItem("savedArticles")
            
            let savedArticlesArray = (savedArticles===undefined || savedArticles === null) ? []: JSON.parse(savedArticles);

            const isArticleSaved = savedArticlesArray.some(
                (savedArticles) => savedArticles.url === item.url
            )

// let arr = [{name: 'hello', age: 120}, {name: 'hellothere', age: 40}, {name: 'sharan', age: 20}];
// let askjfn = JSON.stringify(arr);
// storeData(askjfn);

// const resp = storage.getString('my-key')
// // console.log(resp)
// // console.log(typeof(resp))
// const abc = JSON.parse(resp)
// // console.log("abc: ", abc)
// // console.log(typeof(abc))

// const isArray = abc.some(
//     (el) => el.name === 'sharan'
// )
// // console.log("Finally: ", isArray)

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
                        
                        const isArticleSavedList = urlList.map((url) => savedArticlesArray.some((savedArticle) => savedArticle.url === url));
                        
                        setSaveStatus(isArticleSavedList);
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
                        defaultSource={require('../assets/images/gray-image-placeholder.png')}
                        source={{uri: item.urlToImage}}
                        style={{ width: hp(10), height: hp(9), borderRadius: '10px'}}
                    />
                    
                    <View style={{width: "70%", paddingLeft: "5%", justifyContent: "center", marginTop: "0%"}}>

                        <Text style={{fontSize: 15, lineHeight: 25, fontWeight: '700', color: '#111827'}}>
                            {
                                item.author !== null ? (
                                item.author.length > 20 
                                ? item.author.slice(0,20) + '...' 
                                : item.author
                                ) : item.source.name
                            }
                        </Text>

                        <Text style={{color: "#1F2937", fontWeight: "500", textTransform: 'capitalize', maxWidth: '94%', fontSize: hp(1.7), lineHeight: 20}}>
                            {
                                item.title.length > 50 
                                ? item.title.slice(0, 50) + "..." 
                                : item.title.split(" - ")[0] || "N/A"
                            }
                        </Text>

                        <Text style={{fontSize:"12%", lineHeight: 20, color: "#374151"}}>
                            { formatDate(item.publishedAt) } 
                        </Text>

                    </View>

                    <View style={{width: "10%", justifyContent: 'center'}}>
                            <Pressable onPress={() => toggleSave(item, index)}>
                                <MaterialIcons name={saveStatus[index] ? "bookmark-added": "bookmark-outline"} size={20}/>
                            </Pressable>
                        </View>

                </View>
            </Pressable>       
        );
    };


    return (
        <View style={{ marginTop: '5%', backgroundColor: '#FCFBFA'}}>
            <FlatList 
                nestedScrollEnabled={true} 
                scrollEnabled={false}
                data={newsProps}  
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}  
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default RecommendedNewsSection;
