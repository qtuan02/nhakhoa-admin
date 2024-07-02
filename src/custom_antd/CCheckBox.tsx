import {  Checkbox, CheckboxProps } from "antd";
import React, { ReactNode } from "react";

interface CCheckBoxProps extends CheckboxProps {
    children?: ReactNode;
}

const CCheckBox: React.FC<CCheckBoxProps> = (props) => {
    const { children, ...rest } = props;
    return <Checkbox {...rest}>{children}</Checkbox>;
};

export default CCheckBox;