import {
  DashboardOutlined,
  SettingOutlined,
  ApartmentOutlined,
  DeploymentUnitOutlined,
  RocketOutlined,
  TeamOutlined,
} from "@ant-design/icons";
//{ APP_PREFIX_PATH, AUTH_PREFIX_PATH }
import { APP_PREFIX_PATH } from "@/configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "Bảng tin",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "Mặc định",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
  {
    key: "category",
    path: `${APP_PREFIX_PATH}/category`,
    title: "Danh mục",
    icon: "",
    breadcrumb: false,
    submenu: [
      {
        key: "category-system",
        path: `${APP_PREFIX_PATH}/category/system`,
        title: "Hệ thống",
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
