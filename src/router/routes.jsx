import Person4Icon from '@mui/icons-material/Person4';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import {TagsOutlined, AppstoreOutlined, AppstoreAddOutlined, SolutionOutlined} from '@ant-design/icons'

const admin = [
    {
        content: "Teacher",
        path: "/owner",
        icon: <Person4Icon/>
    },
    {
        content: "Category",
        path: "/owner/student",
        icon: <SolutionOutlined />
    },
    {
        content: "Brand",
        path: "/owner/brand",
        icon: <AppstoreAddOutlined />
    },
    {
        content: "BrandCategory",
        path: "/owner/brand-category",
        icon: <AppstoreOutlined />
    },
    {
        content: "Ads",
        path: "/owner/ads",
        icon: <TagsOutlined />
    },
]
const user = [
    {
        content: "Home",
        path: "/user",
        icon: <HomeIcon/>
    },
    {
        content: "Student",
        path: "/user/student",
        icon: <PersonIcon/>
    },
    {
        content: "Groups",
        path: "/user/groups",
        icon: <GroupsIcon/>
    },
    {
        content: "Settings",
        path: "/user/settings",
        icon: <SettingsIcon/>
    },
]

export {admin, user}