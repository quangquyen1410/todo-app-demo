import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import { StateInterface } from '../../interface/stateInterface';
import { closeDialog, openDialog } from '../../app/actions/actionDialogs';
import { useFormik } from 'formik';
import { User } from '../../interface/userInterface';
import * as Yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { addUser, setUpdate, updateUser } from '../../app/actions/actionUser';
import { listPositions } from '../../api/listPositions';
import { closeUpdate } from '../../app/actions/actionIsUpdate';
import { useHistory } from 'react-router-dom';


const CreateUser = () => {
    const dispatch = useDispatch();
    const openCreateUser: boolean = useSelector((state: StateInterface) => state.dialogs);
    const isUpdate: boolean = useSelector((state: StateInterface) => state.isUpdate);
    const userUpdate: User = useSelector((state: StateInterface) => state.user);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    useEffect(() => {
        setOpen(openCreateUser);
    }, [openCreateUser])
    useEffect(() => {
        isUpdate && dispatch(openDialog())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdate])
    let handleClose = (resetForm: () => void) => {
        dispatch(closeDialog())
        setOpen(false);
        resetForm && resetForm();
        if (isUpdate) {
            dispatch(closeUpdate());
            history.push('/trang-chu')
            dispatch(setUpdate(initialUser));
        }
    };
    const initialUser: User = {
        id: 0,
        firstName: '',
        lastName: '',
        fullName: '',
        phone: '',
        position: 0,
        birthDt: ''
    }
    const formAddUser = useFormik({
        initialValues: userUpdate,
        validationSchema: Yup.object({
            firstName: Yup.string().required('Họ không được để trống'),
            lastName: Yup.string().required('Tên không được để trống'),
            phone: Yup.string().required('Số điện thoại không được để trống'),

            birthDt: Yup.string().required('Ngày sinh không được để trống')
        }),
        onSubmit: (values, actions) => {
            if (values.id === 0) {
                values.id = Math.floor(Math.random() * 1000000) + 1;
                dispatch(addUser(values));
            } else {
                dispatch(updateUser(values));
                dispatch(setUpdate(initialUser));
            }

            actions.setSubmitting(false)
            handleClose(actions.resetForm);
        }
    });
    useEffect(() => {
        formAddUser.setFieldValue('fullName', formAddUser.values.firstName + ' ' + formAddUser.values.lastName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formAddUser.values.firstName, formAddUser.values.lastName])
    useEffect(() => {
        console.log('Render');

    }, [])
    return (
        <div>

            <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={() => handleClose(formAddUser.resetForm)} aria-labelledby="form-dialog-title">
                <form onSubmit={formAddUser.handleSubmit} noValidate>
                    <DialogTitle id="form-dialog-title">{isUpdate ? 'Sửa user' : 'Thêm mới user'}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText> */}

                        <TextField
                            error={
                                formAddUser.errors.firstName && formAddUser.touched.firstName
                                    ? true
                                    : false
                            }
                            required
                            autoFocus
                            margin="dense"
                            id="firstName"
                            name="firstName"
                            label="Họ"
                            type="text"
                            fullWidth
                            value={formAddUser.values.firstName}
                            onChange={formAddUser.handleChange}
                        />
                        {formAddUser.errors.firstName && formAddUser.touched.firstName && (
                            <FormHelperText error>{formAddUser.errors.firstName}</FormHelperText>
                        )}
                        <TextField
                            error={
                                formAddUser.errors.lastName && formAddUser.touched.lastName
                                    ? true
                                    : false
                            }
                            required
                            margin="dense"
                            id="lastName"
                            name="lastName"
                            label="Tên"
                            type="text"
                            fullWidth
                            value={formAddUser.values.lastName}
                            onChange={formAddUser.handleChange}
                        />
                        {formAddUser.errors.lastName && formAddUser.touched.lastName && (
                            <FormHelperText error >{formAddUser.errors.lastName}</FormHelperText>
                        )}
                        <TextField
                            required
                            margin="dense"
                            id="fullName"
                            name="fullName"
                            label="Họ và tên"
                            type="text"
                            fullWidth
                            disabled
                            value={formAddUser.values.fullName}
                        />
                        <TextField
                            error={
                                formAddUser.errors.phone && formAddUser.touched.phone
                                    ? true
                                    : false
                            }
                            required
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Số điện thoại"
                            type="text"
                            fullWidth
                            value={formAddUser.values.phone}
                            onChange={formAddUser.handleChange}
                        />
                        {formAddUser.errors.phone && formAddUser.touched.phone && (
                            <FormHelperText error >{formAddUser.errors.phone}</FormHelperText>
                        )}
                        {/* <TextField
                        margin="dense"
                        id="position"
                        label="Chức vụ"
                        type="text"
                        fullWidth
                        value={formAddUser.values.position}
                        onChange={formAddUser.handleChange}
                    /> */}
                        <FormControl margin="dense" fullWidth required >
                            <InputLabel id="position-label">Vị trí</InputLabel>
                            <Select
                                error={
                                    formAddUser.errors.position && formAddUser.touched.position
                                        ? true
                                        : false
                                }
                                labelId="position-label"
                                id="position"
                                name="position"
                                fullWidth
                                value={formAddUser.values.position}
                                onChange={formAddUser.handleChange}
                            >
                                <MenuItem disabled value={0}>Chọn</MenuItem>
                                {listPositions.map((pos, index) =>
                                    <MenuItem key={index} value={pos.value}>{pos.text}</MenuItem>
                                )}
                            </Select>
                            {formAddUser.errors.position && formAddUser.touched.position && (
                                <FormHelperText error >{formAddUser.errors.position}</FormHelperText>
                            )}
                        </FormControl>
                        <TextField
                            error={
                                formAddUser.errors.birthDt && formAddUser.touched.birthDt
                                    ? true
                                    : false
                            }
                            required
                            margin="dense"
                            id="birthDt"
                            name="birthDt"
                            label="Ngày sinh"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formAddUser.values.birthDt}
                            onChange={formAddUser.handleChange}
                        />
                        {formAddUser.errors.birthDt && formAddUser.touched.birthDt && (
                            <FormHelperText error >{formAddUser.errors.birthDt}</FormHelperText>
                        )}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(formAddUser.resetForm)} color="primary">
                            Hủy
                        </Button>
                        <Button type="submit" color="primary">
                            {isUpdate ? 'Cập nhật' : 'Tạo mới'}

                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default CreateUser;