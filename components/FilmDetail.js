import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class FilmDetail extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.navigation);
	}

	render() {
		return (
			<View style={styles.main_container}>
				<Text>Détail du film {this.props.navigation.getParam('idFilm')}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
	}
});
