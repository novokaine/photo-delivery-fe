export interface RouteReducerType {
  path: string;
  name: string;
  isPrivate: boolean;
}

export interface RoutesReducerTypes {
  availableRoutes: RouteReducerType[];
}
