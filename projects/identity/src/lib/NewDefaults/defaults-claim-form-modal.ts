import { Validators } from '@angular/forms';
import { ClaimValueType } from "../enums/claim-value-type";

let optionsmenu: any[] = []
for (let i = 0; i < 4; i++) {
    optionsmenu.push({
        value: i,
        label: ClaimValueType[i]
    })
}

/*  新增claim */
export const CreateClaim = [
    {
        type: 'text',
        name: 'name',
        diaplayname: 'ClaimName',
        validators: [Validators.required], //验证
        defaultValue: '',
    }, {
        type: 'checkbox',
        name: 'requiredbox',
        checkboxmenu: [{
            diaplayname: 'DisplayName:Required',
            name: 'required',
            ischeck: false,
        }],//复选框选择数据
    },
    {
        type: 'text',
        name: 'regex',
        diaplayname: 'DisplayName:Regex',
        defaultValue: '',
    },
    {
        type: 'text',
        name: 'regexDescription',
        diaplayname: 'DisplayName:RegexDescription',
        defaultValue: '',
    }, {
        type: 'text',
        name: 'description',
        diaplayname: 'DisplayName:Description',
        defaultValue: '',
    }, {
        type: 'select',
        name: 'valueType',
        // validators: [Validators.required], 
        diaplayname: 'DisplayName:ValueType',
        optionsmenu: optionsmenu, //下拉选择数据
        defaultValue: 0,
    },
]




/* 修改claim */
export const updataClaim = [
    {
        type: 'text',
        name: 'name',
        diaplayname: 'ClaimName',
        validators: [Validators.required], //验证
        defaultValue: '',
    }, {
        type: 'checkbox',
        name: 'requiredbox',
        checkboxmenu: [{
            diaplayname: 'DisplayName:Required',
            name: 'required',
            ischeck: false,
        }],//复选框选择数据
    },
    {
        type: 'text',
        name: 'regex',
        diaplayname: 'DisplayName:Regex',
        defaultValue: '',
    },
    {
        type: 'text',
        name: 'regexDescription',
        diaplayname: 'DisplayName:RegexDescription',
        defaultValue: '',
    }, {
        type: 'text',
        name: 'description',
        diaplayname: 'DisplayName:Description',
        defaultValue: '',
    }, {
        type: 'select',
        name: 'valueType',
        // validators: [Validators.required], 
        diaplayname: 'DisplayName:ValueType',
        optionsmenu: optionsmenu, //下拉选择数据
        defaultValue: 0,
    },
]


