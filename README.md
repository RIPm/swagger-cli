# swagger-cli
基于autoreset进行封装

依赖swagger api文档生成model、service等typescript代码

# Usage

```sh
swagger-cli -h
```

# Configure

> swagger-cli gen -h

```sh
// 按配置拉取api文档
swagger-cli gen -p
// 按配置生成model
swagger-cli gen -m
// 按配置生成service
swagger-cli gen -s

// 可同时使用
// 即拉文档又生成model
swagger-cli gen -pm
// or
swagger-cli gen -p -m
// 同理其他也是如此配合
```

swagger-cli.json

> 单配置，生成一个
```js
{
    // 拉取api文档
    "pull": {
      // 文档链接 
      "docsUrl": "http://test.sj-api.devkubeapp.360kad.com/oms/v2/api-docs",
      // 输出位置（默认： 根目录下apidocs.config.json）
      "outputFilename": "./apidocs.oms.config.json"
    },
    // 生成model和operation
    // autorest配置 详情请看autorest的github, 现集成了默认配置(src/templates/swagger-gen.yml)
    "autorest": {
      // 生成的swagger放在项目的哪里
      "output-folder": "src",
      // 生成的swagger的文件夹名字
      "source-code-folder-path": "swagger-oms"
    },
    // 依赖operation生成对应serivce
    "service": {
      // swagger的model和operation位置
      "swaggerRoot": "swagger-oms",
      // 输出位置
      "outputDir": "services-oms",
      // 生成转换
      "transform": {
        // template依赖的额外参数(做自定化)
        "extraData": {
          "importRoot": "@/",
          "serverClientPath": "services-oms/config"
        }
      }
    }
}
```

> 数组配置，生成多个

```js
[
  {
    // 拉取api文档
    "pull": {
      // 文档链接 
      "docsUrl": "http://test.sj-api.devkubeapp.360kad.com/oms/v2/api-docs",
      // 输出位置（默认： 根目录下apidocs.config.json）
      "outputFilename": "./apidocs.oms.config.json"
    },
    // 生成model和operation
    // autorest配置 详情请看autorest的github, 现集成了默认配置(src/templates/swagger-gen.yml)
    "autorest": {
      // 生成的swagger放在项目的哪里
      "output-folder": "src",
      // 生成的swagger的文件夹名字
      "source-code-folder-path": "swagger-oms"
    },
    // 依赖operation生成对应serivce
    "service": {
      // swagger的model和operation位置
      "swaggerRoot": "swagger-oms",
      // 输出位置
      "outputDir": "services-oms",
      // 生成转换
      "transform": {
        // template依赖的额外参数(做自定化)
        "extraData": {
          "importRoot": "@/",
          "serverClientPath": "services-oms/config"
        }
      }
    }
  }, 
  ...
]
```

# 命令行单独执行

```sh
// 拉取docs到本地
swagger-cli pull <docsUrl> -o [outputPath]
// 生成model
swagger-cli gen-model <autoreset configPath>
// 生成service (暂未重新支持，可使用配置版)
swagger-cli gen-service <serviceConfigPath>
```