import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class ListeDetailled extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		console.log('salut');
		return (
			<View>
				<Text> textInComponent </Text>
			</View>
		);
	}
}

ListeDetailled.propTypes = {
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.number,
	detailsTopDisplay: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			type: PropTypes.oneOf(['text', 'boolean']),
			options: function(props, propName, componentName) {
				if (props.type === 'boolean') {
					if (props.options === undefined) {
						return new Error('Props options is missing');
					} else {
						if (
							(typeof props.options === 'string' &&
								(props.options !== 'gender' && props.options !== 'boolean')) ||
							typeof props.options !== 'object'
						) {
							return new Error(
								'Props options must be an object or string with these values : boolean or gender'
							);
						} else {
							if (
								props.options.option1 === undefined ||
								props.options.option2 === undefined
							) {
								return new Error(
									'Props options description is not valid. The object must have the keys option1 and option2'
								);
							}

							if (
								typeof props.options.option1 !== 'string' ||
								typeof props.options.option2 !== 'string'
							) {
								return new Error(
									'Props options description is not valid. The value of the twice options must be a string'
								);
							}
						}
					}
				}
			}
		})
	)
};
