import type {
  EntityDto,
  ExtensibleEntityDto,
  ExtensibleFullAuditedEntityDto,
  ExtensibleObject,
  PagedAndSortedResultRequestDto,
} from '@abp/ng.core';
import type { IdentityClaimValueType } from '../../../volo/abp/identity/identity-claim-value-type.enum';
import type { OrganizationUnitMovePosition } from './organization-unit-move-position.enum';
import { Observable } from 'rxjs';

export interface GetIdentityClaimTypesInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetIdentityRolesInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetIdentitySecurityLogsInput extends PagedAndSortedResultRequestDto {
  startTime?: string;
  endTime?: string;
  applicationName?: string;
  identity?: string;
  userName?: string;
  action?: string;
  clientId?: string;
  correlationId?: string;
}

export interface GetIdentityUsersInput extends PagedAndSortedResultRequestDto {
  filter?: string;
  roleId?: string;
  organizationUnitId?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  isLockedOut?: boolean;
  notActive?: boolean;
}

export interface GetOrganizationUnitMembersInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetOrganizationUnitsInput {
  parentId?: string;
  recursive: boolean;
}

export interface IdentityClaimTypeCreateDto extends IdentityClaimTypeCreateOrUpdateDtoBase {}

export interface IdentityClaimTypeCreateOrUpdateDtoBase extends ExtensibleObject {
  name: string;
  required: boolean;
  regex?: string;
  regexDescription?: string;
  description?: string;
  valueType: IdentityClaimValueType;
}

export interface IdentityClaimTypeDto extends ExtensibleEntityDto<string> {
  name?: string;
  required: boolean;
  isStatic: boolean;
  regex?: string;
  regexDescription?: string;
  description?: string;
  valueType: IdentityClaimValueType;
  concurrencyStamp?: string;
}

export interface IdentityClaimTypeUpdateDto extends IdentityClaimTypeCreateOrUpdateDtoBase {
  concurrencyStamp?: string;
}

export interface IdentityRoleClaimDto {
  claimType?: string;
  claimValue?: string;
}

export interface IdentityRoleCreateDto extends IdentityRoleCreateOrUpdateDtoBase {}

export interface IdentityRoleCreateOrUpdateDtoBase extends ExtensibleObject {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}

export interface IdentityRoleDto extends ExtensibleEntityDto<string> {
  name?: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp?: string;
}

export interface IdentityRoleUpdateDto extends IdentityRoleCreateOrUpdateDtoBase {
  concurrencyStamp?: string;
}

export interface IdentityRoleWithDetailsDto extends IdentityRoleDto {
  claims: IdentityRoleClaimDto[];
}

export interface IdentitySecurityLogDto extends EntityDto<string> {
  tenantId?: string;
  applicationName?: string;
  identity?: string;
  action?: string;
  userId?: string;
  userName?: string;
  tenantName?: string;
  clientId?: string;
  correlationId?: string;
  clientIpAddress?: string;
  browserInfo?: string;
  creationTime?: string;
  extraProperties: Record<string, object>;
}

export interface IdentityUserClaimDto {
  claimType?: string;
  claimValue?: string;
}

export interface IdentityUserCreateDto extends IdentityUserCreateOrUpdateDtoBase {
  password: string;
}

export interface IdentityUserCreateOrUpdateDtoBase extends ExtensibleObject {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  lockoutEnabled: boolean;
  roleNames: string[];
}

export interface IdentityUserDto extends ExtensibleFullAuditedEntityDto<string> {
  tenantId?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
  emailConfirmed: boolean;
  isExternal: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isActive: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  concurrencyStamp?: string;
  roleNames: string[];
}

export interface IdentityUserLoginDto {
  loginProvider?: string;
  providerKey?: string;
  providerDisplayName?: string;
}

export interface IdentityUserOrganizationUnitDto {
  organizationUnitId?: string;
}

export interface IdentityUserRoleDto {
  roleId?: string;
}

export interface IdentityUserTokenDto {
  loginProvider?: string;
  name?: string;
  value?: string;
}

export interface IdentityUserUpdateDto extends IdentityUserCreateOrUpdateDtoBase {
  concurrencyStamp?: string;
}

export interface IdentityUserUpdatePasswordInput {
  newPassword: string;
}

export interface IdentityUserUpdateRolesDto {
  roleNames: string[];
}

export interface IdentityUserWithDetailsDto extends ExtensibleFullAuditedEntityDto<string> {
  tenantId?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
  emailConfirmed: boolean;
  isExternal: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isActive: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  concurrencyStamp?: string;
  roles: IdentityUserRoleDto[];
  claims: IdentityUserClaimDto[];
  logins: IdentityUserLoginDto[];
  tokens: IdentityUserTokenDto[];
  organizationUnits: IdentityUserOrganizationUnitDto[];
}

export interface OrganizationUnitCreateDto extends OrganizationUnitCreateOrUpdateDtoBase {
  parentId?: string;
}

export interface OrganizationUnitCreateOrUpdateDtoBase {
  displayName: string;
  roleIds: string[];
}

export interface OrganizationUnitDto extends ExtensibleEntityDto<string> {
  parentId?: string;
  code?: string;
  displayName?: string;
  concurrencyStamp?: string;
  children: OrganizationUnitDto[];
  hasChild: boolean;
  order: number;
}

export interface OrganizationUnitMoveInput {
  targetId?: string;
  position: OrganizationUnitMovePosition;
}

export interface OrganizationUnitUpdateDto extends OrganizationUnitCreateOrUpdateDtoBase {
  concurrencyStamp?: string;
}

export interface OrganizationUnitUserInput {
  userIds: string[];
}

export interface OrganizationUnitWithDetailsDto extends ExtensibleFullAuditedEntityDto<string> {
  parentId?: string;
  code?: string;
  displayName?: string;
  concurrencyStamp?: string;
  roles: IdentityRoleDto[];
}

export interface UserLookupCountInputDto {
  filter?: string;
}

export interface UserLookupSearchInputDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface IdentityOrganizationUnitsDto {
  roles: any;
  items: readonly unknown[] | Observable<readonly unknown[]>;
  id?: string;
  name?: string;
  code?: string;
  concurrencyStamp?: string;
  displayName?: string;
  extraProperties?: extraProperties;
  hasChild?: false;
  parentId?: null;
  children?: IdentityOrganizationUnitsDto[];
}
export interface extraProperties {
  Order?: number;
}
