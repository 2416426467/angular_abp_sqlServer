export interface dynamicform{
    type:string,
    name:string,
    diaplayname?:string,
    isrequired?:boolean,
    placeholder?:string,
    readonly?:boolean,
    disabled?:boolean,
    isdelectbtn?:boolean,
    iseyeshow?:boolean;
    validators?:any[],
    defaultValue?:any,
    optionsmenu?:any[],
    checkboxmenu?:any[],
    radiomenu?:any[],
    autocomplete?:string,
    increasehead?:any[],
    increasevalue?:any[],
    isfloat?:boolean,//是否半长浮动//需相邻两项同时使用
    isRandomPwd?:boolean,
    TreeSelectconfig?:any//
  }

  const enum Formtype {
    text = 'text', //输入框
    password = 'password', //密码
    number = 'number', //数字框
    date = 'date', //日期选择
    time = 'time', //时间选择
    datetime = 'datetime', //日期时间选择
    checkbox = 'checkbox', //复选框
    radio = 'radio', //单选框
    textarea = 'textarea', //多行输入文本
    select = 'select', //选择
    query = 'query', //搜索
    richtext = 'richtext', //富文本
    email = 'email', //邮箱
    mobile = 'mobile', //手机
    file = 'file', //手机
    color = 'color', //颜色
    TreeSelect='TreeSelect',//树形选择

  }