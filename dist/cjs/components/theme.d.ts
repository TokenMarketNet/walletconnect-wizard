import * as React from 'react';
export declare type Theme = Record<string, any>;
export declare const DefaultTheme: Theme;
export declare const themeVar: (varName: string) => (props: any) => any;
export declare const GlobalStyleWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export interface ThemeWrapperProps {
    children: React.ReactNode;
    className?: string;
    theme?: Theme;
}
export declare const ThemeWrapper: ({ theme, children, className }: ThemeWrapperProps) => JSX.Element;
export declare const Header: import("styled-components").StyledComponent<"header", any, {}, never>;
export declare const SubHeading: import("styled-components").StyledComponent<"h2", any, {}, never>;
export declare const ButtonLink: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const Row: import("styled-components").StyledComponent<"div", any, {}, never>;
export interface ColProps {
    centered?: boolean;
}
export declare const Col: import("styled-components").StyledComponent<"section", any, ColProps, never>;
export declare const HorizontalSeparator: import("styled-components").StyledComponent<"div", any, {}, never>;
