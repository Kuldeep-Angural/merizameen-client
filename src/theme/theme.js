import { createTheme } from "@mui/material";
import { blue, green, orange, purple, red,b } from "@mui/material/colors";

export const theme = createTheme({
    palette:{
        primary:{
            main:'#45a148',
            light:'#45a148',
            dark:'#f5bc00'
        },
        secondary:{
            main:'#f5bc00'
        },
        success:{
            main:green[200]
        },
        error:{
            main:red[900]
        },
        warning:{
            main:orange[200]
        },
        info:{
            main:blue[200]
        },
        text:{
            main:'#000000'
        },
        input:{
            main:'#1B1A55'
        }
    }
})

