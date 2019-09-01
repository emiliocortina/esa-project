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

module.exports = {
	PaginationInfo: PaginationInfo,
	SortField: SortField,
	ASC: 'ASC',
	DES: 'DES'
};
