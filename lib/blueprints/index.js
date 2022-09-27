/*
    when writing different types of files, such as .js & .json, 
    do name.split(".")

    maybe search the root dir for a config.js file and use this module's config as defualt.

    maybe copy the defualt config onbejct to the root dir for user to edit, and add 
    scripts to package.json to re-run this module and apply edits.
*/

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
