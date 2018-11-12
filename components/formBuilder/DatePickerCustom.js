import moment from 'moment';
import { DatePicker } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { FormStyles } from '../../styles';

export default class DatePickerCustom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isValid: null
		};
	}

	/**
	 * On set la valeur par défaut dans le field si elle est définit
	 */
	componentDidMount() {
		if (this.props.defaultValue) {
			this._datePickerValidator(this.props.defaultValue);
		}
	}

	/**
	 * Fonction qui set le statut du field, formatte la date et la renvoie
	 * @param {string} text
	 */
	_datePickerValidator(text) {
		let date = moment(text),
			valueValidated = {
				name: this.props.name
			},
			isValid = true;
		const { regexValidator, functionValidator } = this.props;

		if (date.isValid()) {
			isValid = true;
			valueValidated.data = date.format('DD/MM/YYYY');
		} else {
			isValid = false;
			valueValidated.data = false;
			valueValidated.message = 'Format de date non valide';
		}

		//on test la props regex si nécessaire
		if (isValid && regexValidator) {
			if (regexValidator.regex.test(value)) {
				isValid = true;
				valueValidated.data = value;
			} else {
				isValid = false;
				valueValidated.data = false;
				if (regexValidator.message) {
					valueValidated.message = regexValidator.message;
				} else {
					valueValidated.message = 'Format spécifique non valide';
				}
			}
		}

		//on test la props fonction de validation si nécessaire
		if (isValid && functionValidator) {
			const customValidator = functionValidator();
			if (
				typeof customValidator === 'object' ||
				typeof customValidator.result !== 'undefined'
			) {
				if (customValidator.result) {
					isValid = true;
					valueValidated.data = value;
				} else {
					isValid = false;
					valueValidated.data = false;
					if (customValidator.message) {
						customValidator.message = customValidator.message;
					} else {
						customValidator.message = 'Format spécifique non valide';
					}
				}
			}
		}

		this.setState({ isValid }, () => {
			if (this.props.onChange) {
				this.props.onChange(valueValidated);
			}
		});
	}

	render() {
		const { isValid } = this.state;
		const { isValidated, disabled } = this.props;
		return (
			<View
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
				<DatePicker
					defaultDate={
						this.props.defaultValue && new Date(this.props.defaultValue)
					}
					minimumDate={
						this.props.minimumDate && new Date(this.props.minimumDate)
					}
					maximumDate={
						this.props.maximumDate && new Date(this.props.maximumtDate)
					}
					locale={'fr'}
					timeZoneOffsetInMinutes={undefined}
					modalTransparent={true}
					animationType={'fade'}
					androidMode={'default'}
					placeHolderText={
						this.props.defaultValue
							? undefined
							: this.props.placeHolder
								? this.props.placeHolder
								: 'Sélectionner une date'
					}
					placeHolderTextStyle={FormStyles.datePickerTextPlaceholder}
					textStyle={FormStyles.datePickerTextSelected}
					onDateChange={text => this._datePickerValidator(text)}
				/>
			</View>
		);
	}
}
DatePickerCustom.propTypes = {
	defaultValue: function(props, propName, componentName) {
		if (
			props[propName] &&
			!/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(
				props[propName]
			)
		) {
			return new Error(
				'Invalid prop `' +
					propName +
					'` supplied to' +
					' `' +
					componentName +
					'`. Validation failed. Format of date is not valid'
			);
		}
	},
	minimumDate: function(props, propName, componentName) {
		if (
			props[propName] &&
			!/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(
				props[propName]
			)
		) {
			return new Error(
				'Invalid prop `' +
					propName +
					'` supplied to' +
					' `' +
					componentName +
					'`. Validation failed. Format of date is not valid'
			);
		}
	},
	maximumDate: function(props, propName, componentName) {
		if (
			props[propName] &&
			!/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(
				props[propName]
			)
		) {
			return new Error(
				'Invalid prop `' +
					propName +
					'` supplied to' +
					' `' +
					componentName +
					'`. Validation failed. Format of date is not valid'
			);
		}
	},
	placeHolderText: PropTypes.string,
	name: PropTypes.string,
	isValidated: PropTypes.bool,
	onChange: PropTypes.func,
	disabled: PropTypes.bool
};
