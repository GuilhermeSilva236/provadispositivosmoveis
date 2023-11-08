import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

const HomeScreen = () => {
    // Array para as imagens do carrossel
    const carouselImages = [
        {
            id: 1,
            image: require('../../../assets/images/img1.png'), // Substitua pelo caminho da imagem do carrossel
        },
        {
            id: 2,
            image: require('../../../assets/images/1.png'), // Substitua pelo caminho da imagem do carrossel
        },
        {
            id: 3,
            image: require('../../../assets/images/1.png'), // Substitua pelo caminho da imagem do carrossel
        },
        
        // Adicione mais objetos conforme necessário
    ];

    // Array para os quadrados pretos
    const passengerSquares = [
        {
            id: 1,
            image: require('../../../assets/images/passageiro.png'), // Substitua pelo caminho da imagem do quadrado 1
            text: 'Quadrado 1',
        },
        {
            id: 2,
            image: require('../../../assets/images/passageiro.png'), // Substitua pelo caminho da imagem do quadrado 2
            text: 'Quadrado 2',
        },
        {
            id: 3,
            image: require('../../../assets/images/passageiro.png'), // Substitua pelo caminho da imagem do quadrado 3
            text: 'Quadrado 3',
        },
        {
            id: 4,
            image: require('../../../assets/images/passageiro.png'), // Substitua pelo caminho da imagem do quadrado 4
            text: 'Quadrado 4',
        },
        {
            id: 5,
            image: require('../../../assets/images/passageiro.png'), // Substitua pelo caminho da imagem do quadrado 5
            text: 'Quadrado 5',
        },
        // Adicione mais objetos conforme necessário
    ];

    const renderCarouselItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
            </View>
        );
    };

    const renderPassengerSquare = (item) => {
        return (
            <View key={item.id} style={styles.passengerSquare}>
                <Image source={item.image} style={styles.squareImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.whiteText}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const { width } = Dimensions.get('window');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.carouselContainer}>
                <Carousel
                    data={carouselImages}
                    renderItem={renderCarouselItem}
                    sliderWidth={width}
                    itemWidth={width}
                    layout="default"
                />
            </View>
            <View style={styles.passengerSquareContainer}>
                {passengerSquares.map(renderPassengerSquare)}
            </View>
        </ScrollView>
    );
};

HomeScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carouselContainer: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
        marginBottom: 20,
        marginHorizontal: -0,
    },
    card: {
        width: '100%',
        height: 200,
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
        marginTop: 20,
    },
    passengerSquare: {
        width: '48%',
        height: 100,
        borderRadius: 8,
        backgroundColor: 'black',
        justifyContent: 'flex-end', // Alinhar o conteúdo na parte inferior
        marginBottom: 20,
    },
    firstPassengerSquare: {
        marginRight: 10,
    },
    squareImage: {
        width: 70,
        height: 70,
        marginLeft: 120,
  
    },
    whiteText: {
        color: 'white',
        marginLeft: 10,
    },
    textContainer: {
        padding: 10,
        width: '100%',
   
    },
});

export default HomeScreen;
