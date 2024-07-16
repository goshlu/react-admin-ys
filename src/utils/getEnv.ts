// 获取环境变量的方法、

export function wrapperEnv(envConfig: Recordable): ViteEnv  {
    const ret: any  = {};
    for (const envName of Object.keys(envConfig)) {
        let realName = envConfig[envName].replace(/\\n/g, '\n');
        realName = realName === 'true' ? true : realName === 'false' ? false : realName;
        if(envName === 'VITE_PORT') {
            realName = Number(realName);
        }
        if(envName === 'VITE_PROXY') {
            try {
                realName = JSON.parse(realName);
            }catch(error) {
                console.log(error)
            }
        }
        ret[envName] = realName;
        process.env[envName] = realName;

    }
    return ret;
}