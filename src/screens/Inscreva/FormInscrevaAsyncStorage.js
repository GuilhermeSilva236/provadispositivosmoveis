import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function FormInscrevaAsyncStorage({ navigation, route }) {

    const { acao, Inscricao: InscricaoAntigo } = route.params;

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [showMensagemErro, setShowMensagemErro] = useState(false);

    useEffect(() => {
        console.log('Inscricao -> ', InscricaoAntigo);

        if (InscricaoAntigo) {
            setNome(InscricaoAntigo.nome);
            setTelefone(InscricaoAntigo.telefone);
            setEmail(InscricaoAntigo.email);
            setSenha(InscricaoAntigo.senha);
        }
    }, []);

    function salvar() {
        if (nome === '' || telefone === '' || email === '' || senha === '') {
            setShowMensagemErro(true);
        } else {
            setShowMensagemErro(false);

            const novoInscricao = {
                nome: nome,
                telefone: telefone,
                email: email,
                senha: senha
            };

            if (InscricaoAntigo) {
                acao(InscricaoAntigo, novoInscricao);
            } else {
                acao(novoInscricao);
            }

            AsyncStorage.setItem('Inscricaos', JSON.stringify(novoInscricao)).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Inscricao salvo com sucesso!'
                });
                navigation.goBack();
            }).catch((error) => {
                console.error('Erro ao salvar o Inscricao: ', error);
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text variant='titleLarge' style={styles.title}>{InscricaoAntigo ? 'Editar Cadastro' : 'Inscrever-se'}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={{ ...styles.input, underlineColor: 'black' }}
                    label={'Nome Completo'}
                    mode='outlined'
                    value={nome}
                    onChangeText={text => setNome(text)}
                    onFocus={() => setShowMensagemErro(false)}
                    theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />

                <TextInput
                    style={{ ...styles.input, underlineColor: 'black' }}
                    label={'Número de Telefone'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={telefone}
                    onChangeText={text => setTelefone(text)}
                    onFocus={() => setShowMensagemErro(false)}
                    theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />

                <TextInput
                    style={{ ...styles.input, underlineColor: 'black' }}
                    label={'Endereço de E-mail'}
                    mode='outlined'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    onFocus={() => setShowMensagemErro(false)}
                    theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />

                <TextInput
                    style={{ ...styles.input, underlineColor: 'black' }}
                    label={'Senha'}
                    mode='outlined'
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={text => setSenha(text)}
                    onFocus={() => setShowMensagemErro(false)}
                    theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />

                {showMensagemErro &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                }
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    style={{ ...styles.button, backgroundColor: Colors.DARK_FIVE }}
                    mode='contained-tonal'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>

                <Button
                    style={{ ...styles.button, backgroundColor: Colors.DARK_FOUR }}
                    mode='contained'
                    onPress={salvar}
                >
                    Salvar
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        margin: 10
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
});
