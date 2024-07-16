export const formConfig: FormConfigItem[] = [
    {
        label: '用户名',
        name: 'username',
        type: 'input',
        placeholder: '请输入用户名'
    },
    {
        label: '职位',
        name: 'position',
        type: 'select',
        options: [
            {label: "开发", value: 'developer'},
            {label: "测试", value: 'tester'},
            {label: "产品", value: 'product'},
            {label: "运维", value: 'operation'}
        ]
    },
]