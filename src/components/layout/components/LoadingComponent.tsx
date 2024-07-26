import { Spin } from "antd";

export default function LoadingComponent() {
    return (
        <div className='absolute inset-0 flex items-center justify-center z-10 bg-white'>
			<Spin size='large'></Spin>
		</div>
    );
}