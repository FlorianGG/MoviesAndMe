import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { getFilmsFromApiWithSearchedText } from '../api/TMBDA.js';
import FilmItem from '../components/FilmItem';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.searchedText = '';
		this.page = 0; // Compteur pour connaître la page courante
		this.totalPages = 0; // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
		this.state = {
			films: [],
			isLoading: false
		};
	}

	_searchFilms() {
		// Ici on va remettre à zéro les films de notre state
		this.page = 0;
		this.totalPages = 0;
		this.setState({ films: [] });
		this._loadFilms();
	}

	_loadFilms() {
		if (this.searchedText.length > 0) {
			this.setState({ isLoading: true });
			getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
				data => {
					this.page = data.page;
					this.totalPages = data.total_pages;
					const films = [...this.state.films, ...data.results];
					this.setState({ films, isLoading: false });
				}
			);
		}
	}

	_searchTextInputChanged(text) {
		this.searchedText = text;
	}

	_displayLoading() {
		const { isLoading } = this.state;
		if (isLoading) {
			return (
				<View style={styles.loading_container}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
	}

	_displayDetailForFilm = idFilm => {
		console.log('Display film with id ' + idFilm);
		this.props.navigation.navigate('FilmDetail', { idFilm });
	};

	render() {
		const { films, isLoading } = this.state;
		return (
			<View style={styles.main_container}>
				<TextInput
					style={styles.textinput}
					placeholder="Titre du film"
					onChangeText={text => this._searchTextInputChanged(text)}
					onSubmitEditing={() => this._searchFilms()}
				/>
				<Button
					style={{ height: 50 }}
					title="Rechercher"
					onPress={() => {
						this._searchFilms();
					}}
				/>
				{/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
				<FlatList
					data={films}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => (
						<FilmItem
							film={item}
							_displayDetailForFilm={this._displayDetailForFilm}
						/>
					)}
					onEndReachedThreshold={0.5}
					onEndReached={() => {
						if (films.length > 0 && this.page < this.totalPages) {
							this._loadFilms();
						}
					}}
				/>
				{this._displayLoading()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
	},
	textinput: {
		marginLeft: 5,
		marginRight: 5,
		height: 50,
		borderColor: '#000000',
		borderWidth: 1,
		paddingLeft: 5
	},
	loading_container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 100,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
