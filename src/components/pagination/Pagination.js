import React, { useEffect, useState } from 'react';
import { Pagination as MUIPagination } from '@mui/material';
import { addDelay } from '../../utils/utility';

const Pagination = ({  data, currentRecords, recordsPerPage = 2, searchParams, filterParams, setProperties, setAppLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const totalPages = Math.ceil(data.length / recordsPerPage);

    useEffect(() => {
        const shouldFetchData = ![undefined, null, ''].includes(filterParams) || ![undefined, null, ''].includes(searchParams);

        if (shouldFetchData) {
            setAppLoading(true);
            fetchData();
        } else {
            setProperties(data);
        }

        currentRecords(data.slice(indexOfFirstRecord, indexOfLastRecord));
    }, [filterParams, searchParams, data, currentPage]);

    const fetchData = async () => {
        const query = searchParams?.toLowerCase() || '';
        const filterChange = filterParams;

        let filteredData = data;

        if (query) {
            filteredData = filteredData.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(query)
                )
            );
        }

        if (filterChange) {
            filteredData = filteredData.filter(item =>
                item.propertyType === filterChange
            );
        }

        await addDelay(800);
        setAppLoading(false);
        setProperties(filteredData);
    };

    const handleChange = (event, page) => {
        setCurrentPage(page);
        currentRecords(data.slice((page - 1) * recordsPerPage, page * recordsPerPage));
    };

    return (
        <MUIPagination count={totalPages} page={currentPage}onChange={handleChange}variant="outlined"shape="rounded"/>
    );
};

export default Pagination;
