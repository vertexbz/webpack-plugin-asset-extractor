const AssetExtractor = function(options) {
    this.options = Object.assign({
        manifest: 'asset-manifest.json'
    }, options);

    this.id = ++AssetExtractor.nextId;

    AssetExtractor.aggregator[this.id] = {};
};

AssetExtractor.nextId = 0;
AssetExtractor.aggregator = {};

AssetExtractor.prototype.loader = function(options) {
    return {
        loader: require.resolve('./loader'),
        options: Object.assign({}, options, { id: this.id })
    };
};

AssetExtractor.prototype.apply = function(compiler) {
    const id = this.id;
    const manifest = this.options.manifest;

    compiler.plugin('emit', function(compilation, callback) {
        const content = JSON.stringify(AssetExtractor.aggregator[id], null, 4);

        compilation.assets[manifest] = {
            source: () => content,
            size: () => content.length
        };

        callback();
    });
};

module.exports = AssetExtractor;
