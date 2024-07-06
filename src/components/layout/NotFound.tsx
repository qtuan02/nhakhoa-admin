"use client";
import React from 'react';
import { Button, Result } from 'antd';
import CButton from '@/custom_antd/CButton';

export default function NotFoundComponent() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Không tìm thấy trang!"
            extra={<CButton type="primary" back={true}>Trở về</CButton>}
        />
    );
}
