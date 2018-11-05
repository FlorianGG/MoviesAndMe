import { bovine_type } from './options';

export const other_entry = [
	{
		type: 'text',
		name: 'national_number',
		label: 'Numéro national',
		high_rank: true,
		require: true
	},
	{
		type: 'text',
		name: 'name',
		defaultValue: 'Machine',
		label: 'Nom',
		require: true
	},
	{
		type: 'boolean',
		name: 'gender',
		label: 'Sexe',
		require: true
	},
	{
		type: 'text',
		name: 'work_ref',
		label: 'N° travail',
		require: true
	},
	{
		type: 'number',
		name: 'test_number',
		label: 'Nombre test',
		require: true
	},
	{
		type: 'select',
		name: 'bovine_type',
		label: 'Race',
		options: bovine_type,
		require: true
	},
	{
		type: 'date',
		name: 'birth_date',
		label: 'Date de Naissance',
		require: true
	}
];
