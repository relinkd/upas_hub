import React from 'react';
import { addDecorator } from '@storybook/react';
import {CssBaseline, ThemeProvider} from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { getTheme, colorThemes } from '../src/shared/config';

const MUIDecorator = (story) => (
    <ThemeProvider theme={getTheme(colorThemes)}>
        <BrowserRouter>
            <CssBaseline />
            {/*<ToastContainer autoClose={4000} hideProgressBar position="bottom-right" closeButton />*/}
            {story()}
        </BrowserRouter>

    </ThemeProvider>

);

addDecorator(MUIDecorator);

export const parameters = {
    layout: 'fullscreen',
    backgrounds: {
        default: 'dark',
        values: [
            {
                name: 'dark',
                value: '#191836',
            },
            {
                name: 'facebook',
                value: '#3b5998',
            },
        ],
    },
};
