import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote '@expo/vector-icons' instalado
import { AntDesign } from '@expo/vector-icons';

export default function StarRating({ classificacao, onChange }) {
  const totalEstrelas = 5;

  const renderEstrelas = () => {
    const estrelas = [];
    for (let i = 1; i <= totalEstrelas; i++) {
      estrelas.push(
        <TouchableOpacity key={i} onPress={() => onChange(i)}>
          <Ionicons
            name={i <= classificacao ? 'star' : 'star-outline'}
            size={30}
            color={i <= classificacao ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
    return estrelas;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {renderEstrelas()}
    </View>
  );
}
