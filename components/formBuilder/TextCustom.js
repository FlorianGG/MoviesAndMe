import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

import { FormStyles } from '../../styles';

export default class TextCustom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isValid: null,
			value: ''
		};
	}

	/**
	 * On set la valeur par défaut dans le field si elle est définit
	 */
	componentDidMount() {
		if (this.props.defaultValue) {
			this._textValidator(this.props.defaultValue);
		}
	}

	/**
	 * Validateur du champs text
	 */
	_textValidator = value => {
		const { regexValidator, functionValidator } = this.props;
		let valueValidated = {
				name: this.props.name,
				message: false,
				data: value
			},
			isValid = true;

		//on test la props regex si nécessaire
		if (regexValidator) {
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
		if (functionValidator) {
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
		this.setState({ value, isValid }, () => {
			if (this.props.onChange) {
				this.props.onChange(valueValidated);
			}
		});
	};

	render() {
		const { placeHolder, length, isValidated, disabled } = this.props;
		const { isValid, value } = this.state;
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
				<TextInput
					editable={!disabled}
					placeholder={placeHolder}
					maxLength={length ? length : 255}
					placeholderTextColor={'#fff'}
					style={FormStyles.inputText}
					onChangeText={value => this._textValidator(value)}
					value={value}
				/>
			</View>
		);
	}
}

TextCustom.propTypes = {
	name: PropTypes.string.isRequired,
	isValidated: PropTypes.bool,
	require: PropTypes.bool,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	placeHolder: PropTypes.string,
	length: PropTypes.number,
	regexValidator: PropTypes.shape({
		regex: PropTypes.instanceOf(RegExp).isRequired,
		message: PropTypes.string
	}),
	functionValidator: PropTypes.func,
	disabled: PropTypes.bool
};
