# webpack-plugin-asset-extractor

This small webpack plugin allows you to set custom public paths for your assets as well as output paths. 
Main difference to `file-loader` is that *outputPath* and *publicPath* don't affect each other.  

## Usage

```js
const AssetExtractor = require('webpack-plugin-asset-extractor');

const imageExtractor = new AssetExtractor({
    manifest: 'assets.json'
});

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    imageExtractor.loader({
                        hash:'sha512',
                        digest:'hex',
                        name: '[hash].[ext]',
                        publicPath: '/assets/images/'
                    }),
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // ...
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // ...
        imageExtractor
    ]
};
```

## Plugin Options

|Name|Type|Default|Description|
|:---:|:---:|:-----:|:----------|
|**`manifest`**|`String`|`asset-manifest.json`|Configure a custom filename with generated assets map filename to url|

## Loader Options

|Name|Type|Default|Description|
|:---:|:---:|:-----:|:----------|
|**`name`**|`String` or `Function`|`[hash].[ext]`|Configure a custom filename template for your file|
|**`context`**|`String`|`this.options.context`|Configure a custom file context, defaults to `webpack.config.js` [context](https://webpack.js.org/configuration/entry-context/#context)|
|**`publicPath`**|`String` or `Function`|`/`|Configure a custom `public` path for your files|
|**`outputPath`**|`String` or `Function`|`'undefined'`|Configure a custom `output` path for your files (within context)|
