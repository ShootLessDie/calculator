import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Dimensions } from 'react-native'

const ResultDisplay = () => {

  return (
    <View style={{...styles.container}}>
      <Text>ResultDisplay</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#eedfd4",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flex:1
  },
  row:{
    flexDirection:'row'
  },
  item: {
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center', 
  },

});

export default ResultDisplay