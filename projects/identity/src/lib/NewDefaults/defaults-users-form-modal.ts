import { FormControl, Validators } from '@angular/forms';
import { ClaimValueType } from "../enums/claim-value-type";



function emailVal(email: FormControl): object {
    // console.log(email, 'passWordVal');
    let value = email.value || '';
    let valid = value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    return valid ? {} : { msg: 'The {0} field is not a valid e-mail address.' };
}
/* 验证手机号 */
function phoneVal(phone: FormControl): object {
    let value = phone.value || '';
    // if (!value) return { msg: '请输入手机号' };
    const valid = value.match(/[0-9]{11}/);
    return valid ? {} : { msg: 'The {0} field is not a valid phone number.' };
}

/*  新增用户 */
export const CreateUsers = [
    {
        type: 'text',
        name: 'userName',
        diaplayname: 'DisplayName:UserName',
        validators: [Validators.required], //验证
        defaultValue: '',
    },
    {
        type: 'password',
        name: 'password',
        diaplayname: 'DisplayName:Password',
        validators: [Validators.required], //验证
        defaultValue: '',
        iseyeshow: true,
        isRandomPwd: true,//是否启用随机密码
    },
    {
        type: 'text',
        name: 'surname',
        diaplayname: 'DisplayName:Surname',
        validators: [], //验证
        defaultValue: '',
        isfloatval:'48'
    },
    {
        type: 'text',
        name: 'name',
        diaplayname: 'DisplayName:Name',
        validators: [], //验证
        defaultValue: '',
        isfloatval:'48'
    },
    {
        type: 'email',
        name: 'email',
        diaplayname: 'DisplayName:Email',
        validators: [Validators.required, emailVal], //验证
        defaultValue: '',
    },
    {
        type: 'tel',
        name: 'phoneNumber',
        diaplayname: 'DisplayName:PhoneNumber',
        validators: [], //验证
        defaultValue: '',
    },
    {
        type: 'checkbox',
        name: 'checkbox',
        defaultValue: '', //默认值
        checkboxmenu: [{
            diaplayname: 'DisplayName:IsActive',
            name: 'isActive'
        }, {
            diaplayname: 'DisplayName:LockoutEnabled',
            name: 'lockoutEnabled'
        }],//复选框选择数据
    }
]


/*  修改用户 */
export const UpdateUsers = [
    {
        type: 'text',
        name: 'userName',
        diaplayname: 'DisplayName:UserName',
        validators: [Validators.required], //验证
        defaultValue: '',
    },
    {
        type: 'text',
        name: 'surname',
        diaplayname: 'DisplayName:Surname',
        validators: [], //验证
        defaultValue: '',
        // isfloat: true,
        isfloatval:'48'
    },
    {
        type: 'text',
        name: 'name',
        diaplayname: 'DisplayName:Name',
        validators: [], //验证
        defaultValue: '',
        // isfloat: true,//是否半长浮动//需相邻两项同时使用
        isfloatval:'48'
    },
    {
        type: 'email',
        name: 'email',
        diaplayname: 'DisplayName:Email',
        validators: [Validators.required, emailVal], //验证
        defaultValue: '',
    },
    {
        type: 'tel',
        name: 'phoneNumber',
        diaplayname: 'DisplayName:PhoneNumber',
        validators: [], //验证
        defaultValue: '',
    },
    {
        type: 'checkbox',
        name: 'checkbox',
        defaultValue: '', //默认值
        checkboxmenu: [{
            diaplayname: 'DisplayName:IsActive',
            name: 'isActive',
            ischeck: false,
        }, {
            diaplayname: 'DisplayName:LockoutEnabled',
            name: 'lockoutEnabled',
            ischeck: false,
        }],//复选框选择数据
    }
]
// 自增配置
export const increaseUserClaim = {
    type: 'AddMinus',
    name: 'claim',
    groupconfig: [
        {
            label: 'claimType',
            type: 'select',
            value: '',
        },
        {
            label: 'claimValue',
            type: 'input',
            value: '',
        },
        {
            type: 'operate',
        },
    ],
    selectOption: [],//等待选择的值
    defaultValue: [],//默认数据
};


/*  新增用户 */
export const LockUsers = [
    {
        type: 'number',
        name: 'lockoutDuration',
        diaplayname: 'DisplayName:LockoutDuration',
        validators: [Validators.required], //验证
        defaultValue: '10',
    }
]

/*  设置密码 */
export const SetPasswordUsers = [
    {
        type: 'password',
        name: 'newPassword',
        diaplayname: 'DisplayName:Password',
        validators: [Validators.required], //验证
        defaultValue: '',
        iseyeshow: true,
        isRandomPwd: true,//是否启用随机密码
    }
]
/*  二次验证 */
export const TwoFactorEnabledUsers = [
    {
        type: 'checkbox',
        name: 'checkbox',
        defaultValue: '', //默认值
        checkboxmenu: [{
            diaplayname: 'DisplayName:TwoFactorEnabled',
            name: 'enabled',
            ischeck: false,
        }],//复选框选择数据
    }
]

/* 筛选 */

export const screenform = [
    {
        type: 'text',
        name: 'UserName',
        diaplayname: 'DisplayName:UserName',
        validators: [], //验证
        defaultValue: '',
        isfloatval:'31',
        isdelectbtn:true,//是否显示删除按钮
    },
    {
        type: 'email',
        name: 'Email',
        diaplayname: 'DisplayName:Email',
        validators: [], //验证
        defaultValue: '',
        isfloatval:'31',
        isdelectbtn:true,//是否显示删除按钮
    },
    {
        type: 'tel',
        name: 'PhoneNumber',
        diaplayname: 'DisplayName:PhoneNumber',
        validators: [], //验证
        defaultValue: '',
        isfloatval:'31',
        isdelectbtn:true,//是否显示删除按钮
    },
    {
        type: 'select',
        name: 'RoleId',
        diaplayname: 'Roles',
        validators: [], //验证
        defaultValue: '',
        optionsmenu: [], //下拉选择数据
        isfloatval:'48',
        isdelectbtn:true,//是否显示删除按钮
    },
    {
        type: 'TreeSelect',
        name: 'OrganizationUnitId',
        diaplayname: 'OrganizationUnits',
        validators: [], //验证
        defaultValue: '',
        isfloatval:'48',
        isdelectbtn:true,//是否显示删除按钮
        TreeSelectconfig:{
            list:[],
            isInput:true,//是否是输入框树
        }
    },
    {
        type: 'checkbox',
        name: 'checkbox',
        defaultValue: '', //默认值
        checkboxmenu: [{
            diaplayname: 'LockedOut',
            name: 'IsLockedOut',
            isfloatval:'15'
        }, {
            diaplayname: 'NotActive',
            name : 'NotActive',
            isfloatval:'15'
        }],//复选框选择数据
        // isfloatval:'28'
    }
]




