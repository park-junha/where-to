// TODO: refactor this file into constants, enums, models (interfaces),
//       and utils

import { v4 } from 'uuid';

export const VERSION = '1.1.0';

export enum PortalFormType {
  add = 0,
  edit
};

export interface AppContents {
  main: LandingPageItems;
  settings: Settings;
  footer: FooterLayout;
};

export interface LandingPageItems extends Array<LandingPageItem>{};

export interface LandingPageItem {
  type: string;
  id: string;
  title: string;
  url: string;
};

export interface Settings {
  maxPortals: number;
  portalSize: number;
};

export interface FooterLayout extends Array<FooterItem>{};

export interface FooterItem {
  id: string;
  title: string;
};

export interface NewPortalForm {
  type: string;
  title: string;
  url: string;
};

export const MAX_PORTALS = 30;

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
    name: 'reset',
    title: 'Reset to Default'
  }
];

export function calculatePortalStyles(size: number): object {
  function validatePortalCalcInput(size: number): void {
    if (size < ABSOLUTE_PORTAL_MIN_SIZE ||
      size > ABSOLUTE_PORTAL_MAX_SIZE) {
      throw new Error('Input size must be from ' +
        `${ABSOLUTE_PORTAL_MIN_SIZE} to ${ABSOLUTE_PORTAL_MAX_SIZE}.`);
    }
  }

  function calculatePortalWidth(size: number): number {
    return 124 + (2 * size);
  };

  function calculatePortalHeight(size: number): number {
    return 2 * size;
  };

  validatePortalCalcInput(size);

  return {
    minWidth: calculatePortalWidth(size),
    maxWidth: calculatePortalWidth(size),
    minHeight: calculatePortalHeight(size),
    maxHeight: calculatePortalHeight(size)
  };
};
