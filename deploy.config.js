module.exports = [
    {
        source: './dist',
        target: './dep'
    },
    {
        source: './dist/index.html',
        target: './dep/index.jsp',
        replace: [
            { pattern: 'static/', replacement: '../../static/' },
            { pattern: 'dll/', replacement: '../../static/dll/' },
        ]
    }
];
