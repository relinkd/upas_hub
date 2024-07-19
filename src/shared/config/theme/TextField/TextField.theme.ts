import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { BORDER_RADIUS_S } from 'shared/config';

export const getMuiTextFieldOverrides = (theme: Theme): ComponentsOverrides['MuiTextField'] => ({
  root: {
    width: '100%',
    '.MuiInputBase-root': {
      padding: theme.spacing(2),
      height: 48,
      background: `${theme.themeColors.textFieldBackground} !important`,
      border: `1px solid`,
      borderColor: theme.themeColors.textFieldBorder,
      borderRadius: BORDER_RADIUS_S,
      '&::after, &::before': {
        display: 'none',
      },
      '&:hover, &:active': {
        borderColor: theme.themeColors.textFieldBorderHover,
      },
      '&.Mui-focused': {
        borderColor: theme.themeColors.textFieldBorderFocused,
      },
      '&.Mui-disabled': {
        borderColor: theme.themeColors.textFieldBackground,
      },
      '.MuiInputBase-input': {
        ...theme.typography.body2,
        lineHeight: '20px',
        padding: 0,
        color: theme.themeColors.textFieldColor,
        '&.Mui-disabled': {
          opacity: 1,
          color: theme.themeColors.textFieldColorDisabled,
          WebkitTextFillColor: theme.themeColors.textFieldColorDisabled,
        },
      },
      '.MuiFilledInput-notchedOutline': {
        padding: 0,
      },
      '&.Mui-error': {
        borderColor: `${theme.themeColors.textFieldColorError} !important`,
      },
      '&.Mui-error fieldset': {
        borderColor: `${theme.themeColors.textFieldColorError} !important`,
      },
    },
    '.MuiInputBase-multiline': {
      background: theme.themeColors.textFieldBackground,
      minHeight: 48,
      height: 'min-content',
    },

    '.MuiFormLabel-root': {
      ...theme.typography.body2,
      lineHeight: '20px',
      color: theme.themeColors.textFieldFormLabel,
      textTransform: 'capitalize',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0px, -20px) scale(0.75)',
      },
      '&.Mui-focused': {
        color: theme.themeColors.textFieldFormLabel,
      },
    },
    'input:-webkit-autofill': {
      boxShadow: '0 0 0 1000px transparent inset !important',
      transitionDelay: '999999s',
      transitionProperty: 'background-color, color',
    },
  },
});

export const getMuiTextFieldDefaultProps = (): ComponentsProps['MuiTextField'] => ({
  variant: 'filled',
  SelectProps: {
    displayEmpty: true,
  },
  InputProps: {
    autoComplete: 'off',
  },
});
