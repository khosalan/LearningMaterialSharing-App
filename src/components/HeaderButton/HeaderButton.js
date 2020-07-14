import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors} from '../../utils/constant';

const CustomHeaderButtom = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      iconSize={26}
      color={Colors.white}
    />
  );
};

export default CustomHeaderButtom;
