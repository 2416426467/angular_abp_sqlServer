import type { GetOrganizationUnitMembersInput, GetOrganizationUnitsInput, IdentityUserDto, OrganizationUnitCreateDto, OrganizationUnitDto, OrganizationUnitMoveInput, OrganizationUnitUpdateDto, OrganizationUnitUserInput, OrganizationUnitWithDetailsDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class OrganizationUnitService {
  apiName = 'AbpIdentity';

  addMembers = (id: string, input: OrganizationUnitUserInput) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/identity/organization-units/${id}/members`,
      body: input,
    },
    { apiName: this.apiName });

  create = (input: OrganizationUnitCreateDto) =>
    this.restService.request<any, OrganizationUnitWithDetailsDto>({
      method: 'POST',
      url: '/api/identity/organization-units',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/identity/organization-units',
      params: { id },
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, OrganizationUnitWithDetailsDto>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}`,
    },
    { apiName: this.apiName });

  getAuthorized = () =>
    this.restService.request<any, ListResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: '/api/identity/organization-units/authorized',
    },
    { apiName: this.apiName });

  getList = (input: GetOrganizationUnitsInput) =>
    this.restService.request<any, PagedResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: '/api/identity/organization-units',
      params: { parentId: input.parentId, recursive: input.recursive },
    },
    { apiName: this.apiName });

  getMembers = (id: string, input: GetOrganizationUnitMembersInput) =>
    this.restService.request<any, PagedResultDto<IdentityUserDto>>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}/members`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  move = (id: string, input: OrganizationUnitMoveInput) =>
    this.restService.request<any, OrganizationUnitDto>({
      method: 'PUT',
      url: `/api/identity/organization-units/${id}/move`,
      body: input,
    },
    { apiName: this.apiName });

  removeMembers = (id: string, input: OrganizationUnitUserInput) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/organization-units/${id}/members`,
      params: { userIds: input.userIds },
    },
    { apiName: this.apiName });

  update = (id: string, input: OrganizationUnitUpdateDto) =>
    this.restService.request<any, OrganizationUnitWithDetailsDto>({
      method: 'PUT',
      url: '/api/identity/organization-units',
      params: { id },
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
