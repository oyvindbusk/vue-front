var app = new Vue({
	el: '#app',
	data: {
		positionID: '',
		gnomad_af_nfe: '',
		gnomad_af: '',
		varclass: '',
		comment: '',
		signedUrl: '',
		pos: '',
		sampleComment: '',
		sampleID: '',
		phenotypes: [],
		sessionComment: '',
		date: '',
		usr: '',
		gene: '',
		interpdVars: {},
		filters: {}
	},
	methods: {
		tableClickUpdate: function(event) {
			// Gets the data from the table, and sets it to the vue-variables:
			$('#variants').on('select.dt', (e, dt, type, indexes) => {
				var data = getCurrentVariant(e, dt, type, indexes); // Gets the data for the selected variant
				this.positionID = data[0]['positionID'];
				this.gnomad_af_nfe = data[0]['gn_afnfe'];
				this.gnomad_af = data[0]['gn_af'];
				this.varclass = data[0]['class'];
				this.comment = data[0]['comment'];
				this.pos = data[0]['chr'] + ':' + (data[0]['pos'] - 40) + '-' + (parseInt(data[0]['pos']) + 40);
				this.phenotypes = data[0]['phenotype'].split('||');
				this.gene = data[0]['geneName'];

				// If class is already present, add to interpdVars:
				if (this.varclass.length > 0) {
					this.interpdVars[this.positionID] = {
						varclass: this.varclass,
						usr: this.usr,
						comment: this.comment,
						date: this.date,
						gene: this.gene
					};
				}
				if (igv.browser) {
					this.loadIGV();
				}
			});
		},
		save_interp: function(event) {
			// Intermediate save
			console.log(event.target.id);
			var button_id = event.target.id;
			var senddata = {
				username: this.usr,
				sampleID: this.sampleID,
				sampleComment: this.sessionComment,
				variantInterps: JSON.stringify(this.interpdVars),
				signoff: button_id == 'sendInterpButton' ? true : false
			};
			$.post(
				'/api/saveVariant',
				senddata, // Make a function that gets the data from the forms with class and comment
				function(data, status, xhr) {
					// success callback function
					console.log('intermediate save data. Status sending POST: ' + status);
				}
			);
		},

		loadIGV: function(event) {
			var igvDiv = document.getElementById('igvDiv');
			var options = {
				genome: 'hg19',
				locus: this.pos,
				tracks: [
					{
						name: this.sampleID,
						url: this.signedUrl['bam'],
						indexURL: this.signedUrl['bai'],
						format: 'bam'
					}
				]
			};
			if (igv.browser) {
				console.log('exists');
				//options.locus = this.pos;
				igv.browser.search(options.locus);
			} else {
				igv.createBrowser(igvDiv, options).then(function(browser) {
					igv.browser = browser;
					console.log('Created IGV browser');
				});
			}
		},

		resetFilters: function(event) {
			this.filters = {};
		},

		reportGeneration: function(event) {
			console.log('reportButton clicked');
			// Reset variable interpdvars:
			//this.interpdVars = []
			// Fill with variant info:
			var self = this; // To be able to reach this inside function
			var user = self.usr;
			var dt = self.date;
			$('#variants').DataTable().rows().every(function(rowIdx, _tableLoop, _rowLoop) {
				var data = this.data();
				var c = data['class'];
				var geneName = data['geneName'];
				var cmt = data['comment'];

				if (data['class'].length) {
					//this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
					var position = data['positionID'];
					var interpObj = {};
					interpObj[position] = { gene: geneName, usr: user, comment: cmt, date: dt, varclass: c };
					self.interpdVars = Object.assign({}, self.interpdVars, interpObj);
				}
			});

			// $('#variants').DataTable().rows().every(function(rowIdx, _tableLoop, _rowLoop) {
			// 	var d = this.data();
			// 	if (d['class'].length) {
			// 		self.interpdVars[d['positionID']] = {
			// 			varclass: d['class'],
			// 			usr: self.usr,
			// 			comment: d['comment'],
			// 			date: self.date,
			// 			gene: d['geneName']
			// 		};
			// 	}
			// });
			$('#reportModal').modal('toggle');
		},
		onchange: function() {
			this.interpdVars[this.positionID] = {
				varclass: this.varclass,
				usr: this.usr,
				comment: this.comment,
				date: this.date,
				gene: this.gene
			};
		}
	},
	created: function(event) {
		// Get the sample name from the sampleInfo_ID of the first row in the table:
		this.sampleID = getSample();

		this.usr = $('#hiddenuser').text().replace('\n', '');
		this.date = yyyymmdd();
		// Get the signed urls for the bam and bai
		axios
			.get('/api/bam/' + this.sampleID)
			.then((response) => {
				var signedUrlTemp = response.data;
				// Exchange the ip in the bam/bai-uri with that of localhost:
				signedUrlTemp['bam'] = signedUrlTemp['bam'].replace(
					/((?:\d+\.){3}\d+)(?=:\d+)/gi,
					window.location.hostname
				);
				signedUrlTemp['bai'] = signedUrlTemp['bai'].replace(
					/((?:\d+\.){3}\d+)(?=:\d+)/gi,
					window.location.hostname
				);
				this.signedUrl = signedUrlTemp;
			})
			.catch((error) => {});

		// Get data for previous sessions with this sample name
		axios
			.get('/api/sessionInfo/' + this.sampleID)
			.then((response) => {
				var data = response.data;
				this.sessionComment = data['comment'];
			})
			.catch((error) => {});
	}
});
