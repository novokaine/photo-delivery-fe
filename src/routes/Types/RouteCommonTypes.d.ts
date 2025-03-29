import React, { LazyExoticComponent } from "react";

export interface RoutesTypes {
  path: string;
  Component:
    | LazyExoticComponent<() => React.ReactElement>
    | React.ComponentType;
  isPrivate: boolean;
  requiresAdmin?: boolean;
  name?: string;
}
