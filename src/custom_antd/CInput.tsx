import { Input, InputProps } from "antd";
import { ReactNode } from "react";

interface CInputProps extends InputProps {
    children?: ReactNode;
}

const CInput: React.FC<CInputProps> = (props) => {
    const { children, ...rest } = props;
    return <Input {...rest}>{children}</Input>;
};

export default CInput;