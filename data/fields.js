import { bovine_type } from './options';

export const other_entry = [
	{
		type: 'listDetailled',
		name: 'mother_name',
		label: 'Nom de la mère',
		detailsTopDisplay: [
			{
				name: 'national_number',
				label: 'Référence nationale',
				type: 'text'
			},
			{
				name: 'work_ref',
				label: 'N° de travail',
				type: 'text'
			},
			{
				name: 'cow_type_code',
				label: 'Code racial',
				type: 'text'
			},
			{
				name: 'is_pregnant',
				label: 'Gestante',
				type: 'boolean',
				options: {
					option1: 'test',
					option2: 'test'
				}
			}
		],
		require: true
	}
];
