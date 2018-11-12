import { StyleSheet } from 'react-native';

export const MainStyle = StyleSheet.create({
	MainView: {
		flex: 1,
		backgroundColor: '#013e7e'
	}
});

export const FormStyles = StyleSheet.create({
	rowField: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 10
	},
	labelBloc: {
		flex: 2
	},
	fieldBloc: {
		flex: 3,
		margin: 5
	},
	fieldStandard: {
		borderRadius: 45,
		height: 60,
		backgroundColor: '#3178c2',
		borderWidth: 2,
		borderColor: '#13506f',
		justifyContent: 'center',
		alignItems: 'center'
	},
	fieldDisabled: {
		backgroundColor: '#346598',
		opacity: 0.65
	},
	fieldSuccess: {
		borderColor: '#28a745'
	},
	fieldError: {
		borderColor: '#dc3545'
	},
	actionBloc: {
		flex: 2
	},
	labelView: {
		margin: 5,
		paddingHorizontal: 5,
		borderRadius: 45,
		height: 60,
		backgroundColor: '#8faecb'
	},
	labelText: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: '#000',
		fontSize: 16
	},
	datePickerTextPlaceholder: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center'
	},
	datePickerTextSelected: {
		color: '#fff',
		fontSize: 16
	},
	booleanInactive: {
		flex: 1,
		backgroundColor: '#0a3d62',
		padding: 10,
		borderWidth: 3,
		borderColor: '#336191',
		borderRadius: 5,
		height: 50,
		marginHorizontal: 2
	},
	booleanField: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	booleanActive: {
		backgroundColor: '#013e7e',
		borderColor: '#de7022'
	},
	booleanDisabled: {
		opacity: 0.65
	},
	booleanText: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center'
	},
	selectText: {
		color: '#fff',
		fontSize: 16
	},
	selectItemContainer: {
		height: 40,
		backgroundColor: '#fff',
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		padding: 5
	},
	selectItemText: {
		flex: 1,
		fontSize: 16,
		color: '#3178c2',
		textAlign: 'left',
		textAlignVertical: 'center',
		fontWeight: 'bold'
	},
	inputText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center'
	},
	errorText: {
		fontSize: 16,
		color: '#dc3545',
		textAlign: 'center'
	},
	buttonForm: {
		marginHorizontal: 30,
		marginVertical: 10,
		alignSelf: 'flex-end',
		backgroundColor: '#28a745'
	},
	disabledButtonForm: {
		opacity: 0.5
	}
});
