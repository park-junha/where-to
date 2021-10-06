import { v4 } from 'uuid';

export const VERSION = '1.5.2';
export const NEED_MIGRATION_IF_BEFORE = '1.5.1';

export const MAX_PORTALS = 100;

export const DEFAULT_PORTAL_SIZE = 60; // 244px x 120px
export const ABSOLUTE_PORTAL_MIN_SIZE = 30; // 184px x 60px
export const ABSOLUTE_PORTAL_MAX_SIZE = 90; // 304px x 180px

export const PORTAL_TYPES = [
  {
    'name': 'shortcut',
    'title': 'Shortcut'
  },
  {
    'name': 'folder',
    'title': 'Folder'
  }
];

export const DEFAULT_PORTALS = [
  {
    id: v4(),
    type: 'shortcut',
    title: 'Facebook',
    url: 'https://www.facebook.com'
  },
  {
    id: v4(),
    type: 'shortcut',
    title: 'Amazon',
    url: 'https://www.amazon.com'
  },
  {
    id: v4(),
    type: 'shortcut',
    title: 'Netflix',
    url: 'https://www.netflix.com'
  },
  {
    id: v4(),
    type: 'shortcut',
    title: 'Google',
    url: 'https://www.google.com'
  }
];

export const DEFAULT_SETTINGS = {
  maxPortals: MAX_PORTALS,
  portalSize: DEFAULT_PORTAL_SIZE
};

export const SETTINGS_TABS = [
  {
    name: 'general',
    title: 'General'
  },
  {
    name: 'transfer',
    title: 'Transfer'
  },
  {
    name: 'load',
    title: 'Load'
  },
  {
    name: 'reset',
    title: 'Reset to Default'
  }
];
