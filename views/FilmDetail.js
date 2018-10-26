import moment from 'moment';
import numeral from 'numeral';
import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getFilmDetailFromApi, getImageFromApi } from '../api/TMBDA';

export default class FilmDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			film: undefined,
			isLoading: true
		};
		console.log(this.props.navigation);
	}

	componentDidMount() {
		getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(
			data => {
				this.setState({
					film: data,
					isLoading: false
				});
			}
		);
	}

	_displayLoading() {
		if (this.state.isLoading) {
			// Si isLoading vaut true, on affiche le chargement à l'écran
			return (
				<View style={styles.loading_container}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
	}

	_displayFilm() {
		const { film } = this.state;
		if (this.state.film != undefined) {
			return (
				<ScrollView style={styles.scrollview_container}>
					<Image
						style={styles.image}
						source={{ uri: getImageFromApi(film.backdrop_path) }}
					/>
					<Text style={styles.title_text}>{film.title}</Text>
					<Text style={styles.description_text}>{film.overview}</Text>
					<Text style={styles.default_text}>
						Sorti le{' '}
						{moment(film.release_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
					</Text>
					<Text style={styles.default_text}>
						Note : {film.vote_average} / 10
					</Text>
					<Text style={styles.default_text}>
						Nombre de vote : {film.vote_count}
					</Text>
					<Text style={styles.default_text}>
						Budget : {numeral(film.budget).format('$0,0.00')}
					</Text>
					<Text style={styles.default_text}>
						Genre(s) :
						{film.genres
							.map(genre => {
								return genre.name;
							})
							.join('/')}
					</Text>
					<Text style={styles.default_text}>
						Companie(s) :
						{film.production_companies
							.map(company => {
								return company.name;
							})
							.join('/')}
					</Text>

					{/* Pour l'instant je n'affiche que le titre, je vous laisserais le soin de créer la vue. Après tout vous êtes aussi là pour ça non ? :)*/}
				</ScrollView>
			);
		}
	}

	render() {
		console.log('composant rendu');
		return (
			<View style={styles.main_container}>
				{this._displayLoading()}
				{this._displayFilm()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
	},
	loading_container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	scrollview_container: {
		flex: 1
	},
	title_text: {
		fontWeight: 'bold',
		fontSize: 35,
		flex: 1,
		flexWrap: 'wrap',
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 10,
		color: '#000000',
		textAlign: 'center'
	},
	image: {
		height: 169,
		margin: 5
	},
	description_text: {
		fontStyle: 'italic',
		color: '#666666',
		margin: 5,
		marginBottom: 15
	},
	default_text: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		color: '#000000'
	}
});
