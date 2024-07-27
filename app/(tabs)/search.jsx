//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { debounce } from 'lodash';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { searchNewsURL } from '../../utils/NewsAPI';
import Loading from '../../components/Loading';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RecommendedNewsSection from '../../components/RecommendedNewsSection';

// create a component
const Search = () => {

    // const navigation = useNavigation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searchItem, setSearchItem] = useState("")
    const [resultsObtained, setResultsObtained] = useState(true)
    const [keyboardUp, setKeyboardUp] = useState(false);

    const fetchSearchNews = async(search) => {
            
        console.log("Searched for: ", search)
        const resp = await fetch(searchNewsURL(search), {method: 'GET'})
        const searchResults = await resp.json();

        console.log(searchResults.articles.length)
        setResults(searchResults.articles);

        if(searchResults.articles.length < 1) {
            setResultsObtained(false);
        } else{
            setResultsObtained(true);
        }
        setLoading(false);
    };

    const handleSearch = async (search) => {
        if(search && search?.length > 2){
            
                setLoading(true)
                setResults([])
                setSearchItem(search);
                console.log(search);
                // console.log(searchItem);


                try {
                    
                    await fetchSearchNews(search);
                    console.log("Searched")


                } catch (error) {
                    console.log("Error searching ", error)
                }
            }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1500), []);

    return (
        <SafeAreaView>
            <Header label={"Search"} subLabel={"Quickly Find Your Topics"} iconName={'manage-search'} />

            <View style={styles.searchBarView}>

                <Pressable style={{paddingLeft: '3%'}}>
                    <Feather name="search" size={25} color="gray"/>
                </Pressable>

                <TextInput 
                    onChangeText={handleTextDebounce}
                    placeholder='Search for news'
                    placeholderTextColor={'gray'}
                    style={styles.searchBar}
                    ref={(input) => this.textInput = input}
                    onFocus={() => setKeyboardUp(true)}
                    onBlur={() => setKeyboardUp(false)}
                />
                {
                
                keyboardUp ? 
                    
                    <AntDesign name="closecircleo" size={18} color={'gray'} onPress={()=> {this.textInput.clear()}}style={{marginRight: '2%'}}/>

                           : null
                }
            </View>


            {
                loading ? 
                            
                <Loading />
                           
                : 

                resultsObtained ? 

                <ScrollView
                contentContainerStyle={{
                    paddingBottom: hp(5),
                }}
                >
                <RecommendedNewsSection newsProps={results} label="Search Results" />
                </ScrollView>

                : 
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.noResultsTextContainer}>
                            {<MaterialIcons name="search-off" size={35} color={'gray'} style={{paddingBottom: '10%'}} />}
                            <Text style={styles.noResultsText}>Looks like we couldn’t find anything. Try searching for something else or check back later! </Text>
                        </View>
                    </View>
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchBarView: {
        marginTop: '1%',
        "padding":"2%",
        // "marginLeft":"2%",
        // "marginRight":"2%",
        marginHorizontal: '4%',
        "marginBottom":"2%",
        "flexDirection":"row",
        "justifyContent":"space-between",
        "alignItems":"center",
        "borderRadius":"9999px",
        "backgroundColor":"rgb(235 235 235)",
    },
    searchBar: {
        paddingLeft: '5%',
        flex: 1,
        fontSize: 16,
    },
    noResultsText:{
        color: 'gray', 
        textAlign: 'center'       
    },
    noResultsTextContainer: {
        marginTop: '50%',
        alignItems:'center',
        width: '60%',
        
    }
})

//make this component available to the app
export default Search;
