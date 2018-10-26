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
		type: 'select',
		name: 'bovine_type',
		label: 'Race',
		require: true,
		options: bovine_type
	},
	{
		type: 'date',
		name: 'birth_date',
		label: 'Date de Naissance',
		require: true
	}
];
