export interface AppContents {
  main: LandingPageItems;
  settings: Settings;
  footer?: FooterLayout; // footer is Deprecated
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

export interface NewPortalForm {
  type: string;
  title: string;
  url: string;
};

export interface PortalFormOptions {
  clone?: boolean;
};

// FooterLayout is deprecated
export interface FooterLayout extends Array<FooterItem>{};

// FooterItem is deprecated
export interface FooterItem {
  id: string;
  title: string;
};
