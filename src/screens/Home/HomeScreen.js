import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

const HomeScreen = () => {
    const cards = [
        {
            id: 1,
            image: require('../../../assets/images/passageiro.png'),
            text: 'Quadrado 1',
        },
        {
            id: 2,
            image: require('../../../assets/images/passageiro.png'),
            text: 'Quadrado 2',
        },
        {
            id: 3,
            image: require('../../../assets/images/passageiro.png'),
            text: 'Quadrado 3',
        },
        {
            id: 4,
            image: require('../../../assets/images/passageiro.png'),
            text: 'Quadrado 4',
        },
        {
            id: 5,
            image: require('../../../assets/images/passageiro.png'),
            text: 'Quadrado 5',
        }
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
            </View>
        );
    };

    const { width } = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <View style={styles.carouselContainer}>
                <Carousel
                    data={cards}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    layout="default"
                />
            </View>
            <View style={styles.passengerSquareContainer}>
                {cards.map((item, index) => (
                    <View key={index} style={[styles.passengerSquare, index === 0 && styles.firstPassengerSquare]}>
                        <Image source={item.image} style={styles.squareImage} />
                        <Text style={styles.whiteText}>{item.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

HomeScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop: -400,
    },
    carouselContainer: {
        width: '100%',
        height: 300, // Aumentei a altura para 300
        overflow: 'hidden',
        marginBottom: 20,
        marginRight: 80,
        marginLeft: 80,
    },
    card: {
        width: '100%',
        height: 200, // Mantive a altura do card em 200
        marginBottom: 20,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    passengerSquareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 10,
        marginTop: 30,
    },
    passengerSquare: {
        width: '48%',
        height: 100,
        borderRadius: 8,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    firstPassengerSquare: {
        marginRight: 10,
    },
    squareImage: {
        width: 70,
        height: 70,
    },
    whiteText: {
        color: 'white',
        marginLeft: 10,
    },
});

export default HomeScreen;
