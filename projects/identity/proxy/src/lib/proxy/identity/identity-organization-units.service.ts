import type {
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityOrganizationUnitsDto,
  IdentityUserCreateDto,
  IdentityUserDto,
  IdentityUserUpdateDto,
  IdentityUserUpdateRolesDto,
} from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityOrganizationUnitsService {
  apiName = 'AbpIdentity';
  constructor(private restService: RestService) {}

  /* 获取组织机构列表 */
  getList = (ParentId: string, Recursive: boolean) =>
    this.restService.request<any, IdentityOrganizationUnitsDto>(
      {
        method: 'GET',
        url: '/api/identity/organization-units',
        params: { Recursive: true, ParentId: ParentId },
      },
      { apiName: this.apiName }
    );
  get = (id: string) =>
    this.restService.request<any, IdentityOrganizationUnitsDto>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}`,
      },
      { apiName: this.apiName }
    );
  create = (displayName: string, roleIds?: any[], parentId?: string) =>
    this.restService.request<any, IdentityOrganizationUnitsDto>(
      {
        method: 'POST',
        url: '/api/identity/organization-units',
        body: { displayName: displayName, roleIds: roleIds, parentId: parentId },
      },
      { apiName: this.apiName }
    );
  update = (id: string, displayName: string, roleIds: any[], concurrencyStamp: string) =>
    this.restService.request<any, IdentityOrganizationUnitsDto>(
      {
        method: 'PUT',
        url: `/api/identity/organization-units?id=${id}`,
        body: { displayName: displayName, roleIds: roleIds, concurrencyStamp: concurrencyStamp },
      },
      { apiName: this.apiName }
    );

  delete = (id: string) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/identity/organization-units?id=${id}`,
      },
      { apiName: this.apiName }
    );

  move = (id: string,targetParentId:string,order:any) =>
    this.restService.request<any, IdentityOrganizationUnitsDto>(
      {
        method: 'PUT',
        url: `/api/identity/organization-units/${id}/move`,
        body: {targetParentId: targetParentId, order: order,
        },
      },
      { apiName: this.apiName }
    );
}
