import { StyleSheet } from 'react-native';
import {
  green,
  lightGreen,
  white,
  backgroundGrey,
  darkGrey,
  borderGrey
} from '../consts/colors.js'


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

  walkOfferMiddleSection: {
    marginTop: 20,
    flex: 6,
    padding: 10,
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

  h1Centered: {
    fontSize: 25,
    alignSelf: 'center',
    lineHeight: 40,
    fontWeight : "bold"
  },

  h3: {
    fontSize: 19,
    alignSelf: 'flex-start',
    lineHeight: 30,
  },

  h3Centered: {
    fontSize: 19,
    alignSelf: 'center',
    lineHeight: 40,
    fontWeight : "bold"
  },

  errorText: {
    color: 'red',
    marginLeft: 10
  },

  formContainer: {
    marginTop: 20,
    marginBottom: 25,
    gap: 10,
    width: '100%'
  },

  formSection: {
    gap: 10,
    padding: 15,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: borderGrey,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5
  },

  sectionHeader: {
    fontSize: 20,
  },


  walkOffer: {
    backgroundColor: lightGreen,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 25,
    gap: 10,
    width: '100%',
    padding: 20
  },

  walkOfferText: {
    backgroundColor: white,
    borderRadius: 40,
    gap: 10,
    width: '100%',
    padding: 20
  },

  walkOfferImage: {
    width: 90,
    height: 90,
    position: 'absolute',
    top: 60,
    left: 25,
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
    borderRadius: 25,
    width: 250,
    height: 250,
  },

  imageSmall: {
    borderRadius: 25,
    margin: 15,
    width: 125,
    height: 125,
  }
})
