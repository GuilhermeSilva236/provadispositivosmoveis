import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'; // Importe o TextInputMask

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
  const [showPassword, setShowPassword] = useState(false);

  const InscrevaValidador = Yup.object().shape({
    nome: Yup.string()
      .required('Campo obrigatório!')
      .min(3, 'Mínimo de 3 letras')
      .max(20, 'Máximo de 20 letras'),
    Cpf: Yup.string()
      .required('Campo obrigatório!')
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido. Use o formato XXX.XXX.XXX-XX'),
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
                style={{
                  ...styles.input,
                  underlineColor: 'black'
                }}
                label={'Nome'}
                mode='outlined'
                onChangeText={(text) => {
                  const formattedName =
                    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                  handleChange('nome')(formattedName);
                }}
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
                  borderColor: touched.Cpf && errors.Cpf ? 'red' : Colors.DARK_THREE, // Alteração na cor da borda
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginVertical: 8,
                }}
                type={'cpf'}
                placeholder={'CPF'}
                placeholderTextColor={'#888'}
                options={{
                  maskType: 'CPF',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                onChangeText={handleChange('Cpf')}
                onBlur={handleBlur('Cpf')}
                value={values.Cpf}
                onFocus={() => {
                  // Lógica para animação quando o campo CPF estiver em foco
                  console.log('Campo CPF em foco');
                }}
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

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={{ ...styles.input, flex: 1, underlineColor: 'black' }}
                  label={'Senha'}
                  mode='outlined'
                  onChangeText={handleChange('Senha')}
                  onBlur={handleBlur('Senha')}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                  value={values.Senha}
                  error={errors.Senha && touched.Senha}
                  secureTextEntry={!showPassword}
                />
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="black"
                  onPress={() => setShowPassword(!showPassword)}
                />
              </View>
              {errors.Senha && touched.Senha && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.Senha}</Text>
              )}


              <TextInputMask
                style={{ 
                  ...styles.input,
                  height: 50,
                  borderWidth: 1,
                  borderColor: touched.Cpf && errors.Cpf ? 'red' : Colors.DARK_THREE, // Alteração na cor da borda
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginVertical: 8,
                 }}
                label={'Telefone'}
                mode='outlined'
                keyboardType='numeric'
                type={'cel-phone'} // Define o tipo de máscara para número de celular
                options={{
                  maskType: 'BRL', // Define o tipo de máscara para o Brasil
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                onChangeText={handleChange('Telefone')}
                onBlur={handleBlur('Telefone')}
                theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                value={values.Telefone}
                error={errors.Telefone && touched.Telefone}
                placeholder="Telefone" // Adiciona o texto "Telefone" dentro do campo
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
    </View >
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
    marginVertical: 8,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
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