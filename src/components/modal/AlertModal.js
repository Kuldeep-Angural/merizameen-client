import { Box, Button, Typography } from '@mui/material';
import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import Modal from './Modal';

const AlertModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const resolveRef = useRef(null);

    useImperativeHandle(ref, () => ({
        showAlert: ({ title }) => {
            setTitle(title);
            setOpen(true);

            return new Promise((resolve) => {
                resolveRef.current = resolve;
            });
        },
    }));

    const onClick = (result) => {
        if (resolveRef.current) {
            resolveRef.current(result);
            resolveRef.current = null;
        }
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={{ minHeight: 100 }}>
                <Typography textAlign="center" fontWeight={700} mt={2}>
                    {title}
                </Typography>
                <Box display="flex" sx={{ position: 'relative', top: 40, justifyContent: 'flex-end', width: '100%' }}>
                    <Box display="flex" justifyContent="space-between">
                        <Button sx={{ width: '100px', backgroundColor: '#D3D3D3' }} variant="standard" onClick={() => onClick(false)}>
                            No
                        </Button>
                        <Button sx={{ ml: 3, width: '100px' }} variant="contained" onClick={() => onClick(true)}>
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
});

export default AlertModal;
