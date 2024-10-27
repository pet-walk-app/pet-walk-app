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
      flex: 1
   },

   topSection: {
      flex: 2
      // grafika PetWalk
   },

   middleSection: {
      flex: 6,
      padding: 40,
      alignContent: 'center',
      justifyContent: 'center',
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

   formContainer: {
      marginTop: 32,
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

   formBigInput: {
      height: 60,
      width: '100%',
      borderColor: borderGrey,
      borderStyle: 'solid',
      borderWidth: 1.5,
      borderRadius: 40,
      fontSize: 15,
      backgroundColor: white,
      paddingVertical: 25,
      paddingHorizontal: 25,
      alignContent: 'center',
      justifyContent: 'center',
      textAlignVertical: "top"
   },

   inputText: { 
      color: darkGrey
   },

   button: {
      borderRadius: 40,
      borderColor: borderGrey,
      borderStyle: 'solid',
      borderWidth: 1.5,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      width: '100%',
      marginBottom: 5,
      marginTop: 5
   },

   buttonText: {
      fontSize: 15,
      fontWeight: 'bold'
   },

   image: {
      width: 250,
      height: 250,
   }
   
})
