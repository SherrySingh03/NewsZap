//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// create a component
export default function CategoriesCard({
    categories, 
    activeCategory, 
    handleCategoryChange}){

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{"marginLeft":"2%", marginTop: '2%', borderRadius: '5px'}}
                contentContainerStyle={{
                    paddingRight: 75
                }}
            >
                {
                    categories.map((category, index) => {
                        let isActive = category.title == activeCategory;
                        let activeButtonColor = isActive ? "red" : "#838383"
                        let activeTextColor = isActive ? "white": "white"

                        return (
                            <TouchableOpacity
                                    key={index}
                                    onPress={() => handleCategoryChange(category.title)}
                                    style={{display: 'flex', alignItems: 'center', marginTop: '0%'}}
                                    >
                                    <View
                                        style={{marginHorizontal: '1%',"paddingTop":hp(1.2),"paddingBottom":hp(1.2),"paddingLeft":hp(2),"paddingRight":hp(2),"borderRadius":"9999px", backgroundColor: `${activeButtonColor}`}}
                                    >
                                        <Text
                                        style={{
                                            fontSize: hp(2),
                                            textTransform: 'capitalize',
                                            color: `${activeTextColor}`
                                        }}
                                        >
                                        {category.title}
                                        </Text>
                                    </View>
                            </TouchableOpacity>
                        )
                    } )
                }


            </ScrollView>
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

