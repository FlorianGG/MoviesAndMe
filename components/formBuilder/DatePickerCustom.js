import moment from 'moment';
import { DatePicker } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { FormStyles } from '../../styles';

export default class DatePickerCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isValid: null,
    }
  }

  /**
   * On set la valeur par défaut dans le field si elle est définit
   */
  componentDidMount() {
    if (this.props.defaultValue) {
      let value = {
        name: this.props.name,
      }
      let date = moment(this.props.defaultValue)
      if (date.isValid()) {
        this.setState({ isValid: true }, () => {
          if (this.props.onChange) {
            value.data = date.format('DD/MM/YYYY')
            this.props.onChange(value)
          }
        })
      } else {
        this.setState({ isValid: false })
      }
    }
  }

  /**
   * Fonction qui set le statut du field, formatte la date et la renvoie
   * @param {string} text
   */
  _datePickerValidator(text) {
    let date = moment(text)
    if (date.isValid()) {
      this.setState({ isValid: true }, () => {
        const value = {
          name: this.props.name,
          data: date.format('DD/MM/YYYY'),
        }
        if (this.props.onChange) {
          this.props.onChange(value)
        }
      })
    } else {
      this.setState({ isValid: false })
    }
  }

  render() {
    const { isValid } = this.state
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
    )
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
      )
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
      )
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
      )
    }
  },
  placeHolderText: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
}
