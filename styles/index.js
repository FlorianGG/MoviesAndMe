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
		borderColor: '#0f3d6d',
		justifyContent: 'center',
		alignItems: 'center'
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
	booleanText: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center'
	}
});
