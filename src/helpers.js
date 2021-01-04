var helper_funcs = {
	filter_variants(variant) {
		switch (this.filter.operator) {
			case 'eq':
				if (variant[this.filter.columns] === this.filter.filtervalue) {
					variant.visibility = true;
				}
				break;
			case 'neq':
				if (variant[this.filter.columns] !== this.filter.filtervalue) {
					variant.visibility = true;
				}
				break;
			case 'sw':
				if (variant[this.filter.columns].startsWith(this.filter.filtervalue)) {
					variant.visibility = true;
				}
				break;
			case 'nsw':
				if (!variant[this.filter.columns].startsWith(this.filter.filtervalue)) {
					variant.visibility = true;
				}
				break;
			case 'c':
				if (variant[this.filter.columns].includes(this.filter.filtervalue)) {
					variant.visibility = true;
				}
				break;
			case 'lt':
				// Should check and convert to int
				if (variant[this.filter.columns] < this.filter.filtervalue) {
					variant.visibility = true;
				}
				break;
			case 'gt':
				if (variant[this.filter.columns] > this.filter.filtervalue) {
					variant.visibility = true;
				}
				break;
		}
		if (this.filter.keepmiss == true) {
			if (variant[this.filter.columns] === '') {
				variant.visibility = true;
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
	set_inheritance(variant, inheritance) {
		// enters a badge in a column
		variant.inheritance = inheritance;
		console.log(variant.inheritance);
	}
};

export default helper_funcs;
