import { StyleSheet } from 'react-native';
import { formStyles } from './formStyles';
import { caregiverFoundStyles } from './componentsStyles';
import { green, white } from '../consts/colors';

export const profileStyles = StyleSheet.create({
    container: {
    },

    headerSection: {
        marginBottom: 8,
    },

    mainHeader: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },

    h1: {
        ...formStyles.h1,
        fontWeight: 'semibold'
    },

    h2: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    h3: {
        ...formStyles.h3
    },

    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        marginBottom: 25
    },

    textContainer: {
        width: '50%',
        justifyContent: 'center'
    },

    textContainerFullWidth: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20
    },


    text: {
        fontSize: 18
    },

    boldText: {
        fontWeight: 'bold'
    },

    yourPetsSection: {
        marginBottom: 25,
        gap: 10,
    },

    caregiverSection: {
        gap: 10
    },

    petSection: {
        ...this.caregiverSection
    },

    button: {
        backgroundColor: green,
        padding: 5,
        borderRadius: 40,
        width: '30%',
        height: 35,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    buttonText: {
        color: white,
        fontSize: 18,
    },

    profileImageContainer: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        borderRadius: 20,
        width: 170,
        height: 170
    },

    profileImage: {
        alignSelf: 'center',
        borderRadius: 20,
        width: '85%',
        height: '85%'
    },
    
    petCarousel: {
        marginRight: -40,
    },

    petCarouselWrapper: {
        flexDirection: 'row',
        paddingRight: 20,
    },

    petImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        marginHorizontal: 6,
        alignSelf: 'center',
    },
      
      petImage: {
        width: '80%',
        height: '80%',
        borderRadius: 20,
      },
    
      plusIconContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 50,
        padding: 5,
      },
    
      plusIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
      },

      caregiverDescription: {
        textAlign: 'justify',
        fontSize: 18
      },

      petDescription: {
        textAlign: 'justify',
        fontSize: 18,
        marginBottom: 15
      },

      scrollView: {
        marginVertical: 10
      }

})