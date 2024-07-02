import { Popconfirm, PopconfirmProps } from 'antd';
import React, { MouseEventHandler, ReactNode } from 'react';


interface CPopConfirmProps extends PopconfirmProps {
	onClick?: MouseEventHandler<HTMLElement>;
    children?: ReactNode;
	loading?: boolean;
}

const CPopConfirm: React.FC<CPopConfirmProps> = (props) => {
	const { onConfirm, children, loading, ...rest } = props;
	return (
		<Popconfirm
			onConfirm={onConfirm}
			okText='Yes'
			cancelText='No'
			placement='top'
			{...rest}
		>
            {children}
		</Popconfirm>
	);
};

export default CPopConfirm;