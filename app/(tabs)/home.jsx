//import libraries
// import { useQuery } from '@tanstack/react-query';
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { topHeadlinesURL, recommendedNewsURL } from '../../utils/NewsAPI'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MiniHeader from '../../components/MiniHeader';
import TopHeadlines from '../../components/TopHeadlines';
import { Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RecommendedNewsSection from '../../components/RecommendedNewsSection'
// import axios from 'axios';
// import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';





// create a component
const Home = () => {

    const res = ""
    const colorScheme = useColorScheme();
    const [topHeadlines, setTopHeadlines] = useState([]);
    const [recommendedNews, setRecommendedNews] = useState([]);
    const [isTopHeadlinesloading, setTopHeadlinesLoading] = useState(true);
    const [isRecommendedNewsLoading, setRecommendedNewsLoading] = useState(true);

    // const fetchData = async( {url} ) => {
    //     const resp = await fetch(url, {
    //         method: 'GET'
    //     });
    //     const data = await resp.json();
    //     const articles = data.articles;

    //     // setTopHeadlines(articles);
    //     // // console.log(articles);
    //     setLoading(false);
    // };

    const renderItem = ({ item }) => {
        return (
          <Text>
            {item.title}
          </Text>
        );
    }

    useEffect(() => {
        Promise.all([
            fetch(topHeadlinesURL, {method: 'GET'}),
            fetch(recommendedNewsURL, {method: 'GET'}),
        ])
        .then(([resTop, resRec]) => 
            Promise.all([resTop.json(), resRec.json()])
        ).then(([dataTop, dataRec]) => {
            setTopHeadlines(dataTop.articles);
            setRecommendedNews(dataRec.articles);
            // // console.log("Top: ", dataTop.articles);
            // // console.log("Rec: ", dataRec.articles);
            setTopHeadlinesLoading(false);
            setRecommendedNewsLoading(false);
        })
    }, []);
    
    
    // const {isLoading: isTopHeadlinesLoading} = useQuery({
    //     queryKey: ["topHeadlines"],
    //     queryFn: async () => ((await axios.get("https://catfact.ninja/fact"))),
    //     onSuccess: (data) => {
            
    //         // // console.log("Hello!")
    //         setTopHeadlines(data)
            
    //     },
    //     onError: (error) => {
    //         res = 
    //         // // console.log("Hello!")
    //         // // console.log("Error fetching Top headlines: ", error);
    //     }
    // });

    // const {isLoading: isRecommendedNewsLoading} = useQuery({
    //     queryKey: ["recommendedNews"],
    //     queryFn: fetchRecommendedNews,
    //     onSuccess: (data) => {
    //         setRecommendedNews([data.totalResults])
    //     },
    //     onError: (error) => {
    //         // // console.log("Error fetching recommended news: ", error);
    //     }
    // });

    return (
        <SafeAreaView>

            <StatusBar style={'dark'}/>

        <View>
            <Header label={'News'} subLabel={"News Now, Fast & Fresh"} iconName={'electric-bolt'}/>
            
            <MiniHeader label={"Top Headlines"} />

            {
                isTopHeadlinesloading ? (
                    <Loading />
                ) : 
                (
                    <View>
                    <TopHeadlines data={topHeadlines}/>
                    </View>
                )
            }

            <View style={
                Platform.OS === 'ios' ? {
                    marginTop: '52%',
                } : {}
                
            }>

                <MiniHeader label="Recommended News"/>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: hp(80),
                        backgroundColor: '#FCFBFA',
                    }}
                >
                    {isRecommendedNewsLoading ? 
                        ( <Loading /> ) 
                        : ( <RecommendedNewsSection label="Recommended News" newsProps={recommendedNews} />)
                    }
                </ScrollView>
            </View>
            </View>
        </SafeAreaView>
    )
};

//make this component available to the app
export default Home;
