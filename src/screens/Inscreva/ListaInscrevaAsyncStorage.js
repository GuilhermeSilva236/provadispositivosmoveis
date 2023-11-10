import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function ListaInscrevaAsyncStorage({ navigation, route }) {
  const [usuarios, setUsuarios] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [usuarioASerExcluido, setUsuarioASerExcluido] = useState(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    const response = await AsyncStorage.getItem('usuarios');
    console.log("🚀 ~ file: ListaInscrevaAsyncStorage.js:21 ~ loadUsuarios ~ response:", response);
    const usuariosStorage = response ? JSON.parse(response) : [];
    setUsuarios(usuariosStorage);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarUsuario(usuario) {
    let novaListaUsuarios = usuarios;
    novaListaUsuarios.push(usuario);
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios));
    setUsuarios(novaListaUsuarios);
  }

  async function editarUsuario(usuarioAntigo, novosDados) {
    console.log('USUÁRIO ANTIGO -> ', usuarioAntigo);
    console.log('DADOS NOVOS -> ', novosDados);

    const novaListaUsuarios = usuarios.map((usuario) => {
      if (usuario === usuarioAntigo) {
        return novosDados;
      } else {
        return usuario;
      }
    });

    await AsyncStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios));
    setUsuarios(novaListaUsuarios);
  }

  async function excluirUsuario(usuario) {
    const novaListaUsuarios = usuarios.filter((u) => u !== usuario);
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios));
    setUsuarios(novaListaUsuarios);
    Toast.show({
      type: 'success',
      text1: 'Usuário excluído com sucesso!',
    });
  }

  function handleExcluirUsuario() {
    excluirUsuario(usuarioASerExcluido);
    setUsuarioASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Usuários
      </Text>

      <FlatList
        style={styles.list}
        data={usuarios}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text colorvariant='titleMedium' style={{ color: Colors.DEFAULT_WHITE}}>{item?.nome}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>CPF: {item?.Cpf}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>E-mail: {item?.Email} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Senha: {item.Senha} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Telefone: {item.Telefone} </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormInscrevaAsyncStorage', { acao: editarUsuario, inscricao: item })}  labelStyle={{ color: Colors.DARK_ONE }}>
                Editar
              </Button>
              <Button
                onPress={() => {
                  setUsuarioASerExcluido(item);
                  showModal();
                }}
                style={{ backgroundColor: Colors.DARK_ONE }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon='plus'
        style={styles.fab}
        color="white"
        onPress={() => navigation.push('FormInscrevaAsyncStorage', { acao: adicionarUsuario })}
      />

      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium' style={{ color: Colors.WHITE }}>Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }} >Voltar</Button>
            <Button onPress={handleExcluirUsuario} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: Colors.DARK_ONE,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },
});
