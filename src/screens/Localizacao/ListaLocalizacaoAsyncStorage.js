import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function ListaLocalizacaoAsyncStorage({ navigation, route }) {
  const [localizacao, setLocalizacao] = useState([]);
  const [showModalExcluirLocalizacao, setShowModalExcluirLocalizacao] = useState(false);
  const [localizacaoASerExcluido, setLocalizacaoASerExcluido] = useState(null);

  useEffect(() => {
    loadLocalizacao();
  }, []);

  async function loadLocalizacao() {
    const response = await AsyncStorage.getItem('localizacao');
    console.log("🚀 ~ file: ListaLocalizacaoAsyncStorage.js:21 ~ loadLocalizacao ~ response:", response);
    const localizacaoStorage = response ? JSON.parse(response) : [];
    setLocalizacao(localizacaoStorage);
  }

  const showModal = () => setShowModalExcluirLocalizacao(true);

  const hideModal = () => setShowModalExcluirLocalizacao(false);

  async function adicionarLocalizacao(novaLocalizacao) {
    let novaListaLocalizacao = localizacao;
    novaListaLocalizacao.push(novaLocalizacao);
    await AsyncStorage.setItem('localizacao', JSON.stringify(novaListaLocalizacao));
    setLocalizacao(novaListaLocalizacao);
  }

  async function editarLocalizacao(localizacaoAntiga, novosDados) {
    console.log('LOCALIZAÇÃO ANTIGA -> ', localizacaoAntiga);
    console.log('DADOS NOVOS -> ', novosDados);

    const novaListaLocalizacao = localizacao.map((item) => {
      if (item === localizacaoAntiga) {
        return novosDados;
      } else {
        return item;
      }
    });

    await AsyncStorage.setItem('localizacao', JSON.stringify(novaListaLocalizacao));
    setLocalizacao(novaListaLocalizacao);
  }

  async function excluirLocalizacao(localizacao) {
    const novaListaLocalizacao = localizacao.filter((item) => item !== localizacao);
    await AsyncStorage.setItem('localizacao', JSON.stringify(novaListaLocalizacao));
    setLocalizacao(novaListaLocalizacao);
    Toast.show({
      type: 'success',
      text1: 'Localizacao excluído com sucesso!',
    });
  }

  function handleExcluirLocalizacao() {
    excluirLocalizacao(localizacaoASerExcluido);
    setLocalizacaoASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Localização
      </Text>

      <FlatList
        style={styles.list}
        data={localizacao}
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
              <Button onPress={() => navigation.push('FormLocalizacaoAsyncStorage', { acao: editarLocalizacao, inscricao: item })}  labelStyle={{ color: Colors.DARK_ONE }}>
                Editar
              </Button>
              <Button
                onPress={() => {
                  setLocalizacaoASerExcluido(item);
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
        onPress={() => navigation.push('FormLocalizacaoAsyncStorage', { acao: adicionarLocalizacao })}
      />

      {/* Modal Excluir Localizacao */}
      <Portal>
        <Dialog visible={showModalExcluirLocalizacao} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium' style={{ color: Colors.WHITE }}>Tem certeza que deseja excluir esta localizacao?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }} >Voltar</Button>
            <Button onPress={handleExcluirLocalizacao} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }}>Tenho Certeza</Button>
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
