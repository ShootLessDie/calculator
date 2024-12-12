import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-paper'

interface Props<T> {
  data: T[];
  renderItem(item:T): JSX.Element;
  columnNumber:number;
}

const GridView = <T extends object>({data, columnNumber, renderItem}:Props<T>) => {
  const screenwidth = Dimensions.get('screen').width;
  const itemWidth = screenwidth / columnNumber;

  return <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
    {data.map(item => 
    <View style={{width: itemWidth, height: itemWidth, alignContent:"center", justifyContent:"center"}}>
      {renderItem(item)}
    </View>
  )}
          </View>
}

type InputKeyboardData = {
  value?:string,
  iconName?:string
  id:number
}

const inputKeyboardData:InputKeyboardData[] = [
  {id: 1, value: "AC"},
  {id: 2, iconName: "code-parentheses"},
  {id: 3, iconName: "percent-outline"},
  {id: 4, iconName: "division"},
  {id: 5, value: "7"},
  {id: 6, value: "8"},
  {id: 7, value: "9"},
  {id: 8, iconName: "close"},
  {id: 9, value: "4"},
  {id: 10, value: "5"},
  {id: 11, value: "6"},
  {id: 12, iconName: "minus"},
  {id: 13, value: "1"},
  {id: 14, value: "2"},
  {id: 15, value: "3"},
  {id: 16, iconName: "plus"},
  {id: 17, value: "0"},
  {id: 18, value: "."},
  {id: 19, iconName: "backspace"},
  {id: 20, iconName: "equal"},
]

const renderButton = ({id, iconName, value}:InputKeyboardData):JSX.Element => <Button mode='contained-tonal' id={String(id)}>
  {value ? <Text style={styles.text}>{value}</Text> : <Icon source={iconName} size={20}></Icon>}
</Button>

const Input = () => {
  return (
    <View style={styles.container}>
      <GridView
        data={inputKeyboardData}
        columnNumber={4}
        renderItem={renderButton}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:10,
  },
  row:{
    flexDirection:'row'
  },
  item: {
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  text:{
    fontSize:20,
    color: "#50443a"
  }
});

export default Input