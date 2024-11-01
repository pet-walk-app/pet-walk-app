import {
   green,
   white,
   backgroundGrey,
   darkGrey,
   borderGrey
} from '../consts/colors.js'
import { StyleSheet } from 'react-native';

export const customButtonStyles = StyleSheet.create({
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
   }
})

export const carouselStyles = StyleSheet.create({
   container: {
      backgroundColor: white,
      width: '100%',
      borderRadius: 15,
      borderColor: borderGrey,
      borderWidth: 1.5,
      flex: 1,
      flexDirection: 'row',
      marginBottom: 10
    },

    leftContainer: {
      width: '75%',
      position: 'relative',
      paddingBottom: 15,
    },

    rightContainer: {
      width: '25%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },

    textContainer: {
      justifyContent: 'center',
      padding: 15
    },

    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center', 
    },

    text: {
      fontSize: 17,
    },

    image: {
      height: 60,
      width: 60,
      marginRight: 15
    },


    indicatorContainer: {
      flexDirection: 'row',
      margin: 5,
      position: 'absolute',
      left: 10,
      bottom: 5,
    },

    indicator: {
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: borderGrey,
      backgroundColor: white,
      margin: 5,
    },

    activeIndicator: {
      backgroundColor: green,
    },

})


export const separatorStyles = StyleSheet.create({
   separator: {
     backgroundColor: 'rgba(0, 0, 0, 0.1)'
   },
 });


 export const createProfileButtonStyles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: white,
      height: 135,
      paddingHorizontal: 15,
      paddingVertical: 7,
      alignItems: 'center',
      borderRadius: 15,
      borderColor: borderGrey,
      borderWidth: 1.5,
      gap: 15,
      marginVertical: 8
   },

   iconContainer: {
      flex: 0.1,
      justifyContent: 'center',
      height: '100%'
   },

   textContainer: {
      flex: 0.8,
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlign: 'justify'
   },

   titleText: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 5
   },

   descriptionText: {

   },

   image: {
      width: 30,
      height: 30,
      alignSelf: 'center'
   }

 });
