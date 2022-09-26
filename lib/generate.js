const { join } = require("path");
const fs = require("fs");

async function generate(b, currentPath) {
    await Promise.all(
        b.map(async (file) => {
            const filePath = join(currentPath);
            if (file.type === "directory") {
                const dirPath = join(currentPath, file.name);

                await processDir(file, dirPath);
                if (file.subFiles) {
                    await Promise.all(
                        file.subFiles.map(async (subFile) => {
                            currentPath += subFile.name;
                            await processFile(subFile, dirPath);
                        })
                    );
                }
                if (file.subDirectories && file.subDirectories.length) {
                    await generate(file.subDirectories, dirPath);
                }
                return;
            } else {
                await processFile(file, filePath);
                return;
            }
        })
    );
}

async function processFile(file, filePath) {
    if (!file) return;
    if (!file.name.includes(".")) {
        throw new Error(`file name ${file.name} must include a '.'`);
    }
    console.log("ProcessFile :: received path ::", filePath, file.name);

    const srcFileLocation = join(filePath, "file-content", file.name);
    console.log("test path!", srcFileLocation);

    console.log(
        `ProcessFile :: Creating read stream for : ${file.name} \nfrom template path : ${srcFileLocation}`
    );

    const fileReadStream = fs.createReadStream(filePath, file.name);

    const fileWriteStream = fs.createWriteStream(join(filePath, file.name), {
        flags: "w",
    });

    fileReadStream.on("error", (e) => {
        console.log(
            `Error in the fileReadStream line 39 relating to ${
                (filePath, file.name)
            }`
        );
        console.error(e.message);
    });

    fileWriteStream.on("error", (e) => {
        console.log(
            `Error in the fileWriteStream line 43 relating to ${
                (filePath, file.name)
            }`
        );
        console.error(e.message);
    });

    fileReadStream.pipe(fileWriteStream);
    fileWriteStream.end();
}

async function processDir(file, filePath) {
    if (!file) return;
    console.log(
        `\nProcessDir :: received file : ${JSON.stringify(
            file
        )}\n and filePath : ${JSON.stringify(filePath)}\n`
    );

    await fs.promises.mkdir(filePath, {
        recursive: true,
    });

    console.log(`ProcessDir :: Created ${filePath} successfully`);
}

module.exports = { generate, processFile, processDir };
