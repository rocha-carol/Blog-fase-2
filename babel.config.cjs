module.exports = {
    presets: [
        [
            "@babel/preset-env",
            { targets: { node: "current" } } // necessário para Jest rodar no Node
        ]
    ]
};
