const loaderUtils = require('loader-utils');
const AssetExtractor = require('./index');

const thunkOrJoin = (thunkOrPrefix, value) => {
    if (thunkOrPrefix === undefined) {
        return value;
    }

    if (typeof thunkOrPrefix === 'function') {
        return thunkOrPrefix(value);
    }

    return thunkOrPrefix + value;
};

const loader = function(content) {
    if (!this.emitFile) throw new Error('Asset Loader\n\nemitFile is required from module system');

    const options = Object.assign({
        publicPath: '/'
    }, loaderUtils.getOptions(this) || {});

    if (!options.id) throw new Error('Asset Loader\n\nmust have id option provided, use AssetExtractor plugin');

    const context = options.context || this.options.context;

    const url = loaderUtils.interpolateName(this, options.name, { context, content, regExp: options.regExp });

    const outputPath = thunkOrJoin(options.outputPath, url);

    const publicPath = thunkOrJoin(options.publicPath, url);

    this.emitFile(outputPath, content);

    AssetExtractor.aggregator[options.id][outputPath] = publicPath;

    return `module.exports = ${JSON.stringify(publicPath)};`;
};

module.exports = loader;
module.exports.raw = true;
