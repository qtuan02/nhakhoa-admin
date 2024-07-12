import { formatterInputNumber, parserInputNumber } from "@/utils/FunctionHelpers";
import { InputNumber, InputNumberProps } from "antd";
import { ReactNode } from "react";

interface CInputProps extends InputNumberProps {
    children?: ReactNode;
}

const CInputNumber: React.FC<CInputProps> = (props) => {
    const { children, ...rest } = props;
	return (
		<InputNumber
			maxLength={12}
			formatter={(value) => formatterInputNumber(Number(value))}
			parser={(value) => parserInputNumber(String(value))}
			{...rest}
		>
			{children}
		</InputNumber>
	);
};

export default CInputNumber;
