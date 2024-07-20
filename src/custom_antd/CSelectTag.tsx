import { Select, SelectProps } from "antd";
import { ReactNode } from "react";


interface CSelectTagProps extends SelectProps {
    children?: ReactNode;
    data?: SelectProps['options'];
    placeholder?: string;
}

const CSelectTag: React.FC<CSelectTagProps> = (props) => {
    const { children, data, placeholder, ...rest } = props;
    return <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder={placeholder}
        options={data?.map((item) => ({
            value: item.id,
            label: item.time
        }))}
    {...rest}>{children}</Select>;
};

export default CSelectTag;