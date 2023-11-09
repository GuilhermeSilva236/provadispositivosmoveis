import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../renderizacao';

export default function ListaInscrevaAsyncStorage({ navigation, route }) {
    const [Inscricaos, setInscricaos] = useState([]);
    const [showModalExcluirInscricao, setShowModalExcluirInscricao] = useState(false);
    const [InscricaoASerExcluido, setInscricaoASerExcluido] = useState(null);

    useEffect(() => {
        loadInscricaos();
    }, []);

    async function loadInscricaos() {
        const response = await AsyncStorage.getItem('Inscricaos');
        const InscricaosStorage = response ? JSON.parse(response) : [];
        setInscricaos(InscricaosStorage);
    }

    const showModal = () => setShowModalExcluirInscricao(true);

    const hideModal = () => setShowModalExcluirInscricao(false);

    async function adicionarInscricao(Inscricao) {
        let novaListaInscricaos = Inscricaos;
        novaListaInscricaos.push(Inscricao);
        await AsyncStorage.setItem('Inscricaos', JSON.stringify(novaListaInscricaos));
        setInscricaos(novaListaInscricaos);
    }

    async function editarInscricao(InscricaoAntigo, novosDados) {
        const novaListaInscricaos = Inscricaos.map(Inscricao => {
            if (Inscricao === InscricaoAntigo) {
                return novosDados;
            } else {
                return Inscricao;
            }
        });

        await AsyncStorage.setItem('Inscricaos', JSON.stringify(novaListaInscricaos));
        setInscricaos(novaListaInscricaos);
    }

    async function excluirInscricao(Inscricao) {
        const novaListaInscricaos = Inscricaos.filter(a => a !== Inscricao);
        await AsyncStorage.setItem('Inscricaos', JSON.stringify(novaListaInscricaos));
        setInscricaos(novaListaInscricaos);
        Toast.show({
            type: 'success',
            text1: 'Inscricao excluído com sucesso!'
        });
    }

    function handleExcluirInscricao() {
        excluirInscricao(InscricaoASerExcluido);
        setInscricaoASerExcluido(null);
        hideModal();
    }

    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title}>Lista de Inscrição</Text>

            <FlatList
                style={styles.list}
                data={Inscricaos}
                renderItem={({ item }) => (
                    <Card
                        mode='outlined'
                        style={styles.card}
                    >
                        <Card.Content
                            style={styles.cardContent}
                        >
                            <View style={styles.infoContainer}>
                                <Text variant='titleMedium' style={{ color: Colors.DEFAULT_WHITE }}>Nome: {item?.nome}</Text>
                                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Telefone: {item?.telefone}</Text>
                                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Email: {item?.email}</Text>
                                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Senha: {item?.senha}</Text>
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                onPress={() => navigation.push('FormInscrevaAsyncStorage', { acao: editarInscricao, Inscricao: item })}
                                style={{ backgroundColor: Colors.DARK_ONE }}
                                labelStyle={{ color: Colors.DEFAULT_WHITE }}
                            >
                                Editar
                            </Button>
                            <Button
                                onPress={() => {
                                    setInscricaoASerExcluido(item);
                                    showModal();
                                }}
                                style={{ backgroundColor: Colors.DARK_ONE }}
                                labelStyle={{ color: Colors.DEFAULT_WHITE }}
                            >
                                Excluir
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
            />

            {/* Botão Flutuante */}
            <FAB
                label="Increva-se"
                style={{ ...styles.fab, backgroundColor: Colors.DARK_FOUR }}
                onPress={() => navigation.push('FormInscrevaAsyncStorage', { acao: adicionarInscricao })}
                labelStyle={{
                    color: Colors.DEFAULT_WHITE
                }}
                color={Colors.DEFAULT_WHITE}  // Adicionando a cor quando pressionado
            />
            {/* Modal Excluir Inscricao */}
            <Portal>
                <Dialog visible={showModalExcluirInscricao} onDismiss={hideModal}>
                    <Dialog.Title>Atenção!</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Tem certeza que deseja excluir este Inscricao?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideModal} style={{ color: Colors.DEFAULT_BLACK }}>Voltar</Button>
                        <Button onPress={handleExcluirInscricao} color={Colors.DEFAULT_BLACK}>Tenho Certeza</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DARK_ONE, // Adicionando o fundo preto
    },
    title: {
        fontWeight: 'bold',
        margin: 10,
        marginTop: 30,
        color: Colors.DEFAULT_WHITE
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    list: {
        width: '90%',
    },
    card: {
        marginTop: 15,
        borderColor: Colors.DARK_ONE
    },
    cardContent: {
        flexDirection: 'row',
        borderWidth: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: 15,
        backgroundColor: 'black',
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
});
