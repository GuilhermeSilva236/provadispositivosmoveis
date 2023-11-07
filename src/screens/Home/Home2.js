import React, { useState } from 'react';
import { StyleSheet,View, StatusBar } from 'react-native';
import { CategoriaMenuItem, Separador } from '../../components';
import { Colors, Categorianome } from '../../renderizacao';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DARK_FOUR}
        translucent
      />
      <Separador height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
        </View>
        <View style={styles.CategoriesContainer}>
          {Categorianome.CATEGORIES.map(({ name, logo }) => (
            <CategoriaMenuItem
              name={name}
              logo={logo}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DARK_FOUR,
    height: 100, // Reduz a altura do background
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: -1,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15, // Reduz o espaçamento superior
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
  SelectedLocationText: {
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    position: 'absolute',
    right: -2,
    top: -10,
  },
  CategoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});

export default HomeScreen;
