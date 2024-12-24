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
    marginTop: 20,
    marginBottom: 20,
    height: 150,
    flexDirection: 'row',
  },

  leftContainer: {
    width: '75%',
    paddingBottom: 15,
    alignItems: 'center',
  },

  rightContainer: {
    width: '25%',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },

  textContainer: {
    justifyContent: 'center',
    padding: 15,
    marginBottom: 'auto',
    marginTop: 'auto',
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

export const caregiverFoundStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: darkGrey,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: green, 
    padding: 5,
  },

  leftSection: {
    flex: 3,
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  middleSection: {
    flex: 6,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,

  },

  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginLeft: 5
  },

  name: {
    fontSize: 22,
    color: white
  },

  price: {
    fontSize: 18,
    color: white 
  },

  button: {
    borderRadius: 40,
    backgroundColor: darkGrey,
    padding: 2,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',

  },

  buttonText: {
    fontSize: 16,
    color: white
  },

  iconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    height: '100%',
  },

  image: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    backgroundColor: white,
    borderRadius: 40
  },

  profileImageContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: 20,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignSelf: 'center'
  }
})

export const bottomMenuStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    gap: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },

  iconContainer: {
    padding: 2,
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },

  icon: {
  }
})