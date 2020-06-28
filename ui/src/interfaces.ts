export interface AppContents {
  main: LandingPageLayout;
  footer: FooterLayout;
}

export interface LandingPageLayout extends Array<LandingPageItems>{};
export interface LandingPageItems extends Array<LandingPageItem>{};

export interface LandingPageItem {
  type: 'webportal';
  id: string;
  title: string;
  url: string;
}

export interface FooterLayout extends Array<FooterItem>{};

export interface FooterItem {
  id: string;
  title: string;
}
