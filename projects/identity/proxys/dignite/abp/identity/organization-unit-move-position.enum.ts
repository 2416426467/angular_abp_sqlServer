import { mapEnumToOptions } from '@abp/ng.core';

export enum OrganizationUnitMovePosition {
  Inside = 0,
  Bottom = 1,
}

export const organizationUnitMovePositionOptions = mapEnumToOptions(OrganizationUnitMovePosition);
