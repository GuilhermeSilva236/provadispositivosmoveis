import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function FormInscrevaAsyncStorage({ navigation, route }) {
  const { acao, inscricao: inscricaoAntiga } = route.params;

  const [nome, setNome] = useState('');
  const [Cpf, setCpf] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [Telefone, setTelefone] = useState('');

  useEffect(() => {
    if (inscricaoAntiga) {
      setNome(inscricaoAntiga.nome || '');
      setCpf(inscricaoAntiga.Cpf || '');
      setEmail(inscricaoAntiga.Email || '');
      setSenha(inscricaoAntiga.Senha || '');
      setTelefone(inscricaoAntiga.Telefone || '');
    }
  }, [inscricaoAntiga]);

  function salvar(values) {
    const { nome, Cpf, Email, Senha, Telefone } = values;

    if (!nome || !Cpf || !Email || !Senha || !Telefone) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos!',
      });
      return;
    }

    const novaInscricao = {
      nome,
      Cpf,
      Email,
      Senha,
      Telefone,
    };

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

  const InscrevaValidador = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    Cpf: Yup.string().required('Campo obrigatório!'),
    Email: Yup.string().email('Formato de e-mail inválido').required('Campo obrigatório!'),
    Senha: Yup.string().required('Campo obrigatório!'),
    Telefone: Yup.string().required('Campo obrigatório!'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: inscricaoAntiga ? inscricaoAntiga.nome || '' : '',
          Cpf: inscricaoAntiga ? inscricaoAntiga.Cpf || '' : '',
          Email: inscricaoAntiga ? inscricaoAntiga.Email || '' : '',
          Senha: inscricaoAntiga ? inscricaoAntiga.Senha || '' : '',
          Telefone: inscricaoAntiga ? inscricaoAntiga.Telefone || '' : '',
        }}
        validationSchema={InscrevaValidador}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text variant="titleLarge" style={styles.title}>
              {inscricaoAntiga ? 'Editar Inscrição' : 'Adicionar Inscrição'}
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
                label={'CPF'}
                mode='outlined'
                keyboardType='numeric'
                onChangeText={handleChange('Cpf')}
                onBlur={handleBlur('Cpf')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Cpf}
                error={errors.Cpf && touched.Cpf}
              />
              {errors.Cpf && touched.Cpf && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Cpf}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Email'}
                mode='outlined'
                onChangeText={handleChange('Email')}
                onBlur={handleBlur('Email')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Email}
                error={errors.Email && touched.Email}
              />
              {errors.Email && touched.Email && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Email}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Senha'}
                mode='outlined'
                onChangeText={handleChange('Senha')}
                onBlur={handleBlur('Senha')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Senha}
                error={errors.Senha && touched.Senha}
              />
              {errors.Senha && touched.Senha && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Senha}</Text>
              )}

              <TextInput
                style={{ ...styles.input, underlineColor: 'black' }}
                label={'Telefone'}
                mode='outlined'
                keyboardType='numeric'
                onChangeText={handleChange('Telefone')}
                onBlur={handleBlur('Telefone')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Telefone}
                error={errors.Telefone && touched.Telefone}
              />
              {errors.Telefone && touched.Telefone && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Telefone}</Text>
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
