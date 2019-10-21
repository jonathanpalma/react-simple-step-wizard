export declare interface WizardProps {
  children: JSX.Element[] | JSX.Element;
  onStepChange?: (currentStep: number) => void;
}

export declare interface WizardState {
  steps: string[];
  currentStep: number;
  totalSteps: number;
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
  prevStep(): void;
  nextStep(): void;
}

export declare interface WizardHandlers {
  prevStep(): void;
  nextStep(): void;
}

export declare interface InjectedWizardProps {
  wizard: WizardState;
}

export declare interface NavigatorProps {
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
  prevStep(): void;
  nextStep(): void;
}

export declare interface CompoundNavigatorProps {
  children?: (props: NavigatorProps) => JSX.Element;
}

export declare interface CustomNavigatorProps {
  children: (props: NavigatorProps) => JSX.Element;
}

export declare interface StepTrackerProps {
  currentStep: number;
  steps: string[];
}

export declare interface CustomStepTrackerProps {
  children?: (props: StepTrackerProps) => JSX.Element;
}

export declare interface StepsProps {
  children: JSX.Element[] | JSX.Element;
}

export declare interface WizardConsumerProps {
  children(props: WizardState): JSX.Element;
}
