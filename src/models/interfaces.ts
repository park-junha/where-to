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
