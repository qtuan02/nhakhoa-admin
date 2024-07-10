import { customItemMenu } from "@/utils/FunctionUiHelpers";
import { faCalendar, faCalendarAlt, faCalendarCheck, faGaugeHigh, faHandHoldingDollar, faLayerGroup, faTooth, faUserDoctor, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SIDER_MENU: any = [
    customItemMenu("Chung", "grp1", null, [
        customItemMenu(<Link href="/">Tổng quan</Link>, "/", <FontAwesomeIcon icon={faGaugeHigh} />),
    ], "group"),
    customItemMenu("Quản lí dịch vụ", "grp2", null, [
        customItemMenu(<Link href="/danh-muc">Danh mục</Link>, "/danh-muc", <FontAwesomeIcon icon={faLayerGroup} />),
        customItemMenu(<Link href="/dich-vu">Dịch vụ</Link>, "/dich-vu", <FontAwesomeIcon icon={faTooth} />),
    ], "group"),
    customItemMenu("Quản lí thông tin", "grp3", null, [
        customItemMenu(<Link href="/khach-hang">Khách hàng</Link>, "/khach-hang", <FontAwesomeIcon icon={faUsers} />),
        customItemMenu(<Link href="/nguoi-dung">Người dùng</Link>, "/nguoi-dung", <FontAwesomeIcon icon={faUserDoctor} />)
    ], "group"),
    customItemMenu("Quản lí lịch", "grp4", null, [
        customItemMenu(<Link href="/lich-hen">Lịch hẹn</Link>, "/lich-hen", <FontAwesomeIcon icon={faCalendar} />),
        customItemMenu(<Link href="/lich-kham">Lịch khám</Link>, "/lich-kham", <FontAwesomeIcon icon={faCalendarCheck} />),
        customItemMenu(<Link href="/lich-lam-viec">Lịch làm việc</Link>, "/lich-lam-viec", <FontAwesomeIcon icon={faCalendarAlt} />),
    ], "group"),
    customItemMenu("Quản lí giao dịch", "grp5", null, [
        customItemMenu(<Link href="/hoa-don">Hóa đơn</Link>, "/hoa-don", <FontAwesomeIcon icon={faHandHoldingDollar} />),
    ], "group"),
];

const STATUS: any = [
    {
        label: "Hoạt động",
        value: 1,
    },
    {
        label: "Vô hiệu hóa",
        value: 0,
    }
];

const GENDER: any = [
    {
        label: "Nữ",
        value: 0,
    },
    {
        label: "Nam",
        value: 1,
    },
];

const ROLE: any = [
    {
        label: "Nha sĩ",
        value: 1,
    },
    {
        label: "Nhân viên y tế",
        value: 2,
    },
    {
        label: "Quản trị viên",
        value: 3,
    }
];

const STATUS_APPOINTMENT: any = [
    {
        label: "Đang chờ",
        value: 0,
    },
    {
        label: "Xác nhận",
        value: 1,
    },
    {
        label: "Hủy",
        value: 2,
    },
];

const STATUS_HISTORY: any = [
    {
        label: "Đang chờ",
        value: 0,
    },
    {
        label: "Hoàn thành",
        value: 1,
    },
    {
        label: "Xác nhận",
        value: 2,
    },
    {
        label: "Hủy",
        value: 3,
    }
];

const COLUMN_CUSTOMER: any = [
    { title: 'Mã khách hàng', dataIndex: 'address', key: 'id' },
    { title: 'Tên khách hàng', dataIndex: 'address', key: 'name' },
    { title: 'Số điện thoại', dataIndex: 'address', key: 'phone_number' },
    { title: 'Ngày sinh', dataIndex: 'address', key: 'birthday' },
    { title: 'Email', dataIndex: 'address', key: 'email' },
    { title: 'Giới tính', dataIndex: 'address', key: 'gender' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
];

export { SIDER_MENU, STATUS, GENDER, ROLE, COLUMN_CUSTOMER, STATUS_APPOINTMENT, STATUS_HISTORY };