import type { GetIdentityUsersInput, IdentityClaimTypeDto, IdentityRoleDto, IdentityUserClaimDto, IdentityUserCreateDto, IdentityUserDto, IdentityUserUpdateDto, IdentityUserUpdatePasswordInput, IdentityUserUpdateRolesDto, IdentityUserWithDetailsDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityUserService {
  apiName = 'AbpIdentity';

  create = (input: IdentityUserCreateDto) =>
    this.restService.request<any, IdentityUserWithDetailsDto>({
      method: 'POST',
      url: '/api/identity/users',
      body: input,
    },
      { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/users/${id}`,
    },
      { apiName: this.apiName });

  findByEmail = (email: string) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'GET',
      url: `/api/identity/users/by-email/${email}`,
    },
      { apiName: this.apiName });

  findByUsername = (userName: string) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'GET',
      url: `/api/identity/users/by-username/${userName}`,
    },
      { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, IdentityUserWithDetailsDto>({
      method: 'GET',
      url: `/api/identity/users/${id}`,
    },
      { apiName: this.apiName });

  getAllClaimTypes = () =>
    this.restService.request<any, ListResultDto<IdentityClaimTypeDto>>({
      method: 'GET',
      url: '/api/identity/users/all-claim-types',
    },
      { apiName: this.apiName });

  getAssignableRoles = () =>
    this.restService.request<any, ListResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: '/api/identity/users/assignable-roles',
    },
      { apiName: this.apiName });

  getList = (input: GetIdentityUsersInput) =>
    this.restService.request<any, PagedResultDto<IdentityUserDto>>({
      method: 'GET',
      url: '/api/identity/users',
      params: { filter: input.filter, roleId: input.roleId, organizationUnitId: input.organizationUnitId, userName: input.userName, email: input.email, phoneNumber: input.phoneNumber, isLockedOut: input.isLockedOut, notActive: input.notActive, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
      { apiName: this.apiName });

  getRoles = (id: string) =>
    this.restService.request<any, ListResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: `/api/identity/users/${id}/roles`,
    },
      { apiName: this.apiName });

  lock = (id: string, lockoutDuration: number) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/lock`,
      params: { lockoutDuration },
    },
      { apiName: this.apiName });

  setTwoFactorEnabled = (id: string, enabled: boolean) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/two-factor`,
      params: { enabled },
    },
      { apiName: this.apiName });

  unlock = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/unlock`,
    },
      { apiName: this.apiName });

  update = (id: string, input: IdentityUserUpdateDto) =>
    this.restService.request<any, IdentityUserWithDetailsDto>({
      method: 'PUT',
      url: `/api/identity/users/${id}`,
      body: input,
    },
      { apiName: this.apiName });

  updateClaims = (id: string, input: IdentityUserClaimDto[]) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/claims`,
      body: input,
    },
      { apiName: this.apiName });

  updatePassword = (id: string, input: IdentityUserUpdatePasswordInput) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/password`,
      body: input,
    },
      { apiName: this.apiName });

  updateRoles = (id: string, input: IdentityUserUpdateRolesDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/roles`,
      body: input,
    },
      { apiName: this.apiName });
  getApplication = () =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/abp/application-configuration',
    },
      { apiName: this.apiName });

  constructor(private restService: RestService) { }
}
