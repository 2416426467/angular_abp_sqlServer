import { Validators } from '@angular/forms';
import { ClaimValueType } from "../enums/claim-value-type";



export const increaseClaim = {
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
// const 