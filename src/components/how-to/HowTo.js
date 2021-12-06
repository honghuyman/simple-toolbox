import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

export default function HowTo({content}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'how-to' : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                variant="text"
                onClick={handleClick}
                color="info"
            >
                HOW TO USE
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{p: 1}}>
                    {content}
                </Box>
            </Popover>
        </div>
    );
}