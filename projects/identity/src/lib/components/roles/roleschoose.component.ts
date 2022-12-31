/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @angular-eslint/component-selector */

import { Component, Injectable, Injector, OnInit, InjectionToken } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { IdentityRoleService, IdentityClaimTypeService } from '../../../../proxys/dignite/abp/identity/index';
import { increaseClaim } from "../../NewDefaults/defaults-roles-form-modal";
/* 挎包引入 */
import { dynamicform } from '../../../../../components/src/public-api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ePermissionManagementComponents } from '@abp/ng.permission-management';

@Injectable({
	providedIn: 'root',
})
@Component({
	selector: 'abp-roleschoose',
	templateUrl: './roleschoose.component.html',
	styleUrls: ['./roleschoose.component.scss'],
})
export class RolesroleschooseComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private FormsModule: FormsModule,
		private roleService: IdentityRoleService,
		private ClaimService: IdentityClaimTypeService,
		private _snackBar: MatSnackBar,
	) { }
	/*  */
	providerKey: string;
	visiblePermissions = false;
	permissionManagementKey = ePermissionManagementComponents.PermissionManagement;
	onVisiblePermissionChange = event => {
		this.visiblePermissions = event;
	};
	/* 打开 Permissions 模态框*/
	openPermissionsModal(providerKey: string) {
		this.providerKey = providerKey;
		setTimeout(() => {
			this.visiblePermissions = true;
		}, 0);
	}

	/*  */
	/* 组织机构成员表格数据 */
	Setrolestable: any = {
		maxResultCount: 10, //每页显示数量
		skipCount: 0, //分页
		tdStyle: 'text-align: left;padding: 0 20px;',
		list: [], //表格列表数据
		totalCount: 0, //表格列表数量
		ischeck: false, //是否显示多择按钮
		isoperate: true,
		// operatepositionhead: true,
		SelectWorkerData: [], //多选时表格选择的数据
		operatepositionhead: true,//操作是否显示在表头
		displayedColumns: [
			//表格表头
			'name',
			'isStatic',
			// 'operate',
		],
		ColumnsReplace:{
			name:'UserName',
			operate:'Actions',
		},
	};
	//搜索表单数据
	formdata: dynamicform[] = [
		{
			type: 'text',
			name: 'filter',
			placeholder: 'Search', //文本提示
			validators: [], //验证
		},
	];
	//搜索表单字段
	formgroup: FormGroup = this.setformdata(this.formdata);
	/* 设置表单字段 */
	setformdata(val: dynamicform[]) {
		let _formgroup: any = {};
		val.forEach((item: dynamicform, index: number) => {
			_formgroup[item.name] = [
				{ value: item.defaultValue || '', disabled: item.disabled },
				Validators.compose(item.validators),
			];
		});
		return this.fb.group(_formgroup);
	}
	/* 弹窗配置 */
	modalconfig: any = {
		ismodalopen: false,//弹窗是否显示
		setwidth: '',//弹窗宽度
		setheight: '',//弹窗高度
		title: '',//弹窗标题
		status: '',//弹窗类型，存有删除弹窗delete，表示操作的某块内容是干什么的
		contype: '',//内容类型 表示操作的那块内容
	};

	/* 弹窗表单数据 */
	modalformdata: dynamicform[] = [];
	//搜索表单字段
	modalformgroup: FormGroup = this.setformdata(this.modalformdata);
	/* 所有claim 数据 */
	ClaimAll: any[] = []
	/* 是否开启控制器 */
	ismodalopen = false;
	/* 开启 modal */
	openmodals(setwidth?: any, setheight?: any) {
		this.setObjectVal('modalconfig', {
			ismodalopen: true,
			setwidth: setwidth ? setwidth : '35vw',
			setheight: setheight ? setheight : '',
		})
	}
	/* 关闭 modal */
	closemodals(dialogRefmodal: any) {
		if (dialogRefmodal) dialogRefmodal.close();
		this.modalconfig = {}
		this.setObjectVal('modalconfig', {
			ismodalopen: false,
		})
		// console.log(this.modalconfig, '关闭 查看配置 关闭 modal')
		this.RecoveryForm()//复位表单
	}
	ngOnInit() {
		this.getallroles();
		this.getClaimAll()
	}

	/* 获取所有角色 */
	getallroles(filter?: any) {
		var _that = this;
		this.roleService
			.getList({
				maxResultCount: this.Setrolestable.maxResultCount,
				skipCount: this.Setrolestable.skipCount * this.Setrolestable.maxResultCount,
				filter: filter,
			})
			.subscribe(res => {
				console.log(res, '获取所有角色');
				res.items.forEach((item: any, index: any) => {
					item.operate = [{
						type: 'menus',
						label: 'Actions',
						menuslist: item.isStatic ? ['Claims', 'Permissions'] : ['Edit', 'Claims', 'Permissions', 'Delete']
					}]
				})
				let Setrolestable = JSON.parse(JSON.stringify(this.Setrolestable));
				Setrolestable.list = res.items;
				Setrolestable.totalCount = res.totalCount;
				this.Setrolestable = Setrolestable;
			});
	}
	/* 获取所有claim */
	getClaimAll() {
		var _that = this
		this.roleService.getAllClaimTypes().subscribe(res => {
			res.items.forEach((_item: any, _index: any) => _item['label'] = _item.name)
			_that.ClaimAll = res.items
		})
	}
	/* 搜索人员 */
	searchbtn() {
		let formdata = this.formgroup.value;
		// console.log(formdata, '搜索人员');
		this.Recoverytableworker()//复位表格
		this.getallroles(formdata.filter)
	}
	/* 分页器切换分页 */
	pageworkerchange(val: any) {
		this.setObjectVal('Setrolestable', {
			skipCount: val.pageIndex,
		})
		// console.log(this.formgroup.value.filter,11)
		this.getallroles(this.formgroup.value.filter);
	}
	/* 复位表格 */
	Recoverytableworker() {
		this.setObjectVal('Setrolestable', {
			skipCount: 0,
			SelectWorkerData: []
		})
	}
	/* 选中表格事件 */
	SelectTheTable(table: any) {
		this.setObjectVal('Setrolestable', {
			SelectWorkerData: table,
		})
		console.log(table, '选中表格事件');
	}
	/* 设置对象的值 */
	setObjectVal(object: any, input: any) {
		var aimobject = JSON.parse(JSON.stringify(this[object]))
		for (const iterator in input) {
			aimobject[iterator] = input[iterator]
		}
		this[object] = aimobject
		// console.log(this[object],'设置对象的值')
	}
	addminusconfig: any
	addminusformgroup: FormGroup
	/* 列表操作方法 */
	tableoperateway(wayval: any) {
		switch (wayval.label) {
			case 'Permissions':
				/* 打开权限模态框 */
				this.openPermissionsModal(wayval.operatemess[0].name);
				break;
			case 'Claims':
				/* 打开权限模态框 */
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'Claimsval',
					contype: 'roles',
					RolesId: wayval.operatemess[0].id,
					concurrencyStamp: wayval.operatemess[0].concurrencyStamp,
					operatemess: wayval.operatemess
				})
				this.roleService.get(this.modalconfig.RolesId).subscribe(res => {
					// console.log("获取指定角色信息",res)
					let increaseClaimconst = JSON.parse(JSON.stringify(increaseClaim))
					increaseClaimconst.defaultValue = res.claims
					increaseClaimconst.selectOption = this.ClaimAll
					this.addminusconfig = increaseClaimconst
					this.addminusformgroup = this.setformdata([this.addminusconfig]);
					console.log(this.addminusconfig, 'Claims', this.addminusformgroup)
					this.openmodals('60vw')
				})

				break;
			case 'Edit':
				// 设置对象的值
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'UpdateRoles',
					contype: 'roles',
					operatemess: wayval.operatemess,
					RolesId: wayval.operatemess[0].id,
					concurrencyStamp: wayval.operatemess[0].concurrencyStamp
				})
				this.modalformdata = [
					{
						type: 'text',
						name: 'name',
						diaplayname: 'RoleName',
						// placeholder: '', //文本提示
						validators: [Validators.required,Validators.maxLength(11)], //验证
						defaultValue: wayval.operatemess[0].name, //默认值
						autocomplete: 'off', //自动完成
					}, {
						type: 'checkbox',
						name: 'checkbox',
						// defaultValue: '', //默认值
						checkboxmenu: [{
							diaplayname: 'DisplayName:IsDefault',
							name: 'isDefault',
							ischeck: wayval.operatemess[0].isDefault,
						}, {
							diaplayname: 'DisplayName:IsPublic',
							name: 'isPublic',
							ischeck: wayval.operatemess[0].isPublic,
						}],//复选框选择数据
					}
				]
				this.modalformgroup = this.setformdata(this.modalformdata);
				this.openmodals('500px')
				break;
			case 'Delete':
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'delete',
					contype: 'roles',
					delectlabel: 'Deletion Confirmation Message',
					operatemess: wayval.operatemess
				})
				this.modalformdata = []
				this.openmodals('35vw',)
				break;
		}
		console.log(this.modalconfig, '查看配置', wayval, '列表操作方法')

	}
	/* 模态框-确认 */
	OnSaveSubmit(dialogRefmodal: any) {
		var that = this;
		if (this.modalconfig.contype === 'roles') {
			if (this.modalconfig.status == 'Addroles') {
				// console.log('模态框-确认', this.modalformgroup.value)
				this.Addroles(this.modalformgroup.value, function () {
					that.getallroles(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'UpdateRoles') {
				console.log('模态框-确认-UpdateRoles', this.modalformgroup.value)
				this.UpdateRoles(this.modalformgroup.value, function () {
					that.getallroles(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'Claimsval') {
				console.log('模态框-确认-Claimsval', this.addminusformgroup.value)
				this.updateClaims(this.addminusformgroup.value.claim, function () {
					that.getallroles(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'delete') {
				this.deleteroles(this.modalconfig.operatemess, function () {
					that.closemodals(dialogRefmodal);
				})
			}
		}
	}
	/* 添加新角色弹窗 */
	openAddrolesDialog(title?: string) {
		// 设置对象的值
		this.setObjectVal('modalconfig', {
			title: title,
			status: 'Addroles',
			contype: 'roles',

		})
		this.modalformdata = [
			{
				type: 'text',
				name: 'name',
				diaplayname: 'RoleName',
				// placeholder: '', //文本提示
				validators: [Validators.required], //验证
				defaultValue: '', //默认值
				autocomplete: 'off', //自动完成
			}, {
				type: 'checkbox',
				name: 'checkbox',
				defaultValue: '', //默认值
				checkboxmenu: [{
					diaplayname: 'DisplayName:IsDefault',
					name: 'isDefault'
				}, {
					diaplayname: 'DisplayName:IsPublic',
					name: 'isPublic'
				}],//复选框选择数据
			}
		]
		this.modalformgroup = this.setformdata(this.modalformdata);
		this.openmodals('500px')
		// console.log(this.modalconfig, '查看配置 添加新角色弹窗')
	}
	/* 添加新角色*/
	Addroles(input: any, Addrolesback?: any) {
		input.isDefault = false
		input.isPublic = false
		input.checkbox.forEach((item: any, index: any) => {
			input[item.name] = item.ischeck
		})
		console.log('添加新角色', input)
		// Addrolesback && Addrolesback()
		// return
		this.roleService.create(input).subscribe(res => {
			Addrolesback && Addrolesback()
		})
	}
	/* 修改角色*/
	UpdateRoles(input: any, Addrolesback?: any) {
		input.isDefault = false
		input.isPublic = false
		input.id = this.modalconfig.RolesId
		input.concurrencyStamp = this.modalconfig.concurrencyStamp
		input.checkbox.forEach((item: any, index: any) => {
			input[item.name] = item.ischeck
		})
		console.log('修改角色', this.modalconfig.RolesId, input)
		// Addrolesback && Addrolesback()
		// return
		this.roleService.update(input.id, input).subscribe(res => {
			Addrolesback && Addrolesback()
		})
	}
	/* 删除角色 */
	deleteroles(input: any, deleterolesback?: any) {
		console.log('删除角色', input)
		var _that = this
		this.roleService.delete(input[0].id).subscribe(res => {
			_that._snackBar.open('删除成功', '', {
				duration: 2500,
				horizontalPosition: 'end',
			});
			if (this.Setrolestable.list.length === 1) {
				this.setObjectVal('Setrolestable', {
					skipCount: this.Setrolestable.skipCount == 0 ? this.Setrolestable.skipCount : this.Setrolestable.skipCount - 1,
				})
			}
			this.getallroles(this.formgroup.value.filter);
			deleterolesback && deleterolesback()
		})
	}
	/* 修改claim */
	updateClaims(input: any, updateClaimsback?: any) {
		var _that = this
		this.roleService.updateClaims(this.modalconfig.RolesId, input).subscribe(res => {
			_that._snackBar.open('成功', '', {
				duration: 2500,
				horizontalPosition: 'end',
			});
			updateClaimsback && updateClaimsback()
		})
	}
	/* 复位表单数据 */
	RecoveryForm() {
		this.modalformdata = []
		this.modalformgroup = this.setformdata(this.modalformdata);
	}
}
