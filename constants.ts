
import { AgeGroup, ApplicationStatus, Application } from './types';

export const SCHOOL_NAME = "Mầm Non Tân Lập B";
export const MANAGING_BODY = "XÃ Ô DIÊN";
export const COPYRIGHT_INFO = "Bản quyền ứng dụng: Cô Lê Thanh Vân - Đơn vị công tác: Mầm non Tân Lập B";

export const COLORS = {
  primary: "#2563eb", // Blue
  secondary: "#fbbf24", // Yellow
  accent: "#10b981", // Green
  background: "#f8fafc"
};

export const ENROLLMENT_TIMELINE = {
  start: "2025-06-15",
  end: "2025-07-15",
  resultDate: "2025-07-25"
};

export const AGE_GROUPS: AgeGroup[] = [
  { id: '12-24', name: 'Nhà trẻ 12-24 tháng', ageRange: 'Sinh năm 2024 - 2025', quota: 30, enrolled: 0 },
  { id: '24-36', name: 'Nhà trẻ 24-36 tháng', ageRange: 'Sinh năm 2023', quota: 40, enrolled: 0 },
  { id: '3-4', name: 'Mẫu giáo Bé (3-4 tuổi)', ageRange: 'Sinh năm 2022', quota: 45, enrolled: 0 },
  { id: '4-5', name: 'Mẫu giáo Nhỡ (4-5 tuổi)', ageRange: 'Sinh năm 2021', quota: 50, enrolled: 0 },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'APP25-001',
    childName: 'Nguyễn Minh Anh',
    birthDate: '2022-03-15',
    gender: 'FEMALE',
    ethnicity: 'Kinh',
    address: 'Xã Ô Diên, Huyện Đan Phượng, Hà Nội',
    ageGroupId: '3-4',
    parentName: 'Nguyễn Văn Hùng',
    phoneNumber: '0912345678',
    email: 'hung.nv@gmail.com',
    docBirthCert: null,
    docResidence: null,
    status: ApplicationStatus.PENDING,
    createdAt: '2025-06-16T08:00:00Z'
  }
];

export const ENROLLMENT_ANNOUNCEMENT = `
# THÔNG BÁO TUYỂN SINH NĂM HỌC 2025 - 2026

Trường Mầm Non Tân Lập B trân trọng thông báo kế hoạch tuyển sinh học sinh mầm non cho năm học 2025-2026:

## 1. Đối tượng tuyển sinh
- Trẻ em sinh năm từ **2021 đến 2025** đang cư trú trên địa bàn xã Ô Diên.

## 2. Chỉ tiêu tuyển sinh
- Tổng số 165 chỉ tiêu chia cho các khối lớp từ Nhà trẻ đến Mẫu giáo Nhỡ.

## 3. Thời gian đăng ký
- Trực tuyến: Từ ngày 15/06/2025 đến hết ngày 15/07/2025.
- Trực tiếp: Tại văn phòng nhà trường trong giờ hành chính.

## 4. Hồ sơ bao gồm
- Đơn xin nhập học (Theo mẫu trực tuyến).
- Bản sao Giấy khai sinh.
- Bản sao Giấy xác nhận thông tin về cư trú (Mẫu CT07) hoặc thông báo số định danh cá nhân.
- Sổ tiêm chủng của trẻ.
`;
