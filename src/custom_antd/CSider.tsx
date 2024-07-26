import { SiderProps } from "antd";
import { Layout } from "antd";
const { Sider } = Layout;
import React, { ReactNode } from "react";

interface CSiderProps extends SiderProps {
    children?: ReactNode;
}

const CSider: React.FC<CSiderProps> = (props) => {
    const { children, ...rest } = props;
    return <Sider {...rest}>{children}</Sider>;
};

export default CSider;