var PaginationModel = require('./../models/PaginationModel');

exports.parseHeader = function (params) {
    const sort_by_raw = params.sort_by;
    const page_number = params.page_number ? parseInt(params.page_number) : 1;
    const page_elements = params.page_elements ? parseInt(params.page_elements) : 10;

    var paginationInfo = new PaginationModel.PaginationInfo();
    paginationInfo.page_number = page_number;
    paginationInfo.page_elements = page_elements;

    var sortFieldsArray = [];
    //parse del sort by
    if (sort_by_raw) {
        const sortByFieldsRaw = sort_by_raw.split(',');
        sortByFieldsRaw.forEach((field) => {
            var sortField = new PaginationModel.SortField();
            const splitted = field.split('(');
            if (splitted.length == 1) {
                //no viene sentido de ordenacion
                sortField.order = PaginationModel.DES;
            } else {
                if (splitted[1].includes('ASC')) {
                    sortField.order = PaginationModel.ASC;
                } else if (splitted[1].includes('DES')) {
                    sortField.order = PaginationModel.DES;
                } else {
                    throw new Error('Invalid sort order');
                }
            }

            sortField.key = splitted[0];
            sortFieldsArray.push(sortField);
        });
    }

    const filter_by_raw = params.filter_by;
    console.log(filter_by_raw);
    if (filter_by_raw) {
        var filterFieldsObject = {};
        const filterByFieldsRaw = filter_by_raw.split(',');
        filterByFieldsRaw.forEach((field) => {
            const splitted = field.split(/[()]/);
            //Format nombre(valor)
            if (splitted.length == 1) {
                //no viene valor del filtro, skip
            } else {
                const key = splitted[0];
                const value = splitted[1];
                filterFieldsObject[key] = value;
            }
        }
        );
    }

    paginationInfo.sortFields = sortFieldsArray;
    paginationInfo.filterFields = filterFieldsObject;
    return paginationInfo;
};
