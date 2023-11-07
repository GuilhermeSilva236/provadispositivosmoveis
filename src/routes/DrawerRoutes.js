import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/Home/HomeScreen'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='HomeScreen'>

            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            
        </Drawer.Navigator>

    )
}