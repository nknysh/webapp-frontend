import {
  SettingsCompany,
  SettingsNotifications,
  SettingsPreferences,
  SettingsProfile,
  SettingsTravelAgents,
} from 'pages';

export default [
  {
    name: 'Settings Path',
    from: '/settings',
    to: '/settings/profile',
    exact: true,
  },
  {
    name: 'Settings Company Path',
    path: '/settings/company',
    auth: true,
    component: SettingsCompany,
  },
  {
    name: 'Settings Notifications Path',
    path: '/settings/notifications',
    auth: true,
    component: SettingsNotifications,
  },
  {
    name: 'Settings Preferences Path',
    path: '/settings/preferences',
    auth: true,
    component: SettingsPreferences,
  },
  {
    name: 'Settings Profile Path',
    path: '/settings/profile',
    auth: true,
    component: SettingsProfile,
  },
  {
    name: 'Settings Travel Agents Path',
    path: '/settings/travel-agents',
    auth: true,
    component: SettingsTravelAgents,
  },
];
