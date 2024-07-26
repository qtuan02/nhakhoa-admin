import React, { ReactNode } from "react";
import { Badge, BadgeProps } from "antd";

interface CBadgeProps extends BadgeProps {
	children?: ReactNode;
}

const CBadge: React.FC<CBadgeProps> = (props) => {
	const { children, ...rest } = props;
	return <Badge {...rest}>{children}</Badge>;
};

export default CBadge;