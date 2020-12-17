let config;

config = {
	$api_url: 'http://0.0.0.0:5001',
	$backend_url: 'http://172.16.0.3:5001',
	filteroptions: [
		{ value: null, text: 'Please select an option' },
		{ value: 'eq', text: 'Equal to' },
		{ value: 'neq', text: 'Not equal to' },
		{ value: 'sw', text: 'Starts with' },
		{ value: 'nsw', text: 'Does not starts with' },
		{ value: 'c', text: 'Contains' },
		{ value: 'lt', text: 'Less than' },
		{ value: 'gt', text: 'Greater than' }
	],
	columnoptions: [
		{ value: null, text: 'Please select a column' },
		{ value: 'Chr', text: 'Chr' },
		{ value: 'Pos', text: 'Pos' },
		{ value: 'Ref', text: 'Ref' },
		{ value: 'Alt', text: 'Alt' },
		{ value: 'HGMD', text: 'HGMD' }
	],
	vartablefields: [
		{
			key: 'chr',
			label: 'Chromosome',
			sortable: true
		},
		{
			key: 'pos',
			label: 'Position',
			sortable: true
		},
		{
			key: 'ref',
			label: 'Ref Allele',
			sortable: true
		},
		{
			key: 'alt',
			label: 'Alt Allele',
			sortable: true
		},
		{
			key: 'HGMD',
			label: 'HGMD',
			sortable: true
		},
		{
			key: 'actions',
			label: 'actions',
			sortable: true
		}
	],
	testhtml: `
				<div>
					<span>Some HTML here</span>
				</div>
  			`
};

export { config };
