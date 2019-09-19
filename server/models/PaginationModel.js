class PaginationInfo {
	constructor() {
		this.sortFields;
		this.filterFields;
		this.page_elements;
		this.page_number;
	}
}

class SortField {
	constructor() {
		this.key;
		this.order;
	}
}

class FilterField {
	constructor() {
		this.key;
		this.value;
	}
}

module.exports = {
	PaginationInfo: PaginationInfo,
	SortField: SortField,
	FilterField: FilterField,
	ASC: 'ASC',
	DES: 'DES'
};
