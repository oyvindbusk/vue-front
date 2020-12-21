let config;

config = {
	$backend_url: 'http://localhost:5001',
	$signout_url: function() {
		return this.$backend_url + '/newlogout';
	},
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
		{ value: 'HGMD', text: 'HGMD' },
		{ value: 'Class', text: 'Class' },
		{ value: 'Comment', text: 'Comment' }
	],
	vartablefields: [
		{
			key: 'chr',
			label: 'Chromosome',
			sortable: true,
			type: 'string'
		},
		{
			key: 'pos',
			label: 'Position',
			sortable: true,
			type: 'int'
		},
		{
			key: 'ref',
			label: 'Ref Allele',
			sortable: true,
			type: 'string'
		},
		{
			key: 'alt',
			label: 'Alt Allele',
			sortable: true,
			type: 'string'
		},
		{
			key: 'HGMD',
			label: 'HGMD',
			sortable: true,
			type: 'string'
		},
		{
			key: 'class',
			label: 'class',
			sortable: true,
			type: 'string'
		},
		{
			key: 'comment',
			label: 'comment',
			sortable: true,
			type: 'string'
		},
		{
			key: 'actions',
			label: 'actions',
			sortable: true,
			type: 'string'
		}
	],
	testhtml: `
				<div>
					<span>Some HTML here</span>
				</div>
  			`
};

export { config };
