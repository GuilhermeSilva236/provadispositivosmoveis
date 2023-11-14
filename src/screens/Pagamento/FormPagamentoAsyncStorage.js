import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function FormPagamentoAsyncStorage({ navigation, route }) {
  const { acao, pagamento: pagamentoAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [Cpf, setCpf] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [Telefone, setTelefone] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [cvv, setCVV] = useState('');

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log('pagamento -> ', pagamentoAntigo);

    if (pagamentoAntigo) {
      setNome(pagamentoAntigo.nome);
      setCpf(pagamentoAntigo.Cpf);
      setEmail(pagamentoAntigo.Email);
      setSenha(pagamentoAntigo.Senha);
      setTelefone(pagamentoAntigo.Telefone);
      setNumeroCartao(pagamentoAntigo.numeroCartao || '');
      setDataValidade(pagamentoAntigo.dataValidade || '');
      setCVV(pagamentoAntigo.cvv || '');
    }
  }, []);

  function salvar() {
    if (
      nome === '' ||
      Cpf === '' ||
      Email === '' ||
      Senha === '' ||
      Telefone === '' ||
      numeroCartao === '' ||
      dataValidade === '' ||
      cvv === ''
    ) {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novoPagamento = {
        nome,
        Cpf,
        Email,
        Senha,
        Telefone,
        numeroCartao,
        dataValidade,
        cvv,
      };

      if (pagamentoAntigo) {
        acao(pagamentoAntigo, novoPagamento);
      } else {
        acao(novoPagamento);
      }

      Toast.show({
        type: 'success',
        text1: 'Pagamento salvo com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {pagamentoAntigo ? 'Editar Pagamento' : 'Adicionar Pagamento'}
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

        {/* ... Outros campos existentes ... */}

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Número do Cartão'}
          mode='outlined'
          keyboardType='numeric'
          value={numeroCartao}
          onChangeText={(text) => setNumeroCartao(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'Data de Validade'}
          mode='outlined'
          keyboardType='numeric'
          value={dataValidade}
          onChangeText={(text) => setDataValidade(text)}
          onFocus={() => setShowMensagemErro(false)}
          theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
        />

        <TextInput
          style={{ ...styles.input, underlineColor: 'black' }}
          label={'CVV'}
          mode='outlined'
          keyboardType='numeric'
          value={cvv}
          onChangeText={(text) => setCVV(text)}
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
