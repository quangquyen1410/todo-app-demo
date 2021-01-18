import React, { useEffect } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { User } from '../../interface/userInterface';
import CreateUser from './createUser';
import { listPositions } from '../../api/listPositions';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateInterface } from '../../interface/stateInterface';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import { openUpdate } from '../../app/actions/actionIsUpdate';
import { deleteMultipleUser, deleteUser, setUpdate } from '../../app/actions/actionUser';
import ConfirmDeleteDialog from './components/confirmDeleteDialog';
import i18n, { listLanguages } from '../../locales/i18n';
import MenuItem from '@material-ui/core/MenuItem';
import { setLangState } from '../../app/actions/actionLang';

// const createData = (
//     id: number,
//     firstName: string,
//     lastName: string,
//     phone: string,
//     position: number,
//     birthDt: string
// ): User => {
//     let fullName = firstName + ' ' + lastName;
//     return { id, firstName, lastName, fullName, phone, position, birthDt };
// }



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof User;
    label: string;
    numeric: boolean;
}


interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof User) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof User) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const headCells: HeadCell[] = [
        { id: 'id', numeric: false, disablePadding: true, label: i18n.t("listUser.lblId") },
        { id: 'firstName', numeric: false, disablePadding: false, label: i18n.t("listUser.lblFirstName") },
        { id: 'lastName', numeric: false, disablePadding: false, label: i18n.t("listUser.lblLastName") },
        { id: 'fullName', numeric: false, disablePadding: false, label: i18n.t("listUser.lblFullName") },
        { id: 'phone', numeric: false, disablePadding: false, label: i18n.t("listUser.lblPhone") },
        { id: 'position', numeric: false, disablePadding: false, label: i18n.t("listUser.lblPosition") },
        { id: 'birthDt', numeric: false, disablePadding: false, label: i18n.t("listUser.lblBirthDt") }
    ];
    return (

        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="default" align="center">
                    {i18n.t("listUser.lblAction")}
                </TableCell>
            </TableRow>
        </TableHead>


    );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface EnhancedTableToolbarProps {
    numSelected: number,
    onClose: (stateOpen: boolean) => void
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, onClose } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {i18n.t("listUser.lblListUser")}
                    </Typography>
                )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={() => onClose(true)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);
const ListUser = () => {
    const classes = useStyles();
    // const [rows, setRows] = useState<User[]>([]);
    const rows = useSelector((state: StateInterface) => state.listUser);
    const lang = useSelector((state: StateInterface) => state.language)
    const [listUser, setListUser] = useState<User[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof User>('fullName');
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof User) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    useEffect(() => {
        setListUser(rows);
    }, [rows])
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: number[] = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const handleUpdateUser = (user: User) => {
        history.push('/cap-nhat');
        dispatch(setUpdate(user));
        dispatch(openUpdate());
    }
    const handleDelete = (stateDelete: boolean) => {
        setConfirmDelete(stateDelete);
    }
    const handleConfirm = (stateOpen: boolean, id: number = 0) => {
        setOpenConfirm(stateOpen);
        if (id !== 0) setIdDelete(id);

    }
    useEffect(() => {

        if (confirmDelete) {
            if (idDelete !== 0) {
                dispatch(deleteUser(idDelete));
                setIdDelete(0);

            } else {
                dispatch(deleteMultipleUser(selected))
                setSelected([]);
            }
            setConfirmDelete(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmDelete])
    const handleSearch = (event: object, value: string) => {
        if (value) {
            setTimeout(() => {
                let search: User[] = rows.filter(x => x.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1);
                setListUser(search);
            }, 500)
            return
        }
        setListUser(rows);
    }

    const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLangState(event.target.value));

    }
    useEffect(() => {
        console.log("run")
    })
    return (
        <div className={classes.root}>
            <TextField
                id="change-language"
                select
                label="Chọn ngôn ngữ"
                value={lang || localStorage.getItem('lang') || 'vi'}
                onChange={changeLanguage}
                helperText="Vui lòng chọn ngôn ngữ"
            >
                {listLanguages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <CreateUser />
            <ConfirmDeleteDialog open={openConfirm} onClose={handleConfirm} onDelete={handleDelete} />
            <Autocomplete
                freeSolo
                id="search-input"
                disableClearable
                onInputChange={handleSearch}
                options={rows.map((row) => row.fullName)}
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        label="Tìm kiếm"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} onClose={handleConfirm} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={listUser.length}
                        />
                        <TableBody>
                            {stableSort(listUser, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    console.log(row);
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover

                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.firstName}</TableCell>
                                            <TableCell align="left">{row.lastName}</TableCell>
                                            <TableCell align="left">{row.fullName}</TableCell>
                                            <TableCell align="left">{row.phone}</TableCell>
                                            <TableCell align="left">{listPositions.find(pos => pos.value === row.position)?.text}</TableCell>
                                            <TableCell align="left">{row.birthDt}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Chỉnh sửa">
                                                    <IconButton aria-label="Chỉnh sửa" onClick={() => handleUpdateUser(row)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa">
                                                    <IconButton aria-label="Xóa" onClick={() => handleConfirm(true, row.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>


                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={listUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div >
    );
}


export default ListUser
