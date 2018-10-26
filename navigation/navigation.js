import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Declaration from '../views/declaration/Declaration';
import DeclarationEntree from '../views/declaration/DeclarationEntree';
import DeclarationNaissance from '../views/declaration/DeclarationNaissance';
import FilmDetail from '../views/FilmDetail';
import Search from '../views/Search';

const SearchStackNavigator = createStackNavigator(
	{
		Search: {
			screen: Search,
			navigationOptions: {
				title: 'Rechercher'
			}
		},
		FilmDetail: {
			// Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
			screen: FilmDetail
		}
	},
	{
		initialRouteName: 'Search'
	}
);

const DeclarationStackNavigator = createStackNavigator(
	{
		Declaration: {
			screen: Declaration,
			navigationOptions: {
				title: 'Déclarations'
			}
		},
		DeclarationNaissance: {
			// Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
			screen: DeclarationNaissance,
			navigationOptions: {
				title: 'Déclaration Naissance'
			}
		},
		DeclarationEntree: {
			// Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
			screen: DeclarationEntree,
			navigationOptions: {
				title: 'Déclaration Entrée'
			}
		}
	},
	{
		initialRouteName: 'Declaration'
	}
);

const Drawer = createDrawerNavigator({
	Declaration: { screen: DeclarationStackNavigator },
	Search: { screen: SearchStackNavigator }
});
export default Drawer;
