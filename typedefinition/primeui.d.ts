// Type definitions for PrimeUI 3.0

/// <reference path="jqueryui.d.ts"/>

declare module PrimeUI {

    //puiinputtext
    interface InputTextOptions {
    }

    //puibutton
    interface ButtonOptions {
        value?: string;
        icon?: string;
        iconPos?: string;
        click?: (event?: Event) => void;
    }

    //Spinner
    interface SpinnerOptions {
        max?: number;
        min?: number;
        step?: number;
        prefix?: string;
        suffix?: string;
    }

    //Panel
    interface PanelOptions {
        toggleable?: boolean;
        toggleDuration?: any;
        toggleOrientation?: string;
        collapsed?: boolean;
        closable?: boolean;
        closeDuration: any;
        title?: string;
        beforeCollapse: (event?: Event) => void;
        afterCollapse: (event?: Event) => void;
        beforeExpand: (event?: Event) => void;
        afterExpand: (event?: Event) => void;
        beforeClose: (event?: Event) => void;
        afterClose: (event?: Event) => void;
    }

    //Fieldset
    interface FieldsetOptions {
        toggleable?: boolean;
        toggleDuration?: any;
        collapsed?: boolean;
        beforeToggle: (event?: Event) => void;
        afterToggle: (event?: Event) => void;
    }

    //Rating
    interface RatingOptions {
        stars?: number;
        cancel?: boolean;
        rate?: (event?: Event, value?: number) => void;
        oncancel?: (event?: Event) => void;
        disabled?: boolean;
        readonly?: boolean;
        value?: number;
    }

    //Password
    interface PasswordOptions {
        tpromptLabel?: string;
        weakLabel?: string;
        goodLabel?: string;
        strongLabel?: string;
        inline?: boolean;
    }
}

interface JQuery {

    puiinputtext(): JQuery;
    puiinputtext(methodName: 'destroy'): void;
    puiinputtext(methodName: 'disable'): void;
    puiinputtext(methodName: 'enable'): void;
    puiinputtext(methodName: 'refresh'): void;
    puiinputtext(methodName: 'widget'): JQuery;
    puiinputtext(methodName: string): JQuery;
    puiinputtext(options: PrimeUI.InputTextOptions): JQuery;
    puiinputtext(optionLiteral: string, optionName: string): any;
    puiinputtext(optionLiteral: string, options: PrimeUI.InputTextOptions): any;
    puiinputtext(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puibutton(): JQuery;
    puibutton(methodName: 'destroy'): void;
    puibutton(methodName: 'disable'): void;
    puibutton(methodName: 'enable'): void;
    puibutton(methodName: 'refresh'): void;
    puibutton(methodName: 'widget'): JQuery;
    puibutton(methodName: string): JQuery;
    puibutton(options: PrimeUI.ButtonOptions): JQuery;
    puibutton(optionLiteral: string, optionName: string): any;
    puibutton(optionLiteral: string, options: PrimeUI.ButtonOptions): any;
    puibutton(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puispinner(): JQuery;
    puispinner(methodName: 'destroy'): void;
    puispinner(methodName: 'disable'): void;
    puispinner(methodName: 'enable'): void;
    puispinner(methodName: 'refresh'): void;
    puispinner(methodName: 'widget'): JQuery;
    puispinner(methodName: string): JQuery;
    puispinner(options: PrimeUI.SpinnerOptions): JQuery;
    puispinner(optionLiteral: string, optionName: string): any;
    puispinner(optionLiteral: string, options: PrimeUI.SpinnerOptions): any;
    puispinner(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puipanel(): JQuery;
    puipanel(methodName: 'destroy'): void;
    puipanel(methodName: 'disable'): void;
    puipanel(methodName: 'enable'): void;
    puipanel(methodName: 'refresh'): void;
    puipanel(methodName: 'widget'): JQuery;
    puipanel(methodName: string): JQuery;
    puipanel(options: PrimeUI.PanelOptions): JQuery;
    puipanel(optionLiteral: string, optionName: string): any;
    puipanel(optionLiteral: string, options: PrimeUI.PanelOptions): any;
    puipanel(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puifieldset(): JQuery;
    puifieldset(methodName: 'destroy'): void;
    puifieldset(methodName: 'disable'): void;
    puifieldset(methodName: 'enable'): void;
    puifieldset(methodName: 'refresh'): void;
    puifieldset(methodName: 'widget'): JQuery;
    puifieldset(methodName: string): JQuery;
    puifieldset(options: PrimeUI.FieldsetOptions): JQuery;
    puifieldset(optionLiteral: string, optionName: string): any;
    puifieldset(optionLiteral: string, options: PrimeUI.FieldsetOptions): any;
    puifieldset(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puirating(): JQuery;
    puirating(methodName: 'destroy'): void;
    puirating(methodName: 'disable'): void;
    puirating(methodName: 'enable'): void;
    puirating(methodName: 'refresh'): void;
    puirating(methodName: 'widget'): JQuery;
    puirating(methodName: string): JQuery;
    puirating(options: PrimeUI.RatingOptions): JQuery;
    puirating(optionLiteral: string, optionName: string): any;
    puirating(optionLiteral: string, options: PrimeUI.RatingOptions): any;
    puirating(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puipassword(): JQuery;
    puipassword(methodName: 'destroy'): void;
    puipassword(methodName: 'disable'): void;
    puipassword(methodName: 'enable'): void;
    puipassword(methodName: 'refresh'): void;
    puipassword(methodName: 'widget'): JQuery;
    puipassword(methodName: string): JQuery;
    puipassword(options: PrimeUI.PasswordOptions): JQuery;
    puipassword(optionLiteral: string, optionName: string): any;
    puipassword(optionLiteral: string, options: PrimeUI.PasswordOptions): any;
    puipassword(optionLiteral: string, optionName: string, optionValue: any): JQuery;
}