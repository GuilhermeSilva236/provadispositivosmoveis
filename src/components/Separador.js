import React from 'react';
import {View} from 'react-native';

const Separador = ({height, width, ...extraProps}) => (
  <View style={{height, width, ...extraProps}} />
);

Separador.defaultProps = {
  height: 0,
  width: 0,
};

export default Separador;