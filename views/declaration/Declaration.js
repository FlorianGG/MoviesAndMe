import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { declaration_type } from '../../data/options';

export default class Declaration extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_displayDeclaration(id) {
		const screens = {
			1: 'DeclarationNaissance',
			2: 'DeclarationEntree'
		};

		this.props.navigation.navigate(screens[id]);
	}

	render() {
		return (
			<View style={styles.main_view}>
				<FlatList
					data={declaration_type}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.main_container}
							onPress={() => this._displayDeclaration(item.id)}
						>
							<Text style={styles.text_item}>{item.name}</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_view: {
		flex: 1,
		backgroundColor: '#013e7e'
	},
	main_container: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#346598',
		borderWidth: 1,
		borderColor: '#8faecb'
	},
	text_item: {
		color: '#fff',
		fontSize: 16
	}
});
