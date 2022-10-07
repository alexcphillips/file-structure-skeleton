exports.blueprint = [
    {
        name: ".env.dev",
        type: "file",
    },
    {
        name: "database",
        type: "directory",
        subFiles: [
            {
                name: "index.js",
                type: "file",
            },
            {
                name: "operations.js",
                type: "file",
            },
        ],
        subDirectories: [],
    },
    {
        name: "server",
        type: "directory",
        subFiles: [
            {
                name: "app.js",
                type: "file",
            },
            {
                name: "index.js",
                type: "file",
            },
        ],
        subDirectories: [
            {
                name: "routes",
                type: "directory",
                subFiles: [
                    {
                        name: "index.js",
                        type: "file",
                    },
                    {
                        name: "utility.js",
                        type: "file",
                    },
                ],
                subDirectories: [],
            },
        ],
    },
];
