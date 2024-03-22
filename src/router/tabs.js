import Trainings from "../components/Trainings/Trainings";
import Discover from "../components/Discover/Discover";
import Exercises from "../components/Exercises/Exercises";
import Settings from "../components/Settings/Settings";
import History from "../components/History/History";

const tabs = [
    {
        key: 'trainings',
        icon: 'dumbbell',
        label: 'Trainings',
        barColor: 'white',
        pressColor: 'rgba(255, 255, 255, 0.16)',
        component: <Trainings />
      },
      {
        key: 'history',
        icon: 'clock',
        label: 'History',
        barColor: 'white',
        pressColor: 'rgba(255, 255, 255, 0.16)',
        component: <History />
      },
      {
        key: 'discover',
        icon: 'map',
        label: 'Discover',
        barColor: 'white',
        pressColor: 'rgba(255, 255, 255, 0.16)',
        component: <Discover />
      },
      {
        key: 'exercises',
        icon: 'list',
        label: 'Exercises',
        barColor: 'white',
        pressColor: 'rgba(255, 255, 255, 0.16)',
        component: <Exercises />
      },
      {
        key: 'settings',
        icon: 'gear',
        label: 'Settings',
        barColor: 'white',
        pressColor: 'rgba(255, 255, 255, 0.16)',
        component: <Settings />
      }
]

export default tabs