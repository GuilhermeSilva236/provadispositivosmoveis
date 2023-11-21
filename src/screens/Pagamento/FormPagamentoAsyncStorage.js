import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function FormPagamentoAsyncStorage({ navigation, route }) {
  const { acao, pagamento: pagamentoAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [cvv, setCVV] = useState('');

  useEffect(() => {
    console.log('pagamento -> ', pagamentoAntigo);

    if (pagamentoAntigo) {
      setNome(pagamentoAntigo.nome || '');
      setNumeroCartao(pagamentoAntigo.numeroCartao || '');
      setDataValidade(pagamentoAntigo.dataValidade || '');
      setCVV(pagamentoAntigo.cvv || '');
    }
  }, [pagamentoAntigo]);

  function salvar(values) {
    const { nome, numeroCartao, dataValidade, cvv } = values;

    if (!nome || !numeroCartao || !dataValidade || !cvv) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos!',
      });
      return; // Retorna sem fazer o salvamento se algum campo estiver vazio
    }

    const novoPagamento = {
      nome,
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

  const PagamentoValidador = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    numeroCartao: Yup.string().required('Campo obrigatório!'),
    dataValidade: Yup.string().required('Campo obrigatório!'),
    cvv: Yup.string().required('Campo obrigatório!'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: pagamentoAntigo ? pagamentoAntigo.nome || '' : '',
          numeroCartao: pagamentoAntigo ? pagamentoAntigo.numeroCartao || '' : '',
          dataValidade: pagamentoAntigo ? pagamentoAntigo.dataValidade || '' : '',
          cvv: pagamentoAntigo ? pagamentoAntigo.cvv || '' : '',
        }}
        validationSchema={PagamentoValidador}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text variant="titleLarge" style={styles.title}>
              {pagamentoAntigo ? 'Editar Pagamento' : 'Adicionar Pagamento'}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Nome'}
                mode='outlined'
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.nome}
                error={errors.nome && touched.nome}
              />

              {errors.nome && touched.nome && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.nome}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Número do Cartão'}
                mode='outlined'
                keyboardType='numeric'
                onChangeText={handleChange('numeroCartao')}
                onBlur={handleBlur('numeroCartao')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.numeroCartao}
                error={errors.numeroCartao && touched.numeroCartao}
              />

              {errors.numeroCartao && touched.numeroCartao && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.numeroCartao}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Data de Validade (MM/AA)'}
                mode='outlined'
                keyboardType='default'
                onChangeText={handleChange('dataValidade')}
                onBlur={handleBlur('dataValidade')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.dataValidade}
                error={errors.dataValidade && touched.dataValidade}
              />

              {errors.dataValidade && touched.dataValidade && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.dataValidade}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'CVV'}
                mode='outlined'
                keyboardType='numeric'
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.cvv}
                error={errors.cvv && touched.cvv}
              />

              {errors.cvv && touched.cvv && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.cvv}</Text>
              )}

            </View>

            <View style={styles.buttonContainer}>
              <Button style={styles.button} mode='contained-tonal' onPress={() => navigation.goBack()} labelStyle={{ color: 'white' }}>
                Voltar
              </Button>

              <Button style={styles.button} mode='contained' onPress={handleSubmit} >
                Salvar
              </Button>
            </View>
          </>
        )}
      </Formik>
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
