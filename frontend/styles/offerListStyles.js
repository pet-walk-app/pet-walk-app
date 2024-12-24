import { StyleSheet } from 'react-native';
import {
  green,
  white,
  darkGrey,
  borderGrey, black
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
    width: 80,
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

  date: {
    fontSize: 16,
    color: white,
  },

  length: {
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
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: white,
    marginBottom: 15,
    borderRadius: 15,
  },

  filterSection: {
    marginVertical: 5,
    paddingHorizontal: 10,
    width: '48%',
  },

  filterTitle: {
    fontSize: 14,
    marginBottom: 5,
  },

  doubleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },

  input: {
    height: 45,
    borderColor: borderGrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: black,
    justifyContent: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '48%',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: white,
  },

  sortButton: {
    backgroundColor: green,
  },

  filterButton: {
    backgroundColor: '#696969',
  },

  filters: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
});


export const MyOfferPreviewStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: darkGrey,
    backgroundColor: green,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },

  myOfferTitle: {
    color: white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  content: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },

  leftSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },

  myOfferMiddleSection: {
    flex: 6,
    justifyContent: 'center',
    paddingLeft: 10,
  },

  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: white,
  },

  text: {
    fontSize: 14,
    color: white,
  },
});