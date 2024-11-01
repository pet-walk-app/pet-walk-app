import {
   green,
   white,
   backgroundGrey,
   darkGrey,
   borderGrey
} from '../consts/colors.js'
import { StyleSheet } from 'react-native';


export const formStyles = StyleSheet.create({
   container: {
      flex: 1,
   },

   topSection: {
      flex: 1.5
      // grafika PetWalk
   },

   middleSection: {
      flex: 6,
      padding: 40,
      alignContent: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: backgroundGrey
   },

   bottomSection: {
      // tu będą przyciski
      flex: 0.5,
      backgroundColor: white,
   },

   h1: {
      fontSize: 25,
      alignSelf: 'flex-start',
      lineHeight: 40,
   },

   h3: {
      fontSize: 19,
      alignSelf: 'flex-start',
      lineHeight: 30,
   },

   formContainer: {
      marginTop: 20,
      marginBottom: 25,
      gap: 10,
      width: '100%'
   },

   formInput: {
      height: 60,
      width: '100%',
      borderColor: borderGrey,
      borderStyle: 'solid',
      borderWidth: 1.5,
      borderRadius: 40,
      fontSize: 15,
      backgroundColor: white,
      paddingHorizontal: 35,
      alignContent: 'center',
      justifyContent: 'center',
   },

   inputText: { 
      color: darkGrey
   },
})
