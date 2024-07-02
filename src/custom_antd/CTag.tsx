import { Tag, TagProps } from "antd";
import React, { ReactNode } from "react";


interface CTagProps extends TagProps {
    children?: ReactNode;
}

const CTag: React.FC<CTagProps> = (props) => {
    const { children, ...rest } = props;
    return <Tag {...rest}>{children}</Tag>;
};

export default CTag;