const path = require('path');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const bfj = require('bfj');

const config = require('./config');
function refactorAndCopyToRootWeb(isJsfile) {
    const lstFolderName = ["js", "css"];
    for (const subFolder of lstFolderName) {
        const extension = subFolder;
        const path = `${config.appBuild}\\static\\${subFolder}`;
        console.log(`start rename ${subFolder} file`);

        fs.readdir(path, (e, files) => {
            if (e) {
                console.log(e)
                return;
            }
            var mainFiles = files.filter(m => m.startsWith('main'));
            if (mainFiles) {
                for (const mainFile of mainFiles) {
                    const fileName = mainFile.split(`.${extension}`)[0];
                    console.log(`${path}\\main.${extension}`, `${path}\\${mainFile}`);
                    fs.rename(`${path}\\${mainFile}`, `${path}\\${mainFile.replace(fileName, 'main')}`)
                }

            }
        });
    }


}

function writeDateBuild() {
    console.log('write status to build-date.json');
    return bfj.write(config.buildDate, Date.now())
}

function copyToRootWeb() {
    console.log('empty root folder');
    fs.emptyDirSync(config.rootFolder);
    console.log('copy to root folder');
    fs.copySync(config.appAsset, config.rootFolder, {
        dereference: true,
        filter: file => file !== config.appHtml,
    });

}

function runAdditionalAction() {
    refactorAndCopyToRootWeb();

    writeDateBuild().then(() => {
        copyToRootWeb();
    })

}

runAdditionalAction();