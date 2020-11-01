import { v4 } from 'uuid';

export const VERSION = '0.8.6';

export enum PortalFormType {
  add = 0,
  edit
};

export interface AppContents {
  main: LandingPageItems;
  footer: FooterLayout;
};

export interface LandingPageItems extends Array<LandingPageItem>{};

export interface LandingPageItem {
  type: string;
  id: string;
  title: string;
  url?: string;
};

export interface FooterLayout extends Array<FooterItem>{};

export interface FooterItem {
  id: string;
  title: string;
};

export interface NewPortalForm {
  type: string; // 'webportal'
  title: string;
  url?: string;
};

export interface FolderForm {
  type: string; // 'folder'
  title: string;
};

export const MAX_PORTALS = 30;

export const PORTALS = [
  {
    'name': 'webportal',
    'title': 'Web Portal'
  },
  {
    'name': 'folder',
    'title': 'Folder'
  }
];

export const DEFAULT_PORTALS = [
  {
    id: v4(),
    type: 'webportal',
    title: 'Facebook',
    url: 'https://www.facebook.com'
  },
  {
    id: v4(),
    type: 'webportal',
    title: 'Amazon',
    url: 'https://www.amazon.com'
  },
  {
    id: v4(),
    type: 'webportal',
    title: 'Netflix',
    url: 'https://www.netflix.com'
  },
  {
    id: v4(),
    type: 'webportal',
    title: 'Google',
    url: 'https://www.google.com'
  }
];
