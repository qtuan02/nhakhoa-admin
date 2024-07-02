import { customItemMenu } from "@/utils/FunctionUiHelpers";
import { faCalendar, faCalendarAlt, faCalendarCheck, faGaugeHigh, faHandHoldingDollar, faLayerGroup, faMoneyBill, faTooth, faUserDoctor, faUserNurse, faUserShield, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { toast } from "react-toastify";

const SIDER_MENU: any = [
    customItemMenu(<Link href="/">Tổng quan</Link>, "/", <FontAwesomeIcon icon={faGaugeHigh} />),
    customItemMenu(<Link href="/lich-kham">Lịch khám</Link>, "/lich-kham", <FontAwesomeIcon icon={faCalendarCheck} />),
    customItemMenu("Quản lí dịch vụ", "grp1", null, [
        customItemMenu(<Link href="/danh-muc">Danh mục</Link>, "/danh-muc", <FontAwesomeIcon icon={faLayerGroup} />),
        customItemMenu(<Link href="/dich-vu">Dịch vụ</Link>, "/dich-vu", <FontAwesomeIcon icon={faTooth} />),
    ], "group"),
    customItemMenu("Quản lí thông tin", "grp2", null, [
        customItemMenu(<Link href="/nha-si">Nha sĩ</Link>, "/nha-si", <FontAwesomeIcon icon={faUserDoctor} />),
        customItemMenu(<Link href="/khach-hang">Khách hàng</Link>, "/khach-hang", <FontAwesomeIcon icon={faUsers} />),
        customItemMenu(<Link href="/nhan-vien-y-te">Nhân viên y tế</Link>, "/nhan-vien-y-te", <FontAwesomeIcon icon={faUserNurse} />)
    ], "group"),
    customItemMenu("Quản lí lịch", "grp3", null, [
        customItemMenu(<Link href="/lich-hen">Lịch hẹn</Link>, "/lich-hen", <FontAwesomeIcon icon={faCalendar} />),
        customItemMenu(<Link href="/lich-lam-viec">Lịch làm việc</Link>, "/lich-lam-vec", <FontAwesomeIcon icon={faCalendarAlt} />),
    ], "group"),
    customItemMenu("Quản lí giao dịch", "grp4", null, [
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

const TOAST_SUCCESS: any = (value: string) => {
    return toast.success(value);
}

const TOAST_ERROR: any = (error: string) => {
    return toast.error(error || "Đã có lỗi xảy ra");
}

export { SIDER_MENU, STATUS, TOAST_ERROR, TOAST_SUCCESS };