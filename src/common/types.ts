interface WizardBooleans {
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
}

interface WizardStepsBase {
  currentStep: number;
  steps: string[];
}

export declare interface WizardSteps extends WizardStepsBase {
  totalSteps: number;
}

interface WizardStateWithoutHelpers extends WizardBooleans, WizardSteps {}

export declare interface WizardProps {
  children: JSX.Element[] | JSX.Element;
  onStepChange?: (currentStep: number) => void;
}

export declare interface WizardHandlers {
  firstStep(): void;
  goToStep(number: number): void;
  lastStep(): void;
  nextStep(): void;
  prevStep(): void;
}

export declare interface WizardPropGetters {
  getFirstStepProps(
    props?: unknown
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  getLastStepProps(
    props?: unknown
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  getNextStepProps(
    props?: unknown
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  getPrevStepProps(
    props?: unknown
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

export declare interface WizardState
  extends WizardStateWithoutHelpers,
    WizardHandlers,
    WizardPropGetters {}

// Navigator

export declare interface NavigatorProps
  extends WizardBooleans,
    WizardHandlers,
    WizardPropGetters {}

export declare interface CompoundNavigatorProps {
  children?: (props: NavigatorProps) => JSX.Element;
}

export declare interface CustomNavigatorProps {
  children: (props: NavigatorProps) => JSX.Element;
}

// StepTracker

export declare interface StepTrackerProps extends WizardStepsBase {}

export declare interface CompoundStepTrackerProps {
  children?: (props: StepTrackerProps) => JSX.Element;
}

export declare interface CustomStepTrackerProps {
  children: (props: StepTrackerProps) => JSX.Element;
}

// Steps

export declare interface StepsProps {
  children: JSX.Element[] | JSX.Element;
}

// Context

export declare interface WizardConsumerProps {
  children(props: WizardState): JSX.Element;
}

export declare interface InjectedWizardProps {
  wizard: WizardState;
}
