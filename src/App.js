import './App.css';
import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppBar from "@mui/material/AppBar";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Toolbar from '@mui/material/Toolbar';
import Paper from "@mui/material/Paper";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from "@mui/material/IconButton";
import Encrypt from './tools/encrypt';
import RickRoll from './tools/rickroll';
import RandomPicker from "./tools/random-picker";


function App() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // use this to add a new tool
    function makeTool(tool, id, title) {
        return (
            <Accordion
                key={id}
                TransitionProps={{unmountOnExit: true}}
                expanded={expanded === id}
                onChange={handleChange(id)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={`${id}-content`}
                    id={`${id}-header`}
                >
                    <Typography variant="h6">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {tool}
                </AccordionDetails>
            </Accordion>
        )
    }

    const [mode, setMode] = React.useState('light');

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper style={{minHeight: "100vh"}}>
                <AppBar position="static">
                    <Toolbar>
                        <HomeRepairServiceIcon sx={{mr: 1}}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Simple Toolbox
                        </Typography>
                        <Typography>
                            {theme.palette.mode}
                        </Typography>
                        <IconButton sx={{ml: 1}} onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container sx={{mt: 2}}>
                    {makeTool(<Encrypt/>, 'encrypt', 'Encrypt')}
                    {makeTool(<RandomPicker/>, 'random-picker', 'Random Picker')}
                    {/* add your new tools here, right above the Rick Roll :) */}
                    {makeTool(<RickRoll/>, 'rickroll', "Don't open this")}
                </Container>
            </Paper>
        </ThemeProvider>
    );
}

export default App;
