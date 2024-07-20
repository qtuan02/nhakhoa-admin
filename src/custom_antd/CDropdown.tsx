import { Dropdown, DropDownProps, MenuProps } from "antd";
import React, { ReactNode } from "react";

interface CDropDownProps extends DropDownProps {
    children?: ReactNode;
}

const CDropDown: React.FC<CDropDownProps> = (props) => {
    const { children, ...rest } = props;
    return <Dropdown {...rest}>{children}</Dropdown>;
};

export default CDropDown;