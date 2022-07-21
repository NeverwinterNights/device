import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons'
import Ionicons from '@expo/vector-icons/Ionicons';

import {Platform} from 'react-native';
import colors from "../constans/colors";


export const CustomHeaderButton = (props: any) => {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23}
                      color={Platform.OS === "android" ? colors.white : colors.primary}/>
    )
};


