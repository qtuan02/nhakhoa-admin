"use client";
import { useEffect, useState } from "react";
import { Image, Upload, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { appConfig } from "@/commons/AppConfig";
import { toast } from "react-toastify";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

interface CUploadImageProps extends UploadProps {
    setImageUrl: (image: string) => void;
    initialImageUrl?: string;
}

const CUploadImage: React.FC<CUploadImageProps> = (props) => {
    const { setImageUrl, initialImageUrl } = props;
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string>('');

    const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
        setImage('');
        if(info.file.status === 'uploading') {
            setLoading(true);
        }else if(info.file.status === 'done') {
            setLoading(false);
            setImage(info.file.response.data.url);
            setImageUrl(info.file.response.data.url);
        }else {
            setLoading(false);
            toast.error('Tải ảnh thất bại!');
        }
    };

    useEffect(() => {
        if (initialImageUrl) {
            setImage(initialImageUrl);
        }
    }, [initialImageUrl]);

    return (
        <>
            <Upload
                listType="picture-card"
                className="avatar-uploader"
                maxCount={1}
                onChange={handleChange}
                showUploadList={false}
                name="image"
                action={appConfig.API_UPLOAD}
            >
                {image ? <Image src={image} alt="avatar" style={{ width: '100%' }} preview={false} /> : (
                    <button
                        style={{ border: 0, background: 'none' }}
                        type='button'
                    >
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Tải ảnh</div>
                    </button>
                )}
            </Upload>
        </>
    );
}

export default CUploadImage;
