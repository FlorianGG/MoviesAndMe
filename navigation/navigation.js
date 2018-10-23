import { createStackNavigator } from 'react-navigation';

import FilmDetail from '../components/FilmDetail';
import Search from '../components/Search';


const SearchStackNavigator = createStackNavigator({
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
});

export default SearchStackNavigator;
