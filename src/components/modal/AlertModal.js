import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Modal from './Modal'

const AlertModal = ({ openAlert, closeAlert, respponse, title }) => {

    const onClick = (name) => {
        respponse(name)
    }


    return (
        <Modal open={openAlert} onClose={closeAlert}  >
            <Box sx={{ minHeight: 100 }}>
                <Typography textAlign="center" fontWeight={700}>
                    {title}
                </Typography>

                <Box
                    display="flex"
                    sx={{ position: 'relative', top: 40, justifyContent: 'flex-end', width: '100%' }}
                >
                    <Box display="flex" justifyContent="space-between">
                        <Button sx={{ mr: 3 }} variant="contained" onClick={() => onClick('yes')}>
                            Yes
                        </Button>
                        <Button variant="contained" onClick={() => onClick('no')}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Box>


        </Modal>
    )
}

export default AlertModal