import * as React from 'react';

export interface WizardProps extends React.Props<Wizard> {}

declare class Wizard extends React.Component<WizardProps, any> {}

declare module 'wizard' {}
