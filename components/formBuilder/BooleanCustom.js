import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { FormStyles } from '../../styles';

export default class BooleanCustom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			optionChecked: null,
			option1: false,
			option2: false
		};
	}

	/**
	 * On set la valeur par défaut dans le field si elle est définit
	 */
	componentDidMount() {
		if (this.props.defaultValue) {
			let value = {
				name: this.props.name
			};
			if (this.props.defaultValue === 'option1') {
				this.setState({ option1: true }, () => {
					if (this.props.onChange) {
						value.data = 0;
						this.props.onChange(value);
					}
				});
			} else if (this.props.defaultValue === 'option2') {
				this.setState({ option2: true }, () => {
					if (this.props.onChange) {
						value.data = 1;
						this.props.onChange(value);
					}
				});
			}
		}
	}

	/**
	 * Fonction qui renvoie les valeurs des boutons du field
	 */
	_renderBooleanField() {
		const { options } = this.props;
		if (typeof options == 'string') {
			if (options == 'gender') {
				return [
					{ id: 'option1', value: 'Mâle' },
					{ id: 'option2', value: 'Femelle' }
				];
			} else if (options == 'boolean') {
				return [
					{ id: 'option1', value: 'Non' },
					{ id: 'option2', value: 'Oui' }
				];
			}
		} else {
			return [
				{ id: 'option1', value: options.option1 },
				{ id: 'option2', value: options.option2 }
			];
		}
	}

	/**
	 * Fonction qui valide et convertit les valeurs
	 * Et les renvoie si nécessaire
	 */
	_booleanValidator = id => {
		let { optionChecked } = this.state;
		let value = {
			name: this.props.name
		};
		if (id === 'option1') {
			if (optionChecked !== 0) {
				this.setState(
					{ optionChecked: 0, option1: true, option2: false },
					() => {
						if (this.props.onChange) {
							value.data = 0;
							this.props.onChange(value);
						}
					}
				);
			}
		} else if (id === 'option2') {
			if (optionChecked !== 1) {
				this.setState(
					{ optionChecked: 1, option1: false, option2: true },
					() => {
						if (this.props.onChange) {
							value.data = 1;
							this.props.onChange(value);
						}
					}
				);
			}
		}
	};
	render() {
		const options = this._renderBooleanField();
		return (
			<View style={FormStyles.booleanField} name={this.props.name}>
				{options.map(option => {
					return (
						<TouchableOpacity
							style={
								this.state[option.id]
									? {
											...FormStyles.booleanInactive,
											...FormStyles.booleanActive
									  }
									: FormStyles.booleanInactive
							}
							onPress={() => this._booleanValidator(option.id)}
							key={option.id}
						>
							<Text style={FormStyles.booleanText}>{option.value}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

BooleanCustom.propTypes = {
	options: PropTypes.oneOfType([
		PropTypes.oneOf(['gender', 'boolean']),
		PropTypes.shape({
			option1: PropTypes.string.isRequired,
			option2: PropTypes.string.isRequired
		})
	]).isRequired,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.oneOf(['option1', 'option2'])
};
