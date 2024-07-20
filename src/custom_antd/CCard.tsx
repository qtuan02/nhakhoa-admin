import { Card, CardProps } from "antd";
import React, { CSSProperties, ReactNode } from "react";

interface CCardProps extends CardProps {
    children?: ReactNode;
    styleCard?: CSSProperties;
}

const CCard: React.FC<CCardProps> = (props) => {
    const { children, styleCard, ...rest } = props;
    return <Card style={styleCard} {...rest}>{children}</Card>;
};

export default CCard;