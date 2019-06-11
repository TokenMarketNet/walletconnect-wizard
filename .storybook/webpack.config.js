module.exports = ({ config }) => {
    // This is weird, but apparently this is needed for our svgs to inline correctly
    config.module.rules = config.module.rules.map( data => {
        if (/svg\|/.test( String( data.test ) ))
            data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

        return data;
    });
    config.module.rules.push({
        test: /\.svg$/,
        use: [
            {
                loader: require.resolve('svg-inline-loader'),
            },
        ]
    });
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
            },
            // Optional
            {
                loader: require.resolve('react-docgen-typescript-loader'),
            },
        ],
    });
    config.resolve.extensions.push('.ts', '.tsx', '.svg');
    return config;
};

