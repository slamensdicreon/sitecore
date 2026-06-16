'use client';

import type React from 'react';
import { DycomNetworkMapView } from './DycomNetworkMapView.dev';
import type { DycomNetworkMapProps } from './dycom-network-map.props';
import { NoDataFallback } from '@/utils/NoDataFallback';

/**
 * Dycom "one connected network" map — an interactive Mapbox map plus a
 * companies / open-roles sidebar, driven entirely by Sitecore datasource items
 * (a Dycom Network Map item with Dycom Company children, each holding Dycom
 * Location children). Built net-new for the Alaris (click-click-launch) site.
 */

// Default display of the component.
export const Default: React.FC<DycomNetworkMapProps> = (props) => {
  const isPageEditing = props.page?.mode?.isEditing ?? false;

  if (!props.fields?.data?.datasource) {
    return <NoDataFallback componentName="DycomNetworkMap" />;
  }

  return <DycomNetworkMapView {...props} isPageEditing={isPageEditing} />;
};
