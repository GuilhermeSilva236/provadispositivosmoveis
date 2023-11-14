import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function FormVeiculoAsyncStorage({ navigation, route }) {
  const { acao, veiculo: veiculoAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log('Veiculo antigo -> ', veiculoAntigo);

    if (veiculoAntigo) {
      setNome(veiculoAntigo.nome);
      setPlaca(veiculoAntigo.placa);
      setModelo(veiculoAntigo.modelo);
      setAno(veiculoAntigo.ano);
      setCor(veiculoAntigo.cor);
    }
  }, []);

  function salvar() {
    if (nome === '' || placa === '' || modelo === '' || ano === '' || cor === '') {
      setShowMensagemErro(true);
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos!',
      });
    } else {
      setShowMensagemErro(false);

      const novoVeiculo = {
        nome: nome,
        placa: placa,
        modelo: modelo,
        ano: ano,
        cor: cor,
      };

      const objetoEmString = JSON.stringify(novoVeiculo);
      console.log("🚀 ~ file: FormVeiculoAsyncStorage.js:51 ~ salvar ~ objetoEmString:", objetoEmString);

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormVeiculoAsyncStorage.js:56 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (veiculoAntigo) {
        acao(veiculoAntigo, novoVeiculo);
      } else {
        acao(novoVeiculo);
      }

      Toast.show({
        type: 'success',
        text1: 'Veículo salvo com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {veiculoAntigo ? 'Editar Veículo' : 'Adicionar Veículo'}
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
          label={'Placa'}
          mode='outlined'
          value={placa}
          onChangeText={(text) => setPlaca(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Modelo'}
          mode='outlined'
          value={modelo}
          onChangeText={(text) => setModelo(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Ano'}
          mode='outlined'
          keyboardType='numeric'
          value={ano}
          onChangeText={(text) => setAno(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Cor'}
          mode='outlined'
          value={cor}
          onChangeText={(text) => setCor(text)}
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
