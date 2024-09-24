import Person4Icon from '@mui/icons-material/Person4';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';

const admin = [
    {
        content: "Teacher",
        path: "/owner",
        icon: <Person4Icon/>
    },
    {
        content: "Category",
        path: "/owner/student",
        icon: <PersonIcon/>
    }
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