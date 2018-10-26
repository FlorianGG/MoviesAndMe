import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge } from 'react-native-elements';

import { FormStyles } from '../../styles';

export default class Label extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={FormStyles.labelView}>
				<Text style={FormStyles.labelText}>{this.props.label}</Text>
			</View>
		);
	}
}
