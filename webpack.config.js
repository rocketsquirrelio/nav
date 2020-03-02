const path = require('path');

module.exports = (env, argv) => {

    const config = {
        entry: './demo/index.js',
        output: {
            path: path.resolve(__dirname, 'demo'),
            publicPath: '/',
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                }
            ]
        },
        devServer: {
            contentBase: './demo',
            hot: true,
        },
    };

    return config;
};