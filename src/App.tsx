import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import HomePage from './pages/HomePage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import {Divider, IconButton} from "@mui/material";
import {Home as HomeIcon} from "@mui/icons-material";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'

const queryClient = new QueryClient();
const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#e7de2d',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    },
});
const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>

            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Router>
                    <AppBar position="relative">
                        <Toolbar>
                            <Link to="/">
                                <IconButton sx={{p: '10px'}}>
                                    <HomeIcon/>
                                </IconButton>
                            </Link>
                            <Divider sx={{height: 28, mr: 1, bgcolor: "primary.main"}} orientation="vertical"/>
                            <Typography variant="h6" color="inherit" noWrap>
                                STAR WARS: Characters
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/characters/:id" component={CharacterDetailPage}/>
                        </Switch>
                    </main>
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
