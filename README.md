## Steps to Upgrade SPFx Solutions

Check if Folder Structure has changed

Add to package.json scripts section

"update-spfx": "npm install @microsoft/sp-client-base@latest @microsoft/sp-client-preview@latest --save & npm install @microsoft/sp-build-web@latest @microsoft/sp-module-interfaces@latest @microsoft/sp-webpart-workbench@latest @microsoft/sp-office-ui-fabric-core --save-dev & npm prune & npm dedupe & gulp nuke & gulp"

use:

npm run update-spfx

## Rebuild node sass

npm rebuild node-sass

## Compatibility

Tested with [Node.js Version 6.10.3 LTS](https://nodejs.org/download/release/v6.10.3/node-v6.10.3-x64.msi)

## Docker Support

Download [SPFx Docker Images](https://github.com/waldekmastykarz/docker-spfx)