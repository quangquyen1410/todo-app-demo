import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { openDialog } from '../../app/actions/actionDialogs';
export default function OpenMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();

    const handleClose = (router: string) => {
        history.push(router)
        setAnchorEl(null);
    };
    const openCreateUser = () => {
        dispatch(openDialog());
        setAnchorEl(null);
    }
    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} color="primary">
                Menu
      </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => { setAnchorEl(null) }}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => handleClose('/trang-chu')}>Trang chủ</MenuItem>
                <MenuItem onClick={openCreateUser}>Thêm user</MenuItem>
            </Menu>
        </div >
    );
}
