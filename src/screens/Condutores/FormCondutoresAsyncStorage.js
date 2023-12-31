import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import { Colors } from '../../renderizacao';

export default function FormCondutoresAsyncStorage({ navigation, route }) {
  const { acao, condutor: condutorAntiga } = route.params;

  const [NomeSobrenome, setNomeSobrenome] = useState('');
  const [DataNascimento, setDataNascimento] = useState('');
  const [Validade, setValidade] = useState('');
  const [NumeroRegistro, setNumeroRegistro] = useState('');
  const [Nacionalidade, setNacionalidade] = useState('');

  useEffect(() => {
    if (condutorAntiga) {
      setNomeSobrenome(condutorAntiga.NomeSobrenome || '');
      setDataNascimento(condutorAntiga.DataNascimento || '');
      setValidade(condutorAntiga.Validade || '');
      setNumeroRegistro(condutorAntiga.NumeroRegistro || '');
      setNacionalidade(condutorAntiga.Nacionalidade || '');
    }
  }, [condutorAntiga]);

  function salvar(values) {
    const { NomeSobrenome, DataNascimento, Validade, NumeroRegistro, Nacionalidade } = values;

    if (!NomeSobrenome || !DataNascimento || !Validade || !NumeroRegistro || Nacionalidade === 'Selecione') {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos!',
      });
      return;
    }

    const novacondutor = {
      NomeSobrenome,
      DataNascimento,
      Validade,
      NumeroRegistro,
      Nacionalidade,
    };

    if (condutorAntiga) {
      acao(condutorAntiga, novacondutor);
    } else {
      acao(novacondutor);
    }

    Toast.show({
      type: 'success',
      text1: 'Inscrição salva com sucesso!',
    });

    navigation.goBack();
  }

  const InscrevaValidador = Yup.object().shape({
    NomeSobrenome: Yup.string().required('Campo obrigatório!'),
    DataNascimento: Yup.string().required('Campo obrigatório!'),
    Validade: Yup.string().required('Campo obrigatório!'),
    NumeroRegistro: Yup.string().required('Campo obrigatório!'),
    Nacionalidade: Yup.string().notOneOf(['Selecione'], 'Selecione uma nacionalidade válida').required('Campo obrigatório!'),
  });

  const nacionalidades = [
    'Selecione',
    'Português/a',
    'Espanhol/a',
    'Francês/a',
    'Italiano/a',
    'Alemão/alemã',
    'Inglês/inglesa',
    'Americano/americana',
    'Canadense',
    'Mexicano/mexicana',
  ];

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          NomeSobrenome: condutorAntiga ? condutorAntiga.NomeSobrenome || '' : '',
          DataNascimento: condutorAntiga ? condutorAntiga.DataNascimento || '' : '',
          Validade: condutorAntiga ? condutorAntiga.Validade || '' : '',
          NumeroRegistro: condutorAntiga ? condutorAntiga.NumeroRegistro || '' : '',
          Nacionalidade: condutorAntiga ? condutorAntiga.Nacionalidade || 'Selecione' : 'Selecione',
        }}
        validationSchema={InscrevaValidador}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <Text variant="titleLarge" style={styles.title}>
              {condutorAntiga ? 'Editar CNH' : 'Adicionar CNH'}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Nome e Sobrenome'}
                mode='outlined'
                onChangeText={handleChange('NomeSobrenome')}
                onBlur={handleBlur('NomeSobrenome')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.NomeSobrenome}
                error={errors.NomeSobrenome && touched.NomeSobrenome}
              />
              {errors.NomeSobrenome && touched.NomeSobrenome && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.NomeSobrenome}</Text>
              )}

              <TextInputMask
                style={{
                  ...styles.input,
                  height: 50,
                  borderWidth: 1,
                  borderColor: touched.DataNascimento && errors.DataNascimento ? 'red' : Colors.DARK_THREE, // Cor da borda vermelha
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginVertical: 8,
                }}
                label={'Data de Nascimento'}
                mode='outlined'
                keyboardType='numeric'
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                onChangeText={handleChange('DataNascimento')}
                onBlur={handleBlur('DataNascimento')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.DataNascimento}
                error={errors.DataNascimento && touched.DataNascimento}
                placeholder="Data de Nascimento: DD/MM/AAAA"
              />
              {errors.DataNascimento && touched.DataNascimento && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.DataNascimento}</Text>
              )}

              <TextInputMask
                style={{
                  ...styles.input,
                  height: 50,
                  borderWidth: 1,
                  borderColor: touched.Validade && errors.Validade ? 'red' : Colors.DARK_THREE, // Cor da borda vermelha
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginVertical: 8,
                }}
                label={'Validade'}
                mode='outlined'
                type={'datetime'}
                options={{
                  format: 'MM/YYYY',
                }}
                onChangeText={handleChange('Validade')}
                onBlur={handleBlur('Validade')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Validade}
                error={errors.Validade && touched.Validade}
                placeholder="Validade: MM/AAAA"
              />
              {errors.Validade && touched.Validade && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Validade}</Text>
              )}

<TextInputMask
              style={{ 
                ...styles.input,
                height: 50,
                borderWidth: 1,
                borderColor: touched.NumeroRegistro && errors.NumeroRegistro ? 'red' : Colors.DARK_THREE,
                borderRadius: 5,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                marginVertical: 8,
              }}
              label={'Número de Registro'}
              mode='outlined'
              type={'custom'}
              options={{
                mask: '99999999999', // Máscara para 11 dígitos numéricos
              }}
              onChangeText={handleChange('NumeroRegistro')}
              onBlur={handleBlur('NumeroRegistro')}
              theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
              value={values.NumeroRegistro}
              error={errors.NumeroRegistro && touched.NumeroRegistro}
              placeholder="Número de Registro" // Adicionar o texto desejado aqui
            />
            {errors.NumeroRegistro && touched.NumeroRegistro && (
              <Text style={{ color: 'red', marginLeft: 10 }}>{errors.NumeroRegistro}</Text>
            )}

              <View style={{ ...styles.input, marginBottom: 10 }}>
                <Text>Nacionalidade</Text>
                <Picker
                  style={{ ...styles.picker, ...Platform.select({ android: { marginLeft: -8 } }) }}
                  selectedValue={values.Nacionalidade}
                  onValueChange={(itemValue) => setFieldValue('Nacionalidade', itemValue)}
                  mode="dropdown"
                >
                  {nacionalidades.map((nacionalidade, index) => (
                    <Picker.Item key={index} label={nacionalidade} value={nacionalidade} />
                  ))}
                </Picker>
              </View>
              {errors.Nacionalidade && touched.Nacionalidade && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Nacionalidade}</Text>
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
    backgroundColor: 'black', // Defina a cor desejada para os botões
  },
});
