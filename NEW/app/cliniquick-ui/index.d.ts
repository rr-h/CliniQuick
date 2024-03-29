declare module "@reuther-hols/cliniquick-ui" {
	type DefaultColorProps = {
		color?: string;
	};

	export function Button(props: DefaultColorProps): any;
	export function ActualButton(props: DefaultColorProps): any;
	export function Card(props: DefaultColorProps): any;
	export function Pill(props: DefaultColorProps): any;

	export function printMsg(): void;

	type CliniQuickConfiguration = {
		colors: string[];
	};

	export function Config(): CliniQuickConfiguration;
}
