export default {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        // '@vue/babel-preset-jsx',
        // [
        //     '@vue/cli-plugin-babel/preset',
        //     {
        //         useBuiltIns: "entry",
        //         jsx: {
        //             injectH: false
        //         }
        //     }
        // ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3,
            },
        ],
        "@vue/babel-plugin-jsx",
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
    ]
}