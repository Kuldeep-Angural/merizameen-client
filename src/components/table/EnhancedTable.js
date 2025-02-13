import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuButton from '../buttons/MenuButton';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) { return -1 }
  if (b[orderBy] > a[orderBy]) { return 1}
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = (props) => {
  const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, showsCheckBox, hasActions } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow >
        <TableCell padding="checkbox">
          {showsCheckBox === true && ( 
            <Checkbox color="primary" indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount} onChange={onSelectAllClick} inputProps={{'aria-label': 'select all items',}}/>)}
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell sx={{ fontSize: '12px', fontWeight: 550, width: headCell.width || '200px' }} key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? ( <Box component="span" sx={visuallyHidden}> {order === 'desc' ? 'sorted descending' : 'sorted ascending'} </Box> ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        {hasActions && (
          <TableCell padding="checkbox">
            <Typography>Action</Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, title, headerActions, searchTerm, onSearchChange, showSearch = true, showExport = true, handleExport } = props;

  return (
    <Toolbar sx={{ pl: { sm: 2 },pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && {bgcolor: '',}),}}>
      {numSelected > 0 ? (<Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">{numSelected} selected</Typography>) 
      : (<Typography sx={{ flex: '1 1 100%', fontWeight: '550' }} id="tableTitle" component="div">{title}</Typography>)}
      {numSelected > 0 ? ( headerActions?.map(({ title, action }) => {return (<Tooltip title={title}>{action}</Tooltip>)})) : (<></>)}
      {numSelected > 0 && showExport && <Tooltip title="Export"> <Button sx={{ marginLeft: 'auto',  }}onClick={handleExport}><ExitToAppIcon/></Button></Tooltip> }
      {showSearch && <TextField value={searchTerm} onChange={onSearchChange} placeholder="Search..." variant="outlined"size="small"sx={{ marginLeft: 'auto', width: '300px' }}/>}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

const EnhancedTable = ({ rows, headCells, title, showsCheckBox = true, recordsPerPage = 10, headerActions, hasActions = false, actionMenu, selected, setSelected, showSearch }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(recordsPerPage);
  const [buttonCLickSelect, setButtonClickSelect] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleButtonSelect = (event, id) => {
    setButtonClickSelect(id)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleExport = () => {
    const exportData = selected.length > 0 ? rows.filter(row => selected.includes(row.id)) : rows;
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${title}.xlsx`);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(() => stableSort(filteredRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [order, orderBy, page, rowsPerPage, filteredRows]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} headerActions={headerActions} searchTerm={searchTerm} onSearchChange={handleSearchChange} showSearch={showSearch} handleExport={handleExport} />
        <TableContainer>
          <Table exportButton={true} sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead headCells={headCells} numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={filteredRows.length} hasActions={hasActions} showsCheckBox={showsCheckBox} actionMenu={actionMenu} />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover onClick={(event) => handleButtonSelect(event, row.id)} aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected} sx={{ cursor: 'pointer' }}>
                    <TableCell >
                      {showsCheckBox === true && (
                        <Checkbox onClick={(event) => showsCheckBox === true && handleClick(event, row.id)} role="checkbox" color="primary" checked={isItemSelected}inputProps={{'aria-labelledby': labelId,}}/>
                      )}
                    </TableCell>
                    {headCells.map((cell) => (
                      <TableCell style={{ height: '60px' }} key={cell.id} align={cell.numeric ? 'right' : 'left'} sx={{ fontSize: '10px' }} padding={cell.disablePadding ? 'none' : 'normal'}>
                        {row[cell.id]}
                      </TableCell>
                    ))}
                    {hasActions && (
                      <TableCell padding="checkbox">
                        <MenuButton buttonLabel={<MenuIcon />} menuItems={actionMenu} selected={buttonCLickSelect} />
                      </TableCell>
                    )}

                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows, }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredRows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </Box>
  );
};

EnhancedTable.propTypes = {
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default EnhancedTable;
