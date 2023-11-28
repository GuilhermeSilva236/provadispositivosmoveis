import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../renderizacao';

const HomeScreen = ({ navigation }) => {
    // Array para as imagens do carrossel
    const carouselImages = [
        {
            id: 1,
            image: require('../../../assets/images/uber3.webp.png'), // Substitua pelo caminho da imagem do carrossel
        },
        {
            id: 2,
            image: require('../../../assets/images/gif1.gif'), // Substitua pelo caminho da imagem do carrossel
        },
        {
            id: 3,
            image: require('../../../assets/images/REFFF_novo-1024x476.webp'), // Substitua pelo caminho da imagem do carrossel
        },
        
        // Adicione mais objetos conforme necessário
    ];

    // Array para os quadrados pretos
    const passengerSquares = [
        {
            id: 1,
            image: require('../../../assets/images/increve.png'), // Substitua pelo caminho da imagem do quadrado 1
            text: 'Inscreva-se',
            screen:'Inscrever-se'
        },
        {
            id: 2,
            image: require('../../../assets/images/passageiro.png'), // Substitua pelo caminho da imagem do quadrado 2
            text: 'Seja um de Nossos Condutores',
            screen:'Condutores'
        },
        {
            id: 3,
            image: require('../../../assets/images/carror.png'), // Substitua pelo caminho da imagem do quadrado 3
            text: 'Cadastre seu Veículo',
            screen:'Veiculos'
        },
        {
            id: 4,
            image: require('../../../assets/images/pagamento.png'), // Substitua pelo caminho da imagem do quadrado 4
            text: 'Efetue o Pagamento da Corrida',
            screen:'Pagamento'
        },
        {
            id: 5,
            image: require('../../../assets/images/loc.png'), // Substitua pelo caminho da imagem do quadrado 5
            text: 'Deixe seu Feedback',
            screen:'Feedback'
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
        const handleSquarePress = () => {
            navigation.navigate(item.screen);
        };

        return (
            <TouchableOpacity key={item.id} style={styles.passengerSquare} onPress={handleSquarePress}>
                <Image source={item.image} style={styles.squareImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.whiteText}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const { width } = Dimensions.get('window');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.background}>
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
    background: {
        backgroundColor: Colors.DARK_FOUR
    },
    carouselContainer: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
        marginBottom: 25,
        marginHorizontal: 0,

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

    },
    passengerSquare: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    firstPassengerSquare: {
        marginRight: 10,
    },
    squareImage: {
        width: 70,
        height: 70,
        marginLeft: 120,
        marginBottom: -25,
    },
    whiteText: {
        color: 'white',
        marginLeft: 10,
    },
    textContainer: {
        padding: 10,
        width: '100%',
        maxHeight: 170,
        maxWidth: 160,
        overflow: 'hidden',
    },
});

export default HomeScreen;