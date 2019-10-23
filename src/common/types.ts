interface WizardBooleans {
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
}

interface WizardSteps {
  currentStep: number;
  steps: string[];
}

interface WizardStateWithoutHelpers extends WizardBooleans, WizardSteps {
  totalSteps: number;
}

export declare interface WizardProps {
  children: JSX.Element[] | JSX.Element;
  onStepChange?: (currentStep: number) => void;
}

export declare interface WizardHandlers {
  prevStep(): void;
  nextStep(): void;
}

export declare interface WizardPropGetters {
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

export declare interface StepTrackerProps extends WizardSteps {}

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
