import React, { Component } from 'react';
import { FlatList, ListItem, Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { FormStyles, MainStyle } from '../../styles';

export default class SelectCustom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			options: [],
			searchText: '',
			error: null
		};
	}

	/**
	 * Function qui initialise l'affichage à 25 items maximum
	 */
	componentDidMount() {
		let counter = 0;
		const options = this.props.options.filter(option => {
			counter++;
			return counter <= 25;
		});
		this.setState({ options });
	}

	/**
	 * Toggle la modal
	 * @param {boolean} visible
	 */
	_setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	/**
	 * Fonction qui set le state searchText ainsin que les nouvelles options filtrées
	 */
	_searchFilterFunction = searchText => {
		const newOptions = this.props.options.filter(option => {
			const itemData = `${option.id}${option.name.toUpperCase()}}`;
			const textData = searchText.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});
		this.setState({ searchText, options: newOptions });
	};

	/**
	 *
	 */
	_selectValidator = id => {
		console.log(id);
		this._setModalVisible(!this.state.modalVisible);
	};

	render() {
		const { options } = this.state;
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.log('Modal has been closed.');
						this._setModalVisible(!this.state.modalVisible);
					}}
				>
					<View style={MainStyle.MainView}>
						<SearchBar
							placeholder="Taper votre recherche..."
							lightTheme
							round
							onChangeText={text => this._searchFilterFunction(text)}
							value={this.state.text}
						/>
						<FlatList
							data={options}
							keyExtractor={item => item.id.toString()}
							renderItem={({ item }) => {
								return (
									<TouchableHighlight
										onPress={() => {
											this._selectValidator(item.id);
										}}
										style={{
											height: 40,
											backgroundColor: '#fff',
											borderBottomColor: 'grey',
											borderBottomWidth: 1,
											padding: 5
										}}
									>
										<Text
											style={{
												flex: 1,
												fontSize: 16,
												color: '#3178c2',
												textAlign: 'left',
												textAlignVertical: 'center',
												fontWeight: 'bold'
											}}
										>
											{item.name}
										</Text>
									</TouchableHighlight>
								);
							}}
						/>

						<TouchableHighlight
							onPress={() => {
								this._setModalVisible(!this.state.modalVisible);
							}}
						>
							<Text>Hide Modal</Text>
						</TouchableHighlight>
					</View>
				</Modal>

				<TouchableHighlight
					onPress={() => {
						this._setModalVisible(true);
					}}
				>
					<Text>Show Modal</Text>
				</TouchableHighlight>
			</View>
		);
	}
}
