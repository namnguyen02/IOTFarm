import React from 'react'
import { TouchableOpacity,StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {MaterialCommunityIcons} from '@expo/vector-icons'
export default function EscapeButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack}>
      <MaterialCommunityIcons name="close" size={18} color='#34291D' />
    </TouchableOpacity>
  )
}