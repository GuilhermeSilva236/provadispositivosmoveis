import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function FormVeiculoAsyncStorage({ navigation, route }) {
  const { acao, veiculo: veiculoAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');

  useEffect(() => {
    console.log('Veiculo antigo -> ', veiculoAntigo);

    if (veiculoAntigo) {
      setNome(veiculoAntigo.nome || '');
      setPlaca(veiculoAntigo.placa || '');
      setModelo(veiculoAntigo.modelo || '');
      setAno(veiculoAntigo.ano || '');
      setCor(veiculoAntigo.cor || '');
    }
  }, [veiculoAntigo]);

  function salvar(values) {
    const { nome, placa, modelo, ano, cor } = values;

    if (!nome || !placa || !modelo || !ano || !cor) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos!',
      });
      return; // Retorna sem fazer o salvamento se algum campo estiver vazio
    }

    const novoVeiculo = {
      nome,
      placa,
      modelo,
      ano,
      cor,
    };

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

  const VeiculoValidador = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    placa: Yup.string().required('Campo obrigatório!'),
    modelo: Yup.string().required('Campo obrigatório!'),
    ano: Yup.string().required('Campo obrigatório!'),
    cor: Yup.string().required('Campo obrigatório!'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: veiculoAntigo ? veiculoAntigo.nome || '' : '', // Checa se há veiculoAntigo e define valores iniciais
          placa: veiculoAntigo ? veiculoAntigo.placa || '' : '',
          modelo: veiculoAntigo ? veiculoAntigo.modelo || '' : '',
          ano: veiculoAntigo ? veiculoAntigo.ano || '' : '',
          cor: veiculoAntigo ? veiculoAntigo.cor || '' : '',
        }}
        validationSchema={VeiculoValidador}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text variant="titleLarge" style={styles.title}>
              {veiculoAntigo ? 'Editar Veículo' : 'Adicionar Veículo'}
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
                label={'Placa'}
                mode='outlined'
                onChangeText={handleChange('placa')}
                onBlur={handleBlur('placa')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.placa}
                error={errors.placa && touched.placa}
              />
              {errors.placa && touched.placa && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.placa}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Modelo'}
                mode='outlined'
                onChangeText={handleChange('modelo')}
                onBlur={handleBlur('modelo')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.modelo}
                error={errors.modelo && touched.modelo}
              />
              {errors.modelo && touched.modelo && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.modelo}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Ano'}
                mode='outlined'
                keyboardType='numeric'
                onChangeText={handleChange('ano')}
                onBlur={handleBlur('ano')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.ano}
                error={errors.ano && touched.ano}
              />
              {errors.ano && touched.ano && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.ano}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Cor'}
                mode='outlined'
                onChangeText={handleChange('cor')}
                onBlur={handleBlur('cor')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.cor}
                error={errors.cor && touched.cor}
              />
              {errors.cor && touched.cor && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.cor}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button style={styles.button} mode='contained-tonal' onPress={() => navigation.goBack()} labelStyle={{ color: 'white' }}>
                Voltar
              </Button>

              <Button style={styles.button} mode='contained' onPress={handleSubmit}>
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
