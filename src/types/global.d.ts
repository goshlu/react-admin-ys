declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
    VITE_PORT: number;
    VITE_COMPRESSION: 'gzip' | 'brotli' | 'none';
    VITE_DROP_CONSOLE: boolean;
    VITE_OPEN: boolean;
}
// menu
declare namespace Menu {
    interface MenuOptions {
        key?: string;
        label?: string;
        path: string;
        title: string;
        icon?: string;
        meta: Meta;
        children?: MenuOptions[];
    }
}

declare interface FormConfigItem {
    label: string;
    name: string;
    type: 'input'| 'select' | 'radio' | 'checkbox' | 'textarea';
    options?: {
        label: string;
        value: any
    }[],
    placeholder?: string;
}