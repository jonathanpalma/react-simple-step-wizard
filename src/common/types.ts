export interface WizardProps {
  children: JSX.Element[] | JSX.Element;
  onStepChange?: (currentStep: number) => void;
}

export interface WizardState {
  steps: string[];
  currentStep: number;
  totalSteps: number;
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
  prevStep(): void;
  nextStep(): void;
}

export interface WizardHandlers {
  prevStep(): void;
  nextStep(): void;
}

export interface NavigatorProps {
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
  prevStep(): void;
  nextStep(): void;
}

export interface CustomNavigatorProps {
  children?: (props: NavigatorProps) => JSX.Element;
}

export interface StepTrackerProps {
  currentStep: number;
  steps: string[];
}

export interface CustomStepTrackerProps {
  children?: (props: StepTrackerProps) => JSX.Element;
}

export interface StepsProps {
  children: JSX.Element[] | JSX.Element;
}

export interface WizardConsumerProps {
  children(props: WizardState): JSX.Element;
}
