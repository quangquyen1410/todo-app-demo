import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type ConfirmDeleteProps = {
    open: boolean,
    onClose: (openState: boolean) => void,
    onDelete: (deleteState: boolean) => void
}

export default function ConfirmDeleteDialog(props: ConfirmDeleteProps) {
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    const handleClose = () => {
        props.onClose(false);
        props.onDelete(false);
    };
    const handleDelete = () => {
        props.onClose(false);
        props.onDelete(true);
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa người dùng?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa người dùng này?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy bỏ
          </Button>
                    <Button onClick={handleDelete} color="primary" variant="contained" autoFocus>
                        Đồng ý
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
