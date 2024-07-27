import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuButton = ({ buttonLabel, menuItems, selected }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {buttonLabel}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItems?.map((item, index) => (
                    <MenuItem key={index} onClick={() => {
                        item.onClick(selected);
                        handleClose();
                    }}>
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

MenuButton.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MenuButton;
