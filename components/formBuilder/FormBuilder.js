import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Picker, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FormStyles, MainStyle } from '../../styles';
import BooleanCustom from './BooleanCustom';
import DatePickerCustom from './DatePickerCustom';
import Label from './Label';
import SelectCustom from './SelectCustom';

export default class FormBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: {}
		};
	}

	//arrow function to bind this
	_getFieldValue = value => {
		let { values } = this.state;
		values[value.name] = value.data;
		console.log(values);
		this.setState({ values });
	};

	_displayField(field) {
		const { values } = this.state;
		switch (field.type) {
			/* 			case 'text':
				break;
			case 'number':
				break; */
			case 'date':
				return (
					<DatePickerCustom
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
			/* 			case 'longText':
				break; */
			case 'boolean':
				return (
					<BooleanCustom
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
						options={field.options}
						name={field.name}
						defaultValue={field.defaultValue ? field.defaultValue : undefined}
						onChange={this._getFieldValue}
					/>
				);
				break;
			default:
				<Text>Erreur</Text>;
				break;
		}
	}

	render() {
		const { pattern } = this.props;
		return (
			<ScrollView>
				{pattern.map(field => {
					return (
						<View key={field.name} style={FormStyles.rowField}>
							<View style={FormStyles.labelBloc}>
								{field.label && <Label label={field.label} />}
							</View>
							<View style={FormStyles.fieldBloc}>
								{this._displayField(field)}
							</View>
							<View style={FormStyles.actionBloc} />
						</View>
					);
				})}
			</ScrollView>
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
				'select'
			]).isRequired,
			name: PropTypes.string.isRequired,
			label: PropTypes.string,
			high_rank: PropTypes.bool,
			require: PropTypes.bool
		})
	).isRequired
};
