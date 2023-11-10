import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function FormInscrevaAsyncStorage({ navigation, route }) {
  const { acao, inscricao: inscricaoAntiga } = route.params;

  const [nome, setNome] = useState('');
  const [Cpf, setCpf] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [Telefone, setTelefone] = useState('');

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log('inscricao -> ', inscricaoAntiga);

    if (inscricaoAntiga) {
      setNome(inscricaoAntiga.nome);
      setCpf(inscricaoAntiga.Cpf);
      setEmail(inscricaoAntiga.Email);
      setSenha(inscricaoAntiga.Senha);
      setTelefone(inscricaoAntiga.Telefone);
    }
  }, []);

  function salvar() {
    if (nome === '' || Cpf === '' || Email === '' || Senha === ''|| Telefone === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novaInscricao = {
        nome: nome,
        Cpf: Cpf,
        Email: Email,
        Senha: Senha,
        Telefone: Telefone,
      };

      const objetoEmString = JSON.stringify(novaInscricao);
      console.log("🚀 ~ file: FormInscrevaAsyncStorage.js:51 ~ salvar ~ objetoEmString:", objetoEmString);

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormInscrevaAsyncStorage.js:56 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (inscricaoAntiga) {
        acao(inscricaoAntiga, novaInscricao);
      } else {
        acao(novaInscricao);
      }

      Toast.show({
        type: 'success',
        text1: 'Inscrição salva com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {inscricaoAntiga ? 'Editar Inscrição' : 'Adicionar Inscrição'}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Nome'}
          mode='outlined'
          value={nome}
          onChangeText={(text) => setNome(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'CPF'}
          mode='outlined'
          keyboardType='numeric'
          value={Cpf}
          onChangeText={(text) => setCpf(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Email'}
          mode='outlined'
          keyboardType='numeric'
          value={Email}
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Senha'}
          mode='outlined'
          keyboardType='numeric'
          value={Senha}
          onChangeText={(text) => setSenha(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Telefone'}
          mode='outlined'
          keyboardType='numeric'
          value={Senha}
          onChangeText={(text) => setTelefone(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        {showMensagemErro && (
          <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='contained-tonal' onPress={() => navigation.goBack()} labelStyle={{ color: 'white' }}>
          Voltar
        </Button>

        <Button style={styles.button} mode='contained' onPress={salvar} >
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
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    width: '90%',
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.DARK_ONE,
  },
});
