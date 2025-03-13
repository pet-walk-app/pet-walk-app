# Pet Walk App
## ℹ️ About
Pet Walk App is an application for pet owners as well as individuals who provide pet care services. The main purpose of the app is to enable easy searching for pet sitters and pet owners to organize care. This project was created as a final university engineering project.

## 👤Team
* [Bartłomiej Jońca (jjbartek)](https://github.com/jjbartek) - Backend
* [Dominik Palenik (domus55)](https://github.com/domus55) - Frontend
* [Natalia (natthalee)](https://github.com/natthalee) - Frontend

## ⚙️Core features
* User login/registration
* User profile creation:
	* 💼Professional profile - pet sitters can create their own portfolio
	* 🐶 Pet profiles - user can add all of their pets and information about them
* Offers creation - pet owners can create an offer, the offer can contain following information:
	* 🐶 Pet (to select from added pets added by user earlier)
	* 💰 Price
	* 📍 Pick-up/drop-off location (powered by Google Maps API)
	* 🕒 Date/time
	* 📝 Offer description
* Offers management:
	* Offer creator:
		* ❌Edition
		* ✏️Deletion
		* ✔️ Pet sitter selection (from applications)
	* Pet sitter:
		* 💼 Create/delete application to an offer
* Searching offers, allowed filters:
	* 📍Distance (based on user and pick-up location)
	* 💰Price
	* 📍Date/time
## 🛠️Stack
The application is based on React Native, backend is written in Spring.

![Java, Spring, Hibernate, Mysql, Javascript, React Native](https://skillicons.dev/icons?i=java,spring,mysql,javascript,react)


## ⏰Limitations
At the moment application allows only dogs to be added to profile and to be a part of an offer.
