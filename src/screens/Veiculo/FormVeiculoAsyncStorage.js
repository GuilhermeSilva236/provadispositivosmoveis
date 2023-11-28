import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';

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

    if (!nome || !placa || modelo === 'Selecionar' || !ano || cor === 'Selecionar') {
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
    modelo: Yup.string().notOneOf(['Selecionar'], 'Selecione um modelo válido').required('Campo obrigatório!'),
    ano: Yup.string().required('Campo obrigatório!'),
    cor: Yup.string().notOneOf(['Selecionar'], 'Selecione uma cor válida').required('Campo obrigatório!'),
  });

  const modelos = ['Selecionar', 'Carro', 'Moto']; // Substitua esses valores pelos seus modelos reais
  const cores = ['Selecionar', 'Vermelho', 'Azul', 'Verde', 'Preto', 'Branco', 'Prata', 'Outra']; // Adicione as cores desejadas

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: veiculoAntigo ? veiculoAntigo.nome || '' : '',
          placa: veiculoAntigo ? veiculoAntigo.placa || '' : '',
          modelo: veiculoAntigo ? veiculoAntigo.modelo || 'Selecionar' : 'Selecionar',
          ano: veiculoAntigo ? veiculoAntigo.ano || '' : '',
          cor: veiculoAntigo ? veiculoAntigo.cor || 'Selecionar' : 'Selecionar',
        }}
        validationSchema={VeiculoValidador}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
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

              <TextInputMask
                style={{
                  ...styles.input,
                  height: 50,
                  borderWidth: 1,
                  borderColor: errors.placa && touched.placa ? 'red' : Colors.DARK_THREE, // Alteração na cor da borda
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                }}
                placeholder="Placa" // Adicionando o texto "Placa" dentro do campo
                mode='outlined'
                onChangeText={handleChange('placa')}
                onBlur={handleBlur('placa')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.placa}
                error={errors.placa && touched.placa}
                type={'custom'}
                options={{
                  mask: 'AAA-9999', // Máscara de placa de carro
                }}
              />
              {errors.placa && touched.placa && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.placa}</Text>
              )}


              <View style={{ ...styles.input, marginBottom: 10 }}>
                <Text>Modelo</Text>
                <Picker
                  style={{ ...styles.picker, ...Platform.select({ android: { marginLeft: -8 } }) }}
                  selectedValue={values.modelo}
                  onValueChange={(itemValue) => setFieldValue('modelo', itemValue)}
                  mode="dropdown"
                >
                  {modelos.map((modelo, index) => (
                    <Picker.Item key={index} label={modelo} value={modelo} />
                  ))}
                </Picker>
              </View>
              {errors.modelo && touched.modelo && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.modelo}</Text>
              )}

              <View style={{ ...styles.input, marginBottom: 10 }}>
                <Text>Cor</Text>
                <Picker
                  style={{ ...styles.picker, ...Platform.select({ android: { marginLeft: -8 } }) }}
                  selectedValue={values.cor}
                  onValueChange={(itemValue) => setFieldValue('cor', itemValue)}
                  mode="dropdown"
                >
                  {cores.map((cor, index) => (
                    <Picker.Item key={index} label={cor} value={cor} />
                  ))}
                </Picker>
              </View>
              {errors.cor && touched.cor && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.cor}</Text>
              )}

              <TextInputMask
                style={{
                  ...styles.input,
                  height: 50,
                  borderWidth: 1,
                  borderColor: errors.ano && touched.ano ? 'red' : Colors.DARK_THREE, // Alteração na cor da borda
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                }}
                placeholder="Ano" // Texto dentro do campo
                keyboardType='numeric'
                onChangeText={handleChange('ano')}
                onBlur={handleBlur('ano')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.ano}
                error={errors.ano && touched.ano}
                type={'custom'}
                options={{
                  mask: '9999', // Máscara para o ano (AAAA)
                }}
              />
              {errors.ano && touched.ano && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.ano}</Text>
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
  picker: {
    height: 40,
    borderColor: 'black',
    borderBottomWidth: 1,
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
