import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function ListaCondutoresAsyncStorage({ navigation, route }) {
  const [condutores, setCondutores] = useState([]);
  const [showModalExcluirCondutor, setShowModalExcluirCondutor] = useState(false);
  const [condutorASerExcluido, setCondutorASerExcluido] = useState(null);

  useEffect(() => {
    loadCondutores();
  }, []);

  async function loadCondutores() {
    const response = await AsyncStorage.getItem('condutores');
    const condutoresStorage = response ? JSON.parse(response) : [];
    setCondutores(condutoresStorage);
  }

  const showModal = () => setShowModalExcluirCondutor(true);
  const hideModal = () => setShowModalExcluirCondutor(false);

  async function adicionarCondutor(condutor) {
    let novaListaCondutores = [...condutores, condutor];
    await AsyncStorage.setItem('condutores', JSON.stringify(novaListaCondutores));
    setCondutores(novaListaCondutores);
  }

  async function editarCondutor(condutorAntiga, novosDados) {
    const novaListaCondutores = condutores.map((condutor) =>
      condutor === condutorAntiga ? novosDados : condutor
    );

    await AsyncStorage.setItem('condutores', JSON.stringify(novaListaCondutores));
    setCondutores(novaListaCondutores);
  }

  async function excluirCondutor(condutor) {
    const novaListaCondutores = condutores.filter((c) => c !== condutor);
    await AsyncStorage.setItem('condutores', JSON.stringify(novaListaCondutores));
    setCondutores(novaListaCondutores);

    Toast.show({
      type: 'success',
      text1: 'Condutor excluído com sucesso!',
    });
  }

  function handleExcluirCondutor() {
    excluirCondutor(condutorASerExcluido);
    setCondutorASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Condutores
      </Text>

      <FlatList
        style={styles.list}
        data={condutores}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text colorvariant='titleMedium' style={{ color: Colors.DEFAULT_WHITE }}>{item?.NomeSobrenome}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>DataNascimento: {item?.DataNascimento}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Validade: {item?.Validade} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>NumeroRegistro: {item.NumeroRegistro} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Nacionalidade: {item.Nacionalidade} </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormCondutoresAsyncStorage', { acao: editarCondutor, condutor: item })}  labelStyle={{ color: Colors.DARK_ONE }}>
                Editar
              </Button>
              <Button
                onPress={() => {
                  setCondutorASerExcluido(item);
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
        onPress={() => navigation.push('FormCondutoresAsyncStorage', { acao: adicionarCondutor })}
      />

      {/* Modal Excluir Condutor */}
      <Portal>
        <Dialog visible={showModalExcluirCondutor} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium' style={{ color: Colors.WHITE }}>Tem certeza que deseja excluir este condutor?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }} >Voltar</Button>
            <Button onPress={handleExcluirCondutor} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }}>Tenho Certeza</Button>
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
