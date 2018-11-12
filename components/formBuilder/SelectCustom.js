import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, FlatList, ListItem, Modal, Text, TouchableHighlight, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { FormStyles, MainStyle } from '../../styles';

export default class SelectCustom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			optionsFiltered: [],
			searchText: '',
			valueToDisplay: null,
			isValid: null
		};
		this.allOptions = this._initializationOptions();
	}

	/**
	 * On set la valeur par défaut dans le field si elle est définit
	 */
	componentDidMount() {
		if (this.props.defaultValue) {
			this._selectValidator(this.props.defaultValue);
		}
	}

	/**
	 * Function qui initialise l'afficher avec une option null
	 */
	_initializationOptions() {
		return [{ id: 0, name: 'Aucune sélection' }, ...this.props.options];
	}

	/**
	 * Toggle la modal et réinitialise la vue
	 * @param {boolean} visible
	 */
	_setModalVisible(visible) {
		this.setState({
			modalVisible: visible,
			searchText: '',
			optionsFiltered: []
		});
	}

	/**
	 * Fonction qui set le state searchText ainsi que les nouvelles options filtrées
	 */
	_searchFilterFunction = searchText => {
		//filtre les options selon la recherche effectuées
		const newOptions = this.allOptions.filter(option => {
			if (typeof option.name === 'string') {
				const itemData = `${option.id}${option.name.toUpperCase()}`;
			} else {
				const itemData = `${option.id}${option.name}`;
			}
			const itemData = `${option.id}${option.name.toUpperCase()}`;
			const textData = searchText.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});
		this.setState({ searchText, optionsFiltered: newOptions });
	};

	/**
	 * Fonction qui clear l'input de la searchBar et  reset les state
	 */
	_clearSearchInput = () => {
		this.setState({
			searchText: '',
			optionsFiltered: []
		});
	};

	/**
	 * Validator du selectCustom
	 */
	_selectValidator = id => {
		const option = this.allOptions.filter(option => {
			return option.id === id;
		});
		let value = {
				name: this.props.name
			},
			isValid = true,
			valueToDisplay = null,
			searchText = '',
			modalVisible = this.state.modalVisible
				? !this.state.modalVisible
				: this.state.modalVisible;
		//on verifie qu'on a bien 1 seul résultat
		//sinon il y a une erreur
		if (option.length === 1) {
			//on verifie que si le champs est requis et id = 0
			//alors on génère une erreur
			//sinon on valide le champs
			if (this.props.require && id === 0) {
				value.data = false;
				value.message = 'Champs requis, valeur nulle impossible';
				isValid = false;
				valueToDisplay = option[0].name;
			} else {
				value.data = option[0].id;
				isValid = true;
				valueToDisplay = option[0].name;
			}
		} else {
			value.data = false;
			value.message = 'Valeur sélectionnée non unique';
			modalVisible = this.state.modalVisible;
			isValid = false;
			valueToDisplay = 'Erreur sur la sélection';
		}

		this.setState(
			{
				isValid,
				modalVisible,
				valueToDisplay,
				searchText
			},
			() => {
				if (this.props.onChange) {
					this.props.onChange(value);
				}
			}
		);
	};

	render() {
		const { optionsFiltered, isValid, valueToDisplay } = this.state;
		const { isValidated, disabled } = this.props;
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this._setModalVisible(!this.state.modalVisible);
					}}
				>
					<View style={MainStyle.MainView}>
						<SearchBar
							placeholder="Taper votre recherche..."
							lightTheme
							round
							clearIcon={{ color: 'grey' }}
							onClear={this._clearSearchInpu}
							onChangeText={text => this._searchFilterFunction(text)}
							value={this.state.text}
						/>
						<FlatList
							data={
								optionsFiltered.length === 0 ? this.allOptions : optionsFiltered
							}
							keyExtractor={item => item.id.toString()}
							renderItem={({ item }) => {
								return (
									<TouchableHighlight
										onPress={() => {
											this._selectValidator(item.id);
										}}
										style={FormStyles.selectItemContainer}
									>
										<Text style={FormStyles.selectItemText}>{item.name}</Text>
									</TouchableHighlight>
								);
							}}
						/>
						<Button
							onPress={() => {
								this._setModalVisible(!this.state.modalVisible);
							}}
							title="Annuler"
							color="#dc3545"
							accessibilityLabel="Annuler"
						/>
					</View>
				</Modal>

				<TouchableHighlight
					onPress={() => {
						this._setModalVisible(true);
					}}
					disabled={disabled}
					style={
						disabled
							? { ...FormStyles.fieldStandard, ...FormStyles.fieldDisabled }
							: isValidated === false && !isValid
								? { ...FormStyles.fieldStandard, ...FormStyles.fieldError }
								: isValid !== null
									? isValid
										? {
												...FormStyles.fieldStandard,
												...FormStyles.fieldSuccess
										  }
										: {
												...FormStyles.fieldStandard,
												...FormStyles.fieldError
										  }
									: FormStyles.fieldStandard
					}
				>
					<Text style={FormStyles.selectText}>
						{valueToDisplay === null
							? 'Sélectionner la valeur'
							: valueToDisplay}
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

SelectCustom.propTypes = {
	name: PropTypes.string.isRequired,
	isValidated: PropTypes.bool,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})
	),
	require: PropTypes.bool,
	onChange: PropTypes.func,
	defaultValue: PropTypes.number,
	disabled: PropTypes.bool
};
