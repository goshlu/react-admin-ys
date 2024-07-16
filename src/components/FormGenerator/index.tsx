import { Button, Checkbox, Form, Input, Radio, Select } from "antd";
import React from "react";

interface FormGeneratorProps {
    config: FormConfigItem,
    onFinish?: (values: any) => void,
    onReset?: () => void,
    values: any
    confirmText?: string,
    resetText?: string
}

const searchForm: React.FC<FormGeneratorProps> = ({
    config,
    onFinish,
    onReset,
    values,
    confirmText='查询',
    resetText='重置',
}) => {
    function renderForItem(item: FormConfigItem) {
        switch (item.type) {
            case 'input':
                return <Input placeholder={item.placeholder} />
            case 'select':
                return (
                    <Select placeholder={item.placeholder}>
                    {item.options?.map((option) => {
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    })}
                </Select>
                )
            case 'radio':
                return <Radio />
            case 'checkbox':
                return <Checkbox />
            case 'textarea':
                return <Input.TextArea placeholder={item.placeholder} />
        }
    }
    return (
        <Form className="layout-form" onFinish={onFinish} onReset={onReset}>
            {
                config.map((item: FormConfigItem) => {
                    <Form.Item key={item.name} name={item.name} label={item.label}>
                        {renderForItem(item)}
                    </Form.Item>
                })
            }
            <Form.Item>
                <Button type="primary" htmlType="submit">{confirmText}</Button>
                <Button htmlType="reset">{resetText}</Button>
            </Form.Item>
        </Form>
    )
}

export default searchForm;