//import libraries
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../components/TabBar'

const RootNavigator = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false, unmountOnBlur:true}}
      sceneContainerStyle = {{backgroundColor: '#FCFBFA'}}
      tabBar={props => <TabBar {...props}/>}
      
    >
      

      <Tabs.Screen
        name = "(tabs)/index"
      />

      <Tabs.Screen
        name = "(tabs)/home"
        options={{
          title: 'Home'
        }}
      />

      <Tabs.Screen
        name = "(tabs)/sports"
        options={{
          title: 'Sports'
        }}
      />
      <Tabs.Screen
        name = "(tabs)/discover"
        options={{
          title: 'Discover'
        }}
      />
      <Tabs.Screen
        name = "(tabs)/saved"
        options={{
          title: 'Saved'
        }}
      />
      <Tabs.Screen
        name = "(tabs)/search"
        options={{
          title: 'Search'
        }}
      />

      <Tabs.Screen
          name = "(tabs)/newsdetails"
          options={{
            href: null
          }}
        />

    </Tabs>
  )
}

//make this component available to the app
export default RootNavigator;
