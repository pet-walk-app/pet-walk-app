import { StyleSheet } from 'react-native';
import {
  green,
  lightGreen,
  white,
  backgroundGrey,
  darkGrey,
  borderGrey
} from '../consts/colors.js';

export const walkOfferPreviewStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: darkGrey,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: green, 
    padding: 10,
  },

  leftSection: {
    flex: 3,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  profileImageContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: 20,
    padding: 10,
  },

  profileImage: {
    width: 60,
    height: 80,
    alignSelf: 'center',
    borderRadius: 20,
  },

  middleSection: {
    flex: 6,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    padding: 10,
  },

  animalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: white,
  },

  breed: {
    fontSize: 16,
    color: white,
  },

  distance: {
    fontSize: 16,
    color: white,
  },

  address: {
    fontSize: 16,
    color: white,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
});

export const offerListStyles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: white,
    marginBottom: 15,
    borderRadius: 15
  },

  filterSection: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: green,
  },

  picker: {
    height: 50,
    borderColor: borderGrey,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 15
  },

  button: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '40%',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: white,
  },


  sortButton: {
    backgroundColor: green,
  },

  filterButton: {
    backgroundColor: '#696969',
  },
});
