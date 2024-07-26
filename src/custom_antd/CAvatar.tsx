import React, { ReactNode } from "react";
import { Avatar, AvatarProps } from "antd";

interface CAvatarProps extends AvatarProps {
	children?: ReactNode;
}

const CAvatar: React.FC<CAvatarProps> = (props) => {
	const { children, ...rest } = props;
	return <Avatar {...rest}>{children}</Avatar>;
};

export default CAvatar;