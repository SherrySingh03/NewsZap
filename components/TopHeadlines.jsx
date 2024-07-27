//import liraries
import { useNavigation, useRouter } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel'
import TopHeadlinesCard from './TopHeadlinesCard';

const {width, height} = Dimensions.get("window");
// create a component
const TopHeadlines = ( {data, label} ) => {

    const navigation = useRouter();

    const handleClick = (item) => {
        navigation.navigate({pathname: "/newsdetails", params: {newsObject: item.url}});
    };


    return (
        <View style={{alignItems: 'center', flex:1}}>

            {/* <Carousel 
                loop
                width={width}
                // height={width/3}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={1000}
                renderItem={({item}) => (
                    <TopHeadlinesCard item={item} handleClick={handleClick} />
                )}
            /> */}
            <Carousel
                loop
                width={width * 0.95}
                height={width / 2}
                autoPlay={true}
                style={{ alignItems: 'center', borderRadius: '10px', marginTop: 2}}
                pagingEnabled={true}
                data={data}
                scrollAnimationDuration={1000}
                renderItem={({item}) => (
                    <TopHeadlinesCard item={item} handleClick={handleClick} />
                )}
            />


            

        </View>
    );
};

// define your styles
// const styles = StyleSheet.create({
//     background: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         height: 300,
//       },
// });

//make this component available to the app
export default TopHeadlines;
