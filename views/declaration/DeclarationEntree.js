import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FormBuilder from '../../components/formBuilder/FormBuilder';
import { other_entry } from '../../data/fields';
import { MainStyle } from '../../styles';

export default class DeclarationEntree extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={MainStyle.MainView}>
				<FormBuilder pattern={other_entry} />
			</View>
		);
	}
}
