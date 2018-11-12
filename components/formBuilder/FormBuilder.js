import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Picker, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { FormStyles, MainStyle } from '../../styles';
import BooleanCustom from './BooleanCustom';
import DatePickerCustom from './DatePickerCustom';
import Label from './Label';
import ListeDetailled from './ListDetailled';
import listDetailled from './ListDetailled';
import NumberCustom from './NumberCustom';
import SelectCustom from './SelectCustom';
import TextCustom from './TextCustom';

export default class FormBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: {},
			messages: {},
			isValidated: {},
			isValid: true
		};
	}

	componentDidMount() {
		let { values } = this.state;

		this.props.pattern.map(field => {
			values[field.name] = '';
		});
		this.setState({ values });
	}

	_checkIfFormIsValid = () => {
		const { values, isValidated } = this.state;
		let isValid = true;
		let messages = {};
		this.props.pattern.map(field => {
			if (values[field.name] === false) {
				isValidated[field.name] = false;
				isValid = false;
			} else {
				if (field.hasOwnProperty('require') && values[field.name] === '') {
					isValidated[field.name] = false;
					messages[field.name] = 'Ce champs est requis';
					isValid = false;
				} else {
					isValidated[field.name] = true;
				}
			}
		});
		if (!isValid) {
			this.setState({ isValidated, messages });
		}
	};

	//arrow function to bind this
	_getFieldValue = value => {
		let { values, messages } = this.state;
		values[value.name] = value.data;
		if (value.message) {
			messages[value.name] = value.message;
		} else {
			messages[value.name] = false;
		}
		this.setState({ values, messages });
	};

	_displayField(field) {
		const { values, isValidated } = this.state;
		switch (field.type) {
			case 'text':
				return (
					<TextCustom
						disabled={field.disabled}
						isValidated={isValidated[field.name]}
						name={field.name}
						placeHolder={field.label ? field.label : undefined}
						require={field.require ? true : false}
						defaultValue={field.defaultValue ? field.defaultValue : undefined}
						regexValidator={
							field.regexValidator ? field.regexValidator : undefined
						}
						lenght={typeof field.min === 'number' ? field.min : undefined}
						onChange={this._getFieldValue}
						functionValidator={
							field.functionValidator ? field.functionValidator : undefined
						}
					/>
				);
				break;
			case 'number':
				return (
					<NumberCustom
						disabled={field.disabled}
						isValidated={isValidated[field.name]}
						name={field.name}
						placeHolder={field.label ? field.label : undefined}
						require={field.require ? true : false}
						decimal={field.require ? true : false}
						defaultValue={field.defaultValue ? field.defaultValue : undefined}
						min={typeof field.min === 'number' ? field.min : undefined}
						max={typeof field.max === 'number' ? field.max : undefined}
						regexValidator={
							field.regexValidator ? field.regexValidator : undefined
						}
						lenght={typeof field.min === 'number' ? field.min : undefined}
						onChange={this._getFieldValue}
						functionValidator={
							field.functionValidator ? field.functionValidator : undefined
						}
					/>
				);
				break;
			case 'date':
				return (
					<DatePickerCustom
						disabled={field.disabled}
						isValidated={isValidated[field.name]}
						name={field.name}
						placeHolder={field.label ? field.label : false}
						require={field.require ? true : false}
						defaultValue={field.defaultValue ? field.defaultValue : undefined}
						minimumDate={field.minimumDate ? field.minimumDate : undefined}
						maximumDate={field.maximumDate ? field.maximumDate : undefined}
						onChange={this._getFieldValue}
					/>
				);
				break;
			case 'boolean':
				return (
					<BooleanCustom
						disabled={field.disabled}
						isValidated={isValidated[field.name]}
						name={field.name}
						options={'gender'}
						defaultValue={field.defaultValue ? field.defaultValue : undefined}
						onChange={this._getFieldValue}
					/>
				);
				break;
			case 'select':
				return (
					<SelectCustom
						disabled={field.disabled}
						isValidated={isValidated[field.name]}
						options={field.options}
						name={field.name}
						defaultValue={field.defaultValue ? field.defaultValue : undefined}
						onChange={this._getFieldValue}
						require={field.require ? true : false}
					/>
				);
				break;
			case 'listDetailled':
				return (
					<ListeDetailled
						disabled={field.disabled}
						isValidated={isValidated[field.name]}
						detailsTopDisplay={field.detailsTopDisplay}
						name={field.name}
						defaultValue={field.defaultValue ? field.defaultValue : undefined}
						onChange={this._getFieldValue}
						require={field.require ? true : false}
					/>
				);
				break;
			default:
				return <Text>Erreur</Text>;
				break;
		}
	}

	render() {
		const { pattern } = this.props;
		const { messages, isValid } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
					{pattern.map(field => {
						return (
							<View key={field.name} style={FormStyles.rowField}>
								<View style={FormStyles.labelBloc}>
									{field.label && <Label label={field.label} />}
								</View>
								<View style={FormStyles.fieldBloc}>
									{this._displayField(field)}
									{messages[field.name] && (
										<Text style={FormStyles.errorText}>
											{messages[field.name]}
										</Text>
									)}
								</View>
								<View style={FormStyles.actionBloc} />
							</View>
						);
					})}
				</ScrollView>
				<Icon
					component={TouchableOpacity}
					raised
					type="font-awesome"
					name="check"
					color="#fff"
					containerStyle={
						isValid
							? FormStyles.buttonForm
							: { ...FormStyles.buttonForm, ...FormStyles.disabledButtonForm }
					}
					disabled={!isValid}
					onPress={this._checkIfFormIsValid}
				/>
			</View>
		);
	}
}

FormBuilder.propTypes = {
	pattern: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.oneOf([
				'text',
				'number',
				'date',
				'longText',
				'boolean',
				'select',
				'listDetailled'
			]).isRequired,
			name: PropTypes.string.isRequired,
			label: PropTypes.string,
			length: PropTypes.number,
			min: PropTypes.number,
			max: PropTypes.number,
			high_rank: PropTypes.bool,
			require: PropTypes.bool,
			decimal: PropTypes.bool,
			regexValidator: PropTypes.shape({
				regex: PropTypes.instanceOf(RegExp).isRequired,
				message: PropTypes.string
			}),
			functionValidator: PropTypes.func,
			disabled: PropTypes.bool
		})
	).isRequired
};
