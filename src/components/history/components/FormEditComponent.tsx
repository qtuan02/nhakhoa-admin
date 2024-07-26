import { STATUS_HISTORY } from "@/utils/Option";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { IHistory } from "@/interfaces/IHistory";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editService, getHistoryState, removeService, toggleModal } from "@/redux/reducers/historyReducer";
import { Form, Image, Input, TableProps } from "antd";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import CTable from "@/custom_antd/CTable";
import { IService } from "@/interfaces/IService";
import CSpace from "@/custom_antd/CSpace";
import CInput from "@/custom_antd/CInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CTitle from "@/custom_antd/CTitle";
import CInputNumber from "@/custom_antd/CInputNumber";
import { customNumberPrice } from "@/utils/FunctionHelpers";

interface FormComponentProps {
    onSubmit: (values: IHistory) => void;
    data?: IHistory;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: IService;
    index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <CInputNumber /> : <CInput />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Hãy hập "${title}"!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const initialHistory: IHistory = {
    note: "",
    services: [],
    status: 0,
}

export default function FormEditComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();
    const [formService] = Form.useForm();

    const dispatch = useAppDispatch();
    const history = useAppSelector(getHistoryState);

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);

    const [editing, setEditing] = useState<number>(-1);

    const isEditing = (record: IService) => record.id === editing;

    const edit = (service: IService) => {
        formService.setFieldsValue({ ...service });
        setEditing(service?.id || -1);
    };

    const save = (id: number) => {
        dispatch(editService({ ...formService.getFieldsValue(), id: id }));
        setEditing(-1);
    };

    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <Image width={40} height={40} src={image} alt="img..." />
            )
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            editable: true,
            width: 200,
            render: (price: number) =>(customNumberPrice(price))
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            editable: true,
            width: 150,
        },
        {
            title: "Đơn vị",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Thao tác",
            key: "item",
            width: 100,
            render: (item: IService) => {
                const editable = isEditing(item);
                const disable = editing !== -1 ? true : false;
                return editable ?
                    <CSpace>
                        <CButton type="default" size="small" onClick={() => save(Number(item.id))}>Lưu</CButton>
                    </CSpace> :
                    <CSpace>
                        <CButton tooltip="Chỉnh sửa" disabled={disable} type="primary" size="small" onClick={() => edit(item)} icon={<FontAwesomeIcon icon={faPenToSquare} />}></CButton>
                        <CButton tooltip="Xóa" disabled={disable} type="primary" danger size="small" onClick={() => dispatch(removeService(item?.id || -1))} icon={<FontAwesomeIcon icon={faTrashCan} />}></CButton>
                    </CSpace>
            }
        }
    ];

    const editColumns: TableProps["columns"] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: IService) => ({
                record,
                inputType: col.dataIndex === "price" || "quantity" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        data && data.status === 0 ?
            <Form layout="vertical" onFinish={onSubmit} initialValues={initialHistory} form={form}>
                <Form.Item label="Trạng thái:" name="status" rules={[{ required: true, message: "Hãy chọn trạng thái..." }]}>
                    <CSelect className="!h-[40px]" options={STATUS_HISTORY} />
                </Form.Item>
                <Form.Item label="Dịch vụ:" name="services">
                    <div>
                        <CButton type="primary" className="rounded-lg" onClick={() => dispatch(toggleModal())}>Chọn dịch vụ</CButton>
                        {history && history.services?.length === 0 ?
                            <p className="mt-2 ml-1 text-[14px] text-red-500">Chưa chọn dịch vụ nào...</p>
                            :
                            <Form form={formService} component={false}>
                                <CTable
                                    components={{
                                        body: {
                                            cell: EditableCell,
                                        },
                                    }}
                                    className="table-modal !mt-2"
                                    rowClassName="editable-row"
                                    columns={editColumns}
                                    dataSource={history?.services?.map((item, index) => ({ ...item, index: index + 1, key: item.id, quantity: item.quantity ? item.quantity : 1, price: item.price ? item.price : item.min_price })) || []}
                                    pagination={false}
                                />
                            </Form>
                        }
                        <ModalComponent />
                    </div>
                </Form.Item>
                <Form.Item label="Ghi chú:" name="note">
                    <Input.TextArea
                        showCount
                        maxLength={1000}
                        placeholder="Nhập nội dung..."
                        className="ts-16"
                        style={{ height: 200, resize: "none" }}
                    />
                </Form.Item>
                <br />
                <CRow className="gap-4 justify-end">
                    <CButton type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} htmlType="submit">Hoàn thành</CButton>
                </CRow>
            </Form> :
            <CTitle level={3} className="!text-green-400">Cuộc hẹn đã hoàn thành!</CTitle>
    );
}