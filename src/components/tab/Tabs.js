import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { Tabs as MuiTabs } from '@mui/material';
import React, { useState } from 'react';

export const TabsViewType = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: '550',
    fontSize: theme.typography.pxToRem(15),

    marginRight: theme.spacing(1)

}));

const Tabs = ({ current, tabItems, onClick, className, type = TabsViewType.HORIZONTAL }) => {
    const [value, setValue] = useState(current || tabItems[0].value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onClick(newValue);
    };

    return (

        <MuiTabs
            // className={`segment-radio ${className}`}
            value={current || value}
            orientation={type}
            onChange={handleChange}

            variant='scrollable' scrollButtons="auto"
            textColor="primary"
            sx={{
                marginLeft: '40px',
                '& .MuiTabs-indicator': { backgroundColor: '#47A8F5' },
                '& .Mui-selected': { color: '#47A8F5' }
            }}
            TabIndicatorProps={{
                sx: { backgroundColor: '#47A8F5' }
            }}
            centered={true}
        >
            {tabItems
                ?.filter((tabData) => !tabData.disabled)
                .map(
                    ({ condition = true, ...rest }) =>
                        condition && <StyledTab {...rest} />
                )}
        </MuiTabs>
    );
};

export default Tabs;
