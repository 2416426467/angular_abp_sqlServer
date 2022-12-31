import type { GetIdentityRolesInput, IdentityClaimTypeDto, IdentityRoleClaimDto, IdentityRoleCreateDto, IdentityRoleDto, IdentityRoleUpdateDto, IdentityRoleWithDetailsDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityRoleService {
  apiName = 'AbpIdentity';

  create = (input: IdentityRoleCreateDto) =>
    this.restService.request<any, IdentityRoleWithDetailsDto>({
      method: 'POST',
      url: '/api/identity/roles',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/roles/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, IdentityRoleWithDetailsDto>({
      method: 'GET',
      url: `/api/identity/roles/${id}`,
    },
    { apiName: this.apiName });

  getAllClaimTypes = () =>
    this.restService.request<any, ListResultDto<IdentityClaimTypeDto>>({
      method: 'GET',
      url: '/api/identity/roles/all-claim-types',
    },
    { apiName: this.apiName });

  getAllList = () =>
    this.restService.request<any, ListResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: '/api/identity/roles/all',
    },
    { apiName: this.apiName });

  getList = (input: GetIdentityRolesInput) =>
    this.restService.request<any, PagedResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: '/api/identity/roles',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: IdentityRoleUpdateDto) =>
    this.restService.request<any, IdentityRoleWithDetailsDto>({
      method: 'PUT',
      url: `/api/identity/roles/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  updateClaims = (id: string, input: IdentityRoleClaimDto[]) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/roles/${id}/claims`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
