import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

export type Theme = Record<string, any>;

export const DefaultTheme: Theme = {
    colorLink: "#007bff",
    colorLinkHover: "#4094ef",
    colorText: "#111",
    colorGray: "#999",
    breakpointMobileMax: '700px',
    fontFamilyMain: 'open sans, Helvetica, Arial, sans-serif',
}

export const themeVar = (varName: string) => (props: any): any => {
    const theme = props.theme || {};
    const value = theme[varName];
    if (value === undefined) {
        return DefaultTheme[varName];
    }
    return value;
}

export const GlobalStyleWrapper = styled.div`
    * {
        color: ${themeVar('colorText')};
        font-family: ${themeVar('fontFamilyMain')};
    }

    a {
        color: ${themeVar('colorLink')};
    }
    a:hover {
        color: ${themeVar('colorLinkHover')};
    }
`

export interface ThemeWrapperProps {
    children: React.ReactNode;
    className?: string;
    theme?: Theme;
}
export const ThemeWrapper = ({ theme, children, className }: ThemeWrapperProps) => (
    <ThemeProvider theme={theme || DefaultTheme}>
        <div className={className}>
            <GlobalStyleWrapper>
                {children}
            </GlobalStyleWrapper>
        </div>
    </ThemeProvider>
)

export const Header = styled.header`
    margin: 20px 50px;
    font-size: 1.25em;
    text-align: center;
`

export const SubHeading = styled.h2`
    font-size: 1.15em;
`

export const ButtonLink = styled.button`
    margin: 5px 0;
    border: 0;
    padding: 0;
    background-color: transparent;
    color: ${themeVar('colorLink')};
    display: inline-block;
    font-size: 1em;
    cursor: pointer;
    transition: color .2s;

    &:hover {
        color: ${themeVar('colorLinkHover')};
    }

    &::after {
        //content: " ›";
    }
`

export const SupportBullets = styled.div`
    text-align: left;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: ${themeVar('breakpointMobileMax')}) {
        flex-wrap: wrap;
    }
`

export interface ColProps {
    centered?: boolean;
}
export const Col = styled.section<ColProps>`
    flex-grow: 1;
    padding-right: 20px;
    padding-left: 20px;
    border-right: 1px solid ${themeVar('colorGray')};
    flex-basis: 100%;

    &:first-child {
        padding-left: 0px;
    }
    &:last-child {
        padding-right: 0px;
        border-right: 0;
    }

    @media (max-width: ${themeVar('breakpointMobileMax')}) {
        padding-left: 0;
        padding-right: 0;
        border: 0;
    }

    text-align: ${(props: ColProps) => props.centered ? 'center' : 'inherit'};
`

export const HorizontalSeparator = styled.div`
    color: ${themeVar('colorGray')};
    margin-top: 20px;
    margin-bottom: 10px;

    &::before {
        content: "— ";
    }
    &::after {
        content: " —";
    }
`
