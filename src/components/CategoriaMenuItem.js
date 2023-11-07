import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors, Images } from '../renderizacao';

const CategoriaMenuItem = ({name, logo, activeCategory, setActiveCategory}) => {
  return (
    <TouchableOpacity 
    key={name} 
    onPress={() => setActiveCategory(name)}
    style={styles.category()}>
      <Image source={Images[logo]} style={styles.categoryIcon( activeCategory === name)}/>
      <Text style={styles.categoryText(activeCategory === name)}>{name}</Text>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    category: (marginTop = 0) => ({
    alignItems: 'center',
    marginTop,
    }),
    categoryIcon: isActive => ({
        height: 30,
        width: 30,
        opacity: isActive ? 1 : 0.5,
    }), 
    categoryText: isActive => ({
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_WHITE,
        marginTop: 5,
        opacity: isActive ? 1 : 0.5
    }), 
});

export default CategoriaMenuItem