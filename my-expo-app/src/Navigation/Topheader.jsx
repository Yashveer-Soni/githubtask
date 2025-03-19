import {  Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const Topheader = () => {
    const route = useRoute();

    return (
        <View style={{paddingBottom:10}}>
            <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>{route.name}</Text>
        </View>
    )
}

export default Topheader
