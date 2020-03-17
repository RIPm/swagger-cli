# swagger-cli
依赖swagger api文档生成model、service等typescript代码

# Usage

```sh
swagger-cli -h
```

# Configure

swagger-cli.json

```js
 {
    // 拉取api文档
    pull: {
        // 文档链接
        docsUrl: '',
        // 输出位置（默认： 根目录下apidocs.config.json）
        output: '../apidocs.config.json'
    },

    // 生成model和operation
    // autorest配置 详情请看autorest的github, 现集成了默认配置(src/templates/swagger-gen.yml)
    autorest: getAutoresetConfig(autoresetConfigTemplatePath),

    // 依赖operation生成对应serivce
    service: {
        // swagger的model和operation位置
        swaggerRoot: 'swagger',
        // 输出位置
        outputDir: 'services',
        // serice的根，默认src
        root: source,
        // 生成转换
        transform:{
            // 转换器（默认：src/transformer）
            transformer: transformer,
            // 转换模板（默认：src/templates/service-template.mustache）
            templatePath: __dirname + "/templates/service-template.mustache",
            // TODO：multi or single. 单个文件或多个
            mode: 'multi',
            // template依赖的额外参数(做自定化)
            extraData: {
                isDefaultExport: true,
                importRoot: '../',
                serverClientPath: 'serverClient',
            }
        }
    }
}
```
