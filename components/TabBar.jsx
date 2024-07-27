//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';

// create a component
const TabBar = ({ state, descriptors, navigation}) => {

    const icons = {
        
        '(tabs)/home': (props) => <AntDesign name="home" size={26} color={grayColor} {...props}/>,
        '(tabs)/sports': (props) => <MaterialIcons name="sports-basketball" size={26} color={grayColor} {...props}/>,
        '(tabs)/discover': (props) => <Feather name="compass" size={26} color={grayColor} {...props}/>,
        '(tabs)/search': (props) => <Feather name="search" size={26} color={grayColor} {...props}/>,
        '(tabs)/saved': (props) => <MaterialIcons name="bookmark-outline" size={26} color={grayColor} {...props} />,
    }


    const primaryColor = 'red';
    const grayColor = '#737373'



    return (
        <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if(['(tabs)/index', '_sitemap', '+not-found', '(tabs)/newsdetails'].includes(route.name)) return null;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {
                icons[route.name]({
                    color: isFocused ? primaryColor: grayColor
                })
            }
            <Text style={{ color: isFocused ? primaryColor : grayColor, fontSize: 11}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    );
};

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 20,
        shadowOpacity: 0.6

    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    }
})


//make this component available to the app
export default TabBar;
