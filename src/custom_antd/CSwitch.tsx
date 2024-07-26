import React, { ReactNode } from "react";
import { Switch, SwitchProps } from "antd";

interface CSwitchProps extends SwitchProps {
	children?: ReactNode;
}

const CSwitch: React.FC<CSwitchProps> = (props) => {
	const { children, ...rest } = props;
	return <Switch {...rest}>{children}</Switch >;
};

export default CSwitch;