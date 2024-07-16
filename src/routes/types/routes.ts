export interface RouteItem {
  path: string;
  element: React.ReactNode;
  meta?: MetaProps;
  children?: RouteItem[];
}

export interface MetaProps {
  title?: string;
  requiresAuth?: boolean;
  key?: string;
}
