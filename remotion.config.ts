import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Enable PostCSS for Tailwind CSS 4
Config.overrideWebpackConfig((currentConfiguration) => {
    return {
        ...currentConfiguration,
        module: {
            ...currentConfiguration.module,
            rules: [
                ...(currentConfiguration.module?.rules || []).filter((rule) => {
                    if (rule && typeof rule === 'object' && 'test' in rule && rule.test instanceof RegExp) {
                        return !rule.test.test('test.css');
                    }
                    return true;
                }),
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        '@tailwindcss/postcss',
                                    ],
                                },
                            },
                        },
                    ],
                },
            ],
        },
    };
});
