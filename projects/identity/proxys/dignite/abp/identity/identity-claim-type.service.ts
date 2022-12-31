import type { GetIdentityClaimTypesInput, IdentityClaimTypeCreateDto, IdentityClaimTypeDto, IdentityClaimTypeUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityClaimTypeService {
  apiName = 'AbpIdentity';

  create = (input: IdentityClaimTypeCreateDto) =>
    this.restService.request<any, IdentityClaimTypeDto>({
      method: 'POST',
      url: '/api/identity/claim-types',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/claim-types/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, IdentityClaimTypeDto>({
      method: 'GET',
      url: `/api/identity/claim-types/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetIdentityClaimTypesInput) =>
    this.restService.request<any, PagedResultDto<IdentityClaimTypeDto>>({
      method: 'GET',
      url: '/api/identity/claim-types',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: IdentityClaimTypeUpdateDto) =>
    this.restService.request<any, IdentityClaimTypeDto>({
      method: 'PUT',
      url: `/api/identity/claim-types/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
 