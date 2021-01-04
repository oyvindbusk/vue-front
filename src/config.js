let config;

config = {
	$backend_url: 'http://localhost:5001',
	$signout_url: function() {
		return this.$backend_url + '/newlogout';
	},
	initfilters: {
		filters: {
			regular: [
				{
					filtervalue: '1',
					operator: 'eq',
					keepmiss: false,
					columns: 'chr'
				}
			]
		}
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
		{ value: 'chr', text: 'Chr' },
		{ value: 'pos', text: 'Pos' },
		{ value: 'ref', text: 'Ref' },
		{ value: 'alt', text: 'Alt' },
		{ value: 'zyg', text: 'Zygosity' },
		{ value: 'gene', text: 'Gene Name' },
		{ value: 'gnomAD', text: 'gnomAD' },
		{ value: 'HGMD', text: 'HGMD' },
		{ value: 'class', text: 'Class' },
		{ value: 'comment', text: 'Comment' }
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
			key: 'zyg',
			label: 'Zygosity',
			sortable: true,
			type: 'string'
		},
		{
			key: 'gene',
			label: 'Gene Name',
			sortable: true,
			type: 'string'
		},
		{
			key: 'gnomAD',
			label: 'gnomAD freq',
			sortable: true,
			type: 'float'
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
		},
		{
			key: 'inheritance',
			label: 'Inheritance Mode',
			sortable: true,
			type: 'string'
		}
	],
	testhtml: `
				<div>
					<span>Some HTML here</span>
				</div>
			  `,
	classOptions: [
		{ value: null, text: 'Please select an option' },
		{ value: 1, text: '1' },
		{ value: 2, text: '2' },
		{ value: 3, text: '3' },
		{ value: 4, text: '4' },
		{ value: 5, text: '5' },
		{ value: 'U', text: 'U' }
	],
	filterChains: {
		standardFilter: {
			AD: [
				{
					filtervalue: '0.01',
					operator: 'lt',
					keepmiss: true,
					columns: 'gnomAD'
				}
			],
			AR: [
				{
					filtervalue: '0.1',
					operator: 'lt',
					keepmiss: true,
					columns: 'gnomAD'
				},
				{
					filtervalue: '1',
					operator: 'eq',
					keepmiss: true,
					columns: 'chr'
				}
			],
			HGMD: [
				{
					filtervalue: '',
					operator: 'neq',
					keepmiss: false,
					columns: 'HGMD'
				}
			]
		},
		otherFilter: {
			AD: [
				{
					filtervalue: '1',
					operator: 'eq',
					keepmiss: false,
					columns: 'chr'
				},
				{
					filtervalue: '1',
					operator: 'eq',
					keepmiss: false,
					columns: 'chr'
				}
			],
			AR: [
				{
					filtervalue: '1',
					operator: 'eq',
					keepmiss: false,
					columns: 'chr'
				},
				{
					filtervalue: '1',
					operator: 'eq',
					keepmiss: false,
					columns: 'chr'
				}
			]
		}
	}
};

export { config };
