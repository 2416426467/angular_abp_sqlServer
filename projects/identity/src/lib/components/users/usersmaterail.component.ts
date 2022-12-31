/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, Injectable, Injector, OnInit, InjectionToken } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { dynamicform } from 'projects/components/src/lib/interface/dynamic-form';
import { IdentityUserService, IdentityRoleService } from '../../../../proxys/dignite/abp/identity/index';
import { ePermissionManagementComponents } from '@abp/ng.permission-management';//权限
import { CreateUsers, increaseUserClaim, UpdateUsers, LockUsers, SetPasswordUsers, TwoFactorEnabledUsers } from "../../NewDefaults/defaults-users-form-modal";
import { MatSnackBar } from '@angular/material/snack-bar'; // 快餐栏

import { LocalizationService } from '@abp/ng.core';//本地化
/* 引用修改 */
import { SnackBarComponent } from 'projects/components/src/public-api';

@Component({
	selector: 'lib-usersmaterail',
	templateUrl: './usersmaterail.component.html',
	styleUrls: ['./usersmaterail.component.scss']
})
export class UsersmaterailComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private FormsModule: FormsModule,
		private UserService: IdentityUserService,
		private RoleService: IdentityRoleService,
		private _snackBar: MatSnackBar,
		private Localization: LocalizationService
	) { }
	// 权限
	providerKey: string;
	visiblePermissions = false;
	onVisiblePermissionChange = (event: boolean) => {
		this.visiblePermissions = event;
	};
	permissionManagementKey = ePermissionManagementComponents.PermissionManagement;
	/* 打开 Permissions 模态框*/
	openPermissionsModal(providerKey: string) {
		this.providerKey = providerKey;
		setTimeout(() => {
			this.visiblePermissions = true;
		}, 0);
	}
	// 权限end
	//搜索表单数据
	formdata: dynamicform[] = [
		{
			type: 'text',
			name: 'filter',
			diaplayname: '',
			placeholder: 'Search', //文本提示
			validators: [], //验证
		},
	];
	/* 组织机构成员表格数据 */
	SetUsersTable: any = {
		maxResultCount: 10, //每页显示数量
		skipCount: 0, //分页
		tdStyle: 'text-align: left;padding: 0 20px;',
		list: [], //表格列表数据
		totalCount: 0, //表格列表数量
		ischeck: false, //是否显示多择按钮
		isoperate: true,
		operatepositionhead: true,
		SelectWorkerData: [], //多选时表格选择的数据
		displayedColumns: [
			//表格表头
			'userName',
			'isExternal',
			'roleNames',
			'email',
			'phoneNumber',
			'isActive',
			'name',
			'surname',
			'twoFactorEnabled',
			'lockoutEnabled',
			'emailConfirmed',
			'creationTime'
		],
		ColumnsReplace: {
			userName: 'UserName',
			phoneNumber: 'PhoneNumber',
			roleNames: 'RoleName',
			email: 'EmailAddress',
			// name:'',
			surname: 'Surname',
			// isActive:'',
			creationTime: 'CreationTime',
			operate: 'Actions',
		},
	};
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

	/* modal 弹窗配置 */
	modalconfig: any = {
		ismodalopen: false,//弹窗是否显示   
		setwidth: '35vw',//弹窗宽度
		setheight: '',//弹窗高度
		title: '',//弹窗标题
		status: '',//弹窗类型，存有删除弹窗delete，表示操作的某块内容是干什么的
		contype: '',//内容类型 表示操作的那块内容
		delectlabel: 'Deletion Confirmation Message',//删除提示
	};
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
	}
	currentUser: any = null;//当前用户
	rolesgroup: any[] = []//角色
	rolesgroupcopy: any[] = []//角色copy
	Selectroles: any[] = []//选择的角色
	durationInSeconds: number = 2.5;//文本提示消失时间

	addminusconfig: any//自增配置
	addminusformgroup: FormGroup//自增表单字段
	/* 所有claim 数据 */
	ClaimAll: any[] = []

	ngOnInit(): void {
		this.getCurrentUser()//获取当前用户信息
		this.getallUsers();//获取所有用户
		this.getallroles();
		this.getClaimAll()

	}
	/* 获取所有claim */
	getClaimAll() {
		var _that = this
		this.UserService.getAllClaimTypes().subscribe(res => {
			res.items.forEach((_item: any, _index: any) => _item['label'] = _item.name)
			_that.ClaimAll = res.items
		})
	}
	/* 获取所有角色 */
	getallroles(filter?: any) {
		var _that = this;
		this.RoleService
			.getAllList()
			.subscribe(res => {
				console.log(res, '获取所有角色');
				res.items.forEach((item: any, index: any) => {
					item.ischeck = false
					item.diaplayname = item.name
				})
				this.rolesgroup = res.items
				this.rolesgroupcopy = JSON.parse(JSON.stringify(res.items))
			});
	}
	/* 获取当前用户信息 */
	getCurrentUser() {
		var _that = this
		this.UserService.getApplication().subscribe(res => {
			// console.log(res,"5555555555",res['currentUser'])
			_that.currentUser = res['currentUser']
		})
	}
	/* 获取所有用户 */
	getallUsers(filter?: any) {
		var _that = this
		this.UserService
			.getList({
				maxResultCount: this.SetUsersTable.maxResultCount,
				skipCount: this.SetUsersTable.skipCount * this.SetUsersTable.maxResultCount,
				filter: filter,
			})
			.subscribe(res => {
				console.log(res, '获取所有用户', _that.currentUser);
				res.items.forEach((item: any, index: any) => {
					item.operate = [{
						type: 'menus',
						label: 'Actions',
						menuslist: item.id === _that.currentUser.id ? ['Edit', 'Claims', 'Permissions', 'Lock', 'SetPassword', 'SetTwoFactorEnabled'] : ['Edit', 'Claims', 'Permissions', 'SetPassword', 'SetTwoFactorEnabled', 'Delete']
					}]
				})
				_that.setObjectVal('SetUsersTable', {
					list: res.items,
					totalCount: res.totalCount,
				})
			});
	}
	/* 搜索用户 */
	searchbtn() {
		let formdata = this.formgroup.value;
		console.log(formdata, '搜索用户');
		this.Recoverytableworker()//复位表格
		this.getallUsers(formdata.filter)
	}

	/* 设置对象的值 */
	setObjectVal(object: any, input: any) {
		var aimobject = JSON.parse(JSON.stringify(this[object]))
		for (const iterator in input) {
			aimobject[iterator] = input[iterator]
		}
		this[object] = aimobject
	}

	/* 分页器切换分页 */
	pageworkerchange(val: any) {
		this.setObjectVal('SetUsersTable', {
			skipCount: val.pageIndex,
		})
		this.getallUsers(this.formgroup.value.filter);
	}
	/* 复位表格 */
	Recoverytableworker() {
		this.setObjectVal('SetUsersTable', {
			skipCount: 0,
			SelectWorkerData: []
		})
	}
	/* 选中表格事件 */
	SelectTheTable(table: any) {
		this.setObjectVal('SetUsersTable', {
			SelectWorkerData: table,
		})
		console.log(table, '选中表格事件');
	}
	modalformdata: any[] = []
	modalformgroup: FormGroup = this.setformdata(this.modalformdata);
	/* 添加新用户弹窗 */
	openAddUsersDialog(title?: string) {
		// 设置对象的值
		this.setObjectVal('modalconfig', {
			title: title,
			status: 'AddUsers',
			contype: 'Users',

		})
		console.log('添加新用户弹窗', CreateUsers)
		this.fuweiformdata()//复位表单数据
		this.modalformdata = CreateUsers
		this.modalformgroup = this.setformdata(this.modalformdata);
		this.openmodals('500px')
	}

	/* 列表操作方法 */
	tableoperateway(wayval: any) {
		this.fuweiformdata()//复位表单数据
		switch (wayval.label) {
			case 'Edit':
				// 设置对象的值
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'UpdateUsers',
					contype: 'Users',
					operatemess: wayval.operatemess,
					UsersId: wayval.operatemess[0].id,
					concurrencyStamp: wayval.operatemess[0].concurrencyStamp
				})
				UpdateUsers.forEach((item: any, index: any) => {
					for (const key in wayval.operatemess[0]) {
						if (item.name === key) {
							item.defaultValue = wayval.operatemess[0][key]
						}
						if (item.name === 'checkbox') {
							item.checkboxmenu.forEach((item1: { name: string; ischeck: any; }, index1: any) => {
								if (item1.name === key) {
									item1.ischeck = wayval.operatemess[0][key]
								}
							})
						}
					}
				})
				wayval.operatemess[0]['roleNames'].forEach((item: any, index: any) => {
					this.rolesgroup.forEach((item1: any, index1: any) => {
						if (item === item1.diaplayname) {
							item1.ischeck = true
						}
					})
				})
				console.log('列表操作方法:', wayval, this.rolesgroup)

				this.modalformdata = UpdateUsers
				this.modalformgroup = this.setformdata(this.modalformdata);

				this.openmodals('35vw')

				break;
			case 'Permissions':
				/* 打开权限模态框 */
				console.log('列表操作方法:', wayval)
				this.openPermissionsModal(wayval.operatemess[0].id);
				break;
			case 'Claims':
				/* 打开权限模态框 */
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'Claimsval',
					contype: 'Users',
					UsersId: wayval.operatemess[0].id,
					concurrencyStamp: wayval.operatemess[0].concurrencyStamp,
					operatemess: wayval.operatemess
				})
				this.UserService.get(this.modalconfig.UsersId).subscribe(res => {
					// console.log("获取指定角色信息",res)
					let increaseClaimconst = JSON.parse(JSON.stringify(increaseUserClaim))
					increaseClaimconst.defaultValue = res.claims
					increaseClaimconst.selectOption = this.ClaimAll
					this.addminusconfig = increaseClaimconst
					this.addminusformgroup = this.setformdata([this.addminusconfig]);
					console.log(this.addminusconfig, 'Claims', this.addminusformgroup)
					this.openmodals('60vw')
				})

				break;
			case 'Lock':
				/* 打开权限模态框 */
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'LockUsers',
					contype: 'Users',
					UsersId: wayval.operatemess[0].id,
					concurrencyStamp: wayval.operatemess[0].concurrencyStamp,
					operatemess: wayval.operatemess
				})

				this.modalformdata = LockUsers
				this.modalformgroup = this.setformdata(this.modalformdata);
				this.openmodals('35vw')
				break;
			case 'SetPassword':
				/* 打开权限模态框 */
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'SetPassword',
					contype: 'Users',
					UsersId: wayval.operatemess[0].id,
					concurrencyStamp: wayval.operatemess[0].concurrencyStamp,
					operatemess: wayval.operatemess
				})
				// console.log(SetPasswordUsers,"66666")
				this.modalformdata = SetPasswordUsers
				this.modalformgroup = this.setformdata(this.modalformdata);
				console.log(this.modalformdata, "66666", this.modalformgroup, wayval)
				this.openmodals('35vw')
				break;
			case 'SetTwoFactorEnabled':
				/* 打开权限模态框 */
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'SetTwoFactorEnabled',
					contype: 'Users',
					UsersId: wayval.operatemess[0].id,
					concurrencyStamp: wayval.operatemess[0].concurrencyStamp,
					operatemess: wayval.operatemess
				})
				// console.log(SetPasswordUsers,"66666")
				TwoFactorEnabledUsers[0].checkboxmenu[0].ischeck = wayval.operatemess[0].twoFactorEnabled
				this.modalformdata = TwoFactorEnabledUsers
				this.modalformgroup = this.setformdata(this.modalformdata);
				console.log(this.modalformdata, "66666", this.modalformgroup, wayval)
				this.openmodals('35vw')
				break;
			case 'Delete':
				this.setObjectVal('modalconfig', {
					title: wayval.label,
					status: 'delete',
					contype: 'Users',
					delectlabel:  this.Localization.instant('AbpIdentity::ItemWillBeDeletedMessage'),
					UsersId: wayval.operatemess[0].id,
					operatemess: wayval.operatemess
				})
				this.modalformdata = []
				this.openmodals('35vw',)
				break;
		}
	}


	/* 表单提交 */
	OnSaveSubmit(dialogRefmodal: any) {
		var that = this;
		console.log('模态框-确认', this.modalformgroup, this.Selectroles, CreateUsers)
		for (const iterator in this.modalformgroup.controls) {
			if (!this.modalformgroup.controls[iterator].valid) {
				for (let index = 0; index < CreateUsers.length; index++) {
					let item = CreateUsers[index]
					if (item.name === iterator) {
						this._snackBar.openFromComponent(SnackBarComponent, {
							data: {
								message: "字段" + this.Localization.instant('AbpIdentity::' + item.diaplayname) + "不能为空",
								type: 'warn',//success,warn
							},
							duration: this.durationInSeconds * 1000,
							horizontalPosition: 'center',
							verticalPosition: 'top'
						});
						return
					}
				}
			}
		}
		if (this.modalconfig.contype === 'Users') {
			if (this.modalconfig.status == 'AddUsers') {
				// console.log('模态框-确认11111', this.modalformgroup.value, this.Selectroles)
				this.AddUsers(this.modalformgroup.value, this.Selectroles, function () {
					that.getallUsers(that.formgroup.value.filter)
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'UpdateUsers') {
				this.getyetroles()
				// console.log('模态框-确认11111', this.modalformgroup.value, this.Selectroles)
				this.UpdateUsers(this.modalformgroup.value, this.Selectroles, function () {
					that.getallUsers(that.formgroup.value.filter)
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'Claimsval') {
				console.log('模态框-确认-Claimsval', this.addminusformgroup.value)
				this.updateClaims(this.addminusformgroup.value.claim, function () {
					that.getallUsers(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'LockUsers') {
				console.log('模态框-确认-LockUsers', this.modalformgroup.value)
				this.Userslock(this.modalformgroup.value, function () {
					that.getallUsers(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'SetPassword') {
				console.log('模态框-确认-SetPassword', this.modalformgroup.value)
				this.SetPassword(this.modalformgroup.value, function () {
					that.getallUsers(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'SetTwoFactorEnabled') {
				console.log('模态框-确认-SetTwoFactorEnabled', this.modalformgroup.value)
				this.SetTwoFactorEnabled(this.modalformgroup.value, function () {
					that.getallUsers(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
			if (this.modalconfig.status == 'delete') {
				console.log('模态框-确认-delete', this.modalformgroup.value)
				this.deleteUser(function () {
					that.getallUsers(that.formgroup.value.filter);
					that.closemodals(dialogRefmodal);
				})
			}
		}
	}
	/* 删除用户 */
	deleteUser(SetTwoFactorEnabledback?: any){
		this.UserService.delete(this.modalconfig.UsersId).subscribe(res => {
			this._snackBar.openFromComponent(SnackBarComponent, {
				data: {
					message: this.Localization.instant('AbpSettingManagement::SuccessfullyDeleted'),
					type: 'success',//success,warn
				},
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
			SetTwoFactorEnabledback && SetTwoFactorEnabledback()
		})
	}
	/* 设置二次验证 */
	SetTwoFactorEnabled(input: any, SetTwoFactorEnabledback?: any) {
		input.enabled = false
		input.checkbox.forEach((item: any, index: any) => {
			input[item.name] = item.ischeck
		})
		console.log(input, "666666")
		// return
		this.UserService.setTwoFactorEnabled(this.modalconfig.UsersId, input.enabled).subscribe(res => {
			this._snackBar.openFromComponent(SnackBarComponent, {
				data: {
					message: this.Localization.instant('AbpSettingManagement::SuccessfullySaved'),
					type: 'success',//success,warn
				},
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
			SetTwoFactorEnabledback && SetTwoFactorEnabledback()
		})
	}
	/* 设置密码 */
	SetPassword(input: any, SetPasswordback?: any) {
		this.UserService.updatePassword(this.modalconfig.UsersId, input).subscribe(res => {
			this._snackBar.openFromComponent(SnackBarComponent, {
				data: {
					message: this.Localization.instant('AbpSettingManagement::SuccessfullySaved'),
					type: 'success',//success,warn
				},
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
			SetPasswordback && SetPasswordback()
		})
	}
	/* 设置用户lock */
	Userslock(input: any, Userslockback?: any) {
		this.UserService.lock(this.modalconfig.UsersId, input.lockoutDuration).subscribe(res => {
			this._snackBar.openFromComponent(SnackBarComponent, {
				data: {
					message: this.Localization.instant('AbpSettingManagement::SuccessfullySaved'),
					type: 'success',//success,warn
				},
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
			Userslockback && Userslockback()
		})
	}
	/* 修改claim */
	updateClaims(input: any, updateClaimsback?: any) {
		var _that = this
		this.UserService.updateClaims(this.modalconfig.UsersId, input).subscribe(res => {
			this._snackBar.openFromComponent(SnackBarComponent, {
				data: {
					message: this.Localization.instant('AbpSettingManagement::SuccessfullySaved'),
					type: 'success',//success,warn
				},
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
			updateClaimsback && updateClaimsback()
		})
	}
	/* 修改用户信息 */
	UpdateUsers(input: any, roles: any, AddUsersback?: any) {
		input.isActive = false
		input.lockoutEnabled = false
		input.checkbox.forEach((item: any, index: any) => {
			input[item.name] = item.ischeck
		})
		input.roleNames = []
		roles.forEach((item: any, index: any) => {
			input.roleNames.push(item.name)
		})
		input.concurrencyStamp = this.modalconfig.concurrencyStamp
		this.UserService.update(this.modalconfig.UsersId, input).subscribe(res => {
			this._snackBar.openFromComponent(SnackBarComponent, {
				data: {
					message: this.Localization.instant('AbpSettingManagement::SuccessfullySaved'),
					type: 'success',//success,warn
				},
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
			AddUsersback && AddUsersback()
		})
	}
	/* 新用户提交 */
	AddUsers(input: any, roles: any, AddUsersback?: any) {
		input.isActive = false
		input.lockoutEnabled = false
		input.checkbox.forEach((item: any, index: any) => {
			input[item.name] = item.ischeck
		})
		input.roleNames = []
		roles.forEach((item: any, index: any) => {
			input.roleNames.push(item.name)
		})
		// console.log('新用户提交', input)
		this.UserService.create(input).subscribe(res => {
			this._snackBar.openFromComponent(SnackBarComponent, {
				data: {
					message: this.Localization.instant('AbpSettingManagement::SuccessfullySaved'),
					type: 'success',//success,warn
				},
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
			AddUsersback && AddUsersback()
		})
	}
	/* 用户的角色选择事件 */
	checkboxchange(event: any, checkitem: any) {
		checkitem.ischeck = event.checked
		// if (event.checked) {
		// 	this.Selectroles.push(checkitem)
		// } else {
		// 	this.Selectroles.forEach((item, index) => {
		// 		if (item.id === checkitem.id) {
		// 			this.Selectroles.splice(index, 1)
		// 		}
		// 	})
		// }
		this.getyetroles()
		console.log('用户的角色选择事件', event, checkitem, this.rolesgroup, this.Selectroles)
	}
	/* 获取用户已选择的角色 */
	getyetroles() {
		let Selectroles = []
		this.rolesgroup.forEach((item, index) => {
			if (item.ischeck) {
				Selectroles.push(item)
			}
		})
		this.Selectroles = Selectroles
	}

	/* 复位表单数据 */
	fuweiformdata() {
		this.rolesgroup = JSON.parse(JSON.stringify(this.rolesgroupcopy))
		this.Selectroles = []
		this.modalformdata = []
		this.modalformgroup = this.setformdata(this.modalformdata);
	}

}
