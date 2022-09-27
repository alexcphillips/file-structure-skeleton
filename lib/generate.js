const { join } = require("path");
const fs = require("fs");

async function generate(b, currentPath = "/") {
    await Promise.all(
        b.map(async (file) => {
            let filePath = currentPath;
            const dirPath = join(filePath, file.name);

            console.log(
                "generate :: filepath:",
                filePath,
                "\ndirpath:",
                dirPath
            );

            if (file.type === "directory") {
                await processDir(file, dirPath);
                if (file.subFiles) {
                    await Promise.all(
                        file.subFiles.map(async (subFile) => {
                            filePath = join(filePath, subFile.name);
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

async function processFile(file, filePath = "") {
    if (!file) return;
    if (!file.name.includes(".")) {
        throw new Error(`file name ${file.name} must include a '.'`);
    }
    console.log("processDir :: filePath : " + filePath);

    const srcFileLocation = join(
        __dirname,
        "file-content",
        filePath,
        file.name
    );

    console.log(
        `ProcessFile :: Creating read stream for file : ${file.name} \nfrom template path : ${srcFileLocation}`
    );
    console.log("****** ", join(__dirname, "/../", filePath, file.name));
    const fileReadStream = fs.createReadStream(srcFileLocation);
    const fileWriteStream = fs.createWriteStream(
        join(__dirname, "/../", filePath, file.name),
        {
            flags: "w",
        }
    );

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

    fileReadStream.pipe(fileWriteStream).on("end", fileWriteStream.end);
}

async function processDir(file, filePath) {
    if (!file) return;
    console.log(
        `\nProcessDir :: received file : ${JSON.stringify(
            file
        )}\n and filePath : ${JSON.stringify(filePath)}\n`
    );
    const fullPath = join(__dirname, "/../", filePath);

    await fs.promises.mkdir(fullPath, {
        recursive: true,
    });

    console.log(`ProcessDir :: Created ${fullPath} successfully`);
}

module.exports = { generate, processFile, processDir };
