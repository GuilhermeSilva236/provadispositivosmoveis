import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

    if (!NomeSobrenome || !DataNascimento || !Validade || !NumeroRegistro || !Nacionalidade) {
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
    Validade: Yup.string().required('Campo obrigatório!'), // Corrigido para campo de Validade
    NumeroRegistro: Yup.string().required('Campo obrigatório!'),
    Nacionalidade: Yup.string().required('Campo obrigatório!'),
  });

  const showDatePicker = async (setFieldValue) => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        setDataNascimento(selectedDate.toLocaleDateString());
        setFieldValue('DataNascimento', selectedDate.toLocaleDateString());
      }
    } catch ({ message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          NomeSobrenome: condutorAntiga ? condutorAntiga.NomeSobrenome || '' : '',
          DataNascimento: condutorAntiga ? condutorAntiga.DataNascimento || '' : '',
          Validade: condutorAntiga ? condutorAntiga.Validade || '' : '',
          NumeroRegistro: condutorAntiga ? condutorAntiga.NumeroRegistro || '' : '',
          Nacionalidade: condutorAntiga ? condutorAntiga.Nacionalidade || '' : '',
        }}
        validationSchema={InscrevaValidador}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Data de Nascimento'}
                mode='outlined'
                keyboardType='numeric'
                onChangeText={handleChange('DataNascimento')}
                onBlur={handleBlur('DataNascimento')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.DataNascimento}
                error={errors.DataNascimento && touched.DataNascimento}
              />
              {errors.DataNascimento && touched.DataNascimento && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.DataNascimento}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Validade'}
                mode='outlined'
                onChangeText={handleChange('Validade')}
                onBlur={handleBlur('Validade')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Validade}
                error={errors.Validade && touched.Validade}
              />
              {errors.Validade && touched.Validade && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Validade}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Numero de Registro'}
                mode='outlined'
                onChangeText={handleChange('NumeroRegistro')}
                onBlur={handleBlur('NumeroRegistro')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.NumeroRegistro}
                error={errors.NumeroRegistro && touched.NumeroRegistro}
              />
              {errors.NumeroRegistro && touched.NumeroRegistro && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.NumeroRegistro}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Nacionalidade'}
                mode='outlined'
                keyboardType='numeric'
                onChangeText={handleChange('Nacionalidade')}
                onBlur={handleBlur('Nacionalidade')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Nacionalidade}
                error={errors.Nacionalidade && touched.Nacionalidade}
              />
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
