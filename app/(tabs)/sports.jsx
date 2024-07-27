//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import TopHeadlines from '../../components/TopHeadlines'
import CategoriesCard from '../../components/CategoriesLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import {sports} from '../../constants/sportscategories'
import { selectedSportsUrl, topSportsHeadlinesURL } from '../../utils/NewsAPI';
import { useState } from 'react';
import { Platform } from 'react-native';
import MiniHeader from '../../components/DiscoverHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RecommendedNewsSection from '../../components/RecommendedNewsSection';
import Loading from '../../components/Loading';

// create a component
const Sports = () => {

    const [activeSports, setActiveSports] = useState('football')
    const [topSportsNews, setTopSportsNews] = useState([]);
    const [topSportsNewsLoading, setTopSportsNewsLoading] = useState(true);
    const [selectedSportsNews, setSelectedSportsNews] = useState([]);
    const [selectedSportsLoading, setselectedSportsLoading] = useState(true);


    const handleSportsChange = (activeSports) => {
        setselectedSportsLoading(true);
        setActiveSports(activeSports)
    }

    useEffect(() => {
        Promise.all([
            fetch(topSportsHeadlinesURL, {method: 'GET'}),
            fetch(selectedSportsUrl(activeSports), {method: 'GET'})
        ])
        .then(([resTop, resSelect]) => 
            Promise.all([resTop.json(), resSelect.json()])
        // ).then(([unsortedTop, unsortedSelect]) => 
        //     Promise.all([sortData(unsortedTop), sortData(unsortedSelect)])
        ).then(([dataTop, dataSelect]) => {
            setTopSportsNews(dataTop.articles);
            setSelectedSportsNews(dataSelect.articles);
            setTopSportsNewsLoading(false)
            setselectedSportsLoading(false);
        })
    }, [activeSports]);


    return (
        <SafeAreaView>
            <Header label={'Sports'} subLabel={'In-Depth Sports Coverage'} iconName={'sports-cricket'} />

            { 
                topSportsNewsLoading ? <Loading /> 
                
                : <TopHeadlines data={topSportsNews}/>
            
            }
            <View style = {styles.sportsSlider}>
                <MiniHeader label={"Categories"} />
                
                <View style={{position: 'relative', flexDirection: 'row', marginHorizontal: '4%'}}>
                    <CategoriesCard categories={sports} activeCategory={activeSports} handleCategoryChange={handleSportsChange} />
                </View>
            </View>
            { selectedSportsLoading ? <Loading />
                
                : <ScrollView 
                            style={{marginTop: '2%'}}
                            contentContainerStyle={{
                                paddingBottom: hp(70)
                            }}
                        >
                                <RecommendedNewsSection newsProps={selectedSportsNews} label="Sports" />
                </ScrollView>
            }      
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sportsSlider: ( 
        (Platform.OS === 'ios') ? {
            marginTop: '50%'
        } : {}
    )
})

//make this component available to the app
export default Sports;
