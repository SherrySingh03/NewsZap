//import liraries
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../../constants/categories'
import { discoverNewsUrl } from '../../utils/NewsAPI';
import Loading from '../../components/Loading';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RecommendedNewsSection from '../../components/RecommendedNewsSection';
import DiscoverHeader from '../../components/DiscoverHeader';
import CategoriesLayout from '../../components/CategoriesLayout';
import Header from '../../components/Header';
import CategoriesCard from '../../components/CategoriesLayout';

// create a component
const Discover = () => {
    
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('business');
    const [discoverNews, setDiscoverNews] = useState([]);
    const [isDiscoverLoading, setDiscoverLoading] = useState(true);

    useEffect(() => {
        // console.log("Active category: ", activeCategory)
        fetchDiscover()
    }, [activeCategory])

    const handleChangeCategory = async (category) => {
        
        setActiveCategory(category);
        setDiscoverLoading(true);
        await fetchDiscover();
    };

    const fetchDiscover = async () => {
            
        const resp = await fetch(discoverNewsUrl(categories.find((el) => el.title === activeCategory).sources), {method: 'GET'})
        const content = await resp.json();
        
        setDiscoverNews(content.articles)
        setDiscoverLoading(false)
        // console.log(discoverNews);
            
            // setDiscoverNews(dataDiscover.articles);
            // setDiscoverLoading(false);
        }
    

    return (
        <SafeAreaView styles={styles.container}>
            <StatusBar style='dark'/>

            <Header label={'Discover'} subLabel={'News from all over the world'} iconName={'auto-awesome'}/>

            <View style={styles.searchBarView}>

                <Pressable style={{paddingLeft: '3%'}}>
                    <Feather name="search" size={25} color="gray"/>
                </Pressable>

                <TextInput 
                    onPress={() => router.navigate("/search")} 
                    editable={false}
                    placeholder='Search for news'
                    placeholderTextColor={'gray'}
                    style={styles.searchBar}

                />
            </View>

            <View style={{flexDirection: 'row', marginHorizontal: '4%'}}>
                <CategoriesCard categories={categories} activeCategory={activeCategory} handleCategoryChange={handleChangeCategory} />
                {/* <CategoriesCard categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/> */}
            </View>

            <DiscoverHeader label={activeCategory} />

            {
                isDiscoverLoading ? <Loading /> : 
                (
                    <ScrollView 
                        contentContainerStyle={{
                            paddingBottom: hp(70)
                        }}
                    >
                        <RecommendedNewsSection newsProps={discoverNews} label="Discovery" />
                    </ScrollView>
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingTop: '10%',
        flex: 1,
        backgroundColor: '#FCFBFA'
    },
    searchBarView: {
        marginTop: '0%',
        "padding":"2%",
        // "marginLeft":"2%",
        // "marginRight":"2%",
        marginHorizontal: '4%',
        "marginBottom":"2%",
        "flexDirection":"row",
        "justifyContent":"space-between",
        "alignItems":"center",
        "borderRadius":"9999px",
        "backgroundColor":"rgb(245 245 245)"
    },
    searchBar: {
        paddingLeft: '5%',
        flex: 1,
        fontSize: 16
    }
})
//make this component available to the app
export default Discover;
