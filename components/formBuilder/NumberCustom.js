import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

import { FormStyles } from '../../styles';

export default class NumberCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isValid: null,
      value: '',
    }
  }

  /**
   * Validateur du champs nombre
   */
  _numberValidator = value => {
    const { decimal } = this.props
    value = value.replace(/\,/, '.')
    let valueValidated = {
      name: this.props.name,
    }
    if (decimal) {
      if (/^[0-9]+(\.[0-9]+)?$/.test(value)) {
        this._numberValidatorMinAndMax(value, valueValidated)
      } else {
        this.setState({ value, isValid: false }, () => {
          if (this.props.onChange) {
            valueValidated.data = false
            this.props.onChange(valueValidated)
          }
        })
      }
    } else {
      if (/^[0-9]+$/.test(value)) {
        this._numberValidatorMinAndMax(value, valueValidated)
      } else {
        this.setState({ value, isValid: false }, () => {
          if (this.props.onChange) {
            valueValidated.data = false
            this.props.onChange(valueValidated)
          }
        })
      }
    }
  }

  /**
   * Factorisation de l'étape de vérification des valeurs minimum et maximum
   * @param {number} value
   * @param {object} valueValidated
   */
  _numberValidatorMinAndMax(value, valueValidated) {
    const { maximumValue, minimumValue } = this.props
    let toHigh = false,
      toLow = false
    if (maximumValue && value > maximumValue) {
      toHigh = true
    }
    if (minimumValue && value < minimumValue) {
      toLow = true
    }
    if (toLow || toHigh) {
      this.setState({ value, isValid: false }, () => {
        if (this.props.onChange) {
          valueValidated.data = false
          this.props.onChange(valueValidated)
        }
      })
    } else {
      this.setState({ value, isValid: true }, () => {
        if (this.props.onChange) {
          valueValidated.data = value
          this.props.onChange(valueValidated)
        }
      })
    }
  }

  render() {
    const { placeHolder, maxLength } = this.props
    const { isValid, value } = this.state
    return (
      <View
        style={
          isValid !== null
            ? isValid
              ? {
                  ...FormStyles.fieldStandard,
                  ...FormStyles.fieldSuccess,
                }
              : {
                  ...FormStyles.fieldStandard,
                  ...FormStyles.fieldError,
                }
            : FormStyles.fieldStandard
        }
      >
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={'#fff'}
          maxLength={maxLength ? maxLength : 15}
          keyboardType={'number-pad'}
          style={FormStyles.inputText}
          onChangeText={value => this._numberValidator(value)}
          value={value}
        />
      </View>
    )
  }
}

NumberCustom.propTypes = {
  name: PropTypes.string.isRequired,
  require: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
  placeHolder: PropTypes.string,
  decimal: PropTypes.bool,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
}
