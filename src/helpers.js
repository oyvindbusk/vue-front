var helper_funcs = {
	filter_variants(variant) {
		switch (this.filter.operator) {
			case 'eq':
				if (variant[this.filter.columns] === this.filter.filtervalue) {
					variant.visibility = true;
					if (this.inheritance !== '') {
						if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
							variant.inheritance = this.inheritance + '-' + variant.inheritance;
						} else {
							variant.inheritance = this.inheritance;
						}
					}
				}
				break;
			case 'neq':
				if (variant[this.filter.columns] !== this.filter.filtervalue) {
					variant.visibility = true;
					if (this.inheritance !== '') {
						if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
							variant.inheritance = this.inheritance + '-' + variant.inheritance;
						} else {
							variant.inheritance = this.inheritance;
						}
					}
				}
				break;
			case 'sw':
				if (variant[this.filter.columns].startsWith(this.filter.filtervalue)) {
					variant.visibility = true;
					if (this.inheritance !== '') {
						if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
							variant.inheritance = this.inheritance + '-' + variant.inheritance;
						} else {
							variant.inheritance = this.inheritance;
						}
					}
				}
				break;
			case 'nsw':
				if (!variant[this.filter.columns].startsWith(this.filter.filtervalue)) {
					variant.visibility = true;
					if (this.inheritance !== '') {
						if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
							variant.inheritance = this.inheritance + '-' + variant.inheritance;
						} else {
							variant.inheritance = this.inheritance;
						}
					}
				}
				break;
			case 'c':
				if (variant[this.filter.columns].includes(this.filter.filtervalue)) {
					variant.visibility = true;
					if (this.inheritance !== '') {
						if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
							variant.inheritance = this.inheritance + '-' + variant.inheritance;
						} else {
							variant.inheritance = this.inheritance;
						}
					}
				}
				break;
			case 'lt':
				// Should check and convert to int
				if (variant[this.filter.columns] < this.filter.filtervalue) {
					variant.visibility = true;
					if (this.inheritance !== '') {
						if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
							variant.inheritance = this.inheritance + '-' + variant.inheritance;
						} else {
							variant.inheritance = this.inheritance;
						}
					}
				}
				break;
			case 'gt':
				if (variant[this.filter.columns] > this.filter.filtervalue) {
					variant.visibility = true;
					if (this.inheritance !== '') {
						if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
							variant.inheritance = this.inheritance + '-' + variant.inheritance;
						} else {
							variant.inheritance = this.inheritance;
						}
					}
				}
				break;
		}
		if (this.filter.keepmiss == true) {
			if (variant[this.filter.columns] === '') {
				variant.visibility = true;
				if (this.inheritance !== '') {
					if ((variant.inheritance !== '') & !variant.inheritance.split('-').includes(this.inheritance)) {
						variant.inheritance = this.inheritance + '-' + variant.inheritance;
					} else {
						variant.inheritance = this.inheritance;
					}
				}
			}
		}
		return variant;
	}, //
	set_vis_false(variant) {
		variant.visibility = false;
		return variant;
	},
	set_vis_true(variant) {
		// Sets visibility true for all (unapply all filters)
		variant.visibility = true;
		return variant;
	},
	set_inheritance_clear(variant) {
		// enters a badge in a column
		variant.inheritance = '';
		return variant;
	}
};

export default helper_funcs;
