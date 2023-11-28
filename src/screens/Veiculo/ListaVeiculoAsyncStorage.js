import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function ListaVeiculoAsyncStorage({ navigation, route }) {
  const [veiculos, setVeiculos] = useState([]);
  const [showModalExcluirVeiculo, setShowModalExcluirVeiculo] = useState(false);
  const [veiculoASerExcluido, setVeiculoASerExcluido] = useState(null);

  useEffect(() => {
    loadVeiculos();
  }, []);

  async function loadVeiculos() {
    const response = await AsyncStorage.getItem('veiculos');
    console.log("🚀 ~ file: ListaVeiculoAsyncStorage.js:21 ~ loadVeiculos ~ response:", response);
    const veiculosStorage = response ? JSON.parse(response) : [];
    setVeiculos(veiculosStorage);
  }

  const showModal = () => setShowModalExcluirVeiculo(true);

  const hideModal = () => setShowModalExcluirVeiculo(false);

  async function adicionarVeiculo(veiculo) {
    let novaListaVeiculos = veiculos;
    novaListaVeiculos.push(veiculo);
    await AsyncStorage.setItem('veiculos', JSON.stringify(novaListaVeiculos));
    setVeiculos(novaListaVeiculos);
  }

  async function editarVeiculo(veiculoAntigo, novosDados) {
    console.log('VEÍCULO ANTIGO -> ', veiculoAntigo);
    console.log('DADOS NOVOS -> ', novosDados);

    const novaListaVeiculos = veiculos.map((veiculo) => {
      if (veiculo === veiculoAntigo) {
        return novosDados;
      } else {
        return veiculo;
      }
    });

    await AsyncStorage.setItem('veiculos', JSON.stringify(novaListaVeiculos));
    setVeiculos(novaListaVeiculos);
  }

  async function excluirVeiculo(veiculo) {
    const novaListaVeiculos = veiculos.filter((v) => v !== veiculo);
    await AsyncStorage.setItem('veiculos', JSON.stringify(novaListaVeiculos));
    setVeiculos(novaListaVeiculos);
    Toast.show({
      type: 'success',
      text1: 'Veículo excluído com sucesso!',
    });
  }

  function handleExcluirVeiculo() {
    excluirVeiculo(veiculoASerExcluido);
    setVeiculoASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Veículos
      </Text>

      <FlatList
        style={styles.list}
        data={veiculos}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text colorvariant='titleMedium' style={{ color: Colors.DEFAULT_WHITE}}>{item?.nome}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Placa: {item?.placa}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Modelo: {item?.modelo} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Cor: {item.cor} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Ano: {item?.ano} </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormVeiculoAsyncStorage', { acao: editarVeiculo, veiculo: item })}  labelStyle={{ color: Colors.DARK_ONE }}>
                Editar
              </Button>
              <Button
                onPress={() => {
                  setVeiculoASerExcluido(item);
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
        onPress={() => navigation.push('FormVeiculoAsyncStorage', { acao: adicionarVeiculo })}
      />

      {/* Modal Excluir Veículo */}
      <Portal>
        <Dialog visible={showModalExcluirVeiculo} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium' style={{ color: Colors.WHITE }}>Tem certeza que deseja excluir este veículo?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }} >Voltar</Button>
            <Button onPress={handleExcluirVeiculo} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }}>Tenho Certeza</Button>
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
