const execSync = require('child_process').execSync;
const { readFileSync, writeFileSync, renameSync, rmSync, copyFileSync } = require('fs');

/**
 * Standard Ftb prepare-release script should be started with following environment variables:
 * 1. PROJECT_VERSION - release version
 * 2. [optional] PROJECT_IMAGE - docker image name (if project supports docker distribution)
 */
const version = process.env.PROJECT_VERSION;
const image = process.env.PROJECT_IMAGE;

if (!version || !image) {
  throw new Error('Please provide PROJECT_VERSION and PROJECT_IMAGE to run "prepare-release" script');
}

console.log(`{{projectName}}: Preparing release for image '${image}' version ${version} `);

const dockerEnvFilePath = __dirname + '/../src/environments/environment.docker.ts';
const tempEnvFilePath = __dirname + '/../src/environments/environment.temp.ts';
const envFilePath = __dirname + '/../src/environments/environment.ts';
const dockerEnv = readFileSync(dockerEnvFilePath).toString();
const currentVersion = dockerEnv.match(new RegExp("versionNumber: '(.*)'"))[1];
const currentDate = dockerEnv.match(new RegExp("versionDate: '(.*)'"))[1];
const newDate = Math.floor(new Date().getTime() / 1000);
const updatedDockerEnv = dockerEnv
  .replace(`versionNumber: '${currentVersion}'`, `versionNumber: '${version}'`)
  .replace(`versionDate: '${currentDate}'`, `versionDate: '${newDate}'`);
writeFileSync(dockerEnvFilePath, updatedDockerEnv);

renameSync(envFilePath, tempEnvFilePath);
copyFileSync(dockerEnvFilePath, envFilePath);
try {
  const type = image.split('-')[1];
  rmSync(__dirname + '/../www', { recursive: true, force: true });
  execSync(` docker build -f Dockerfile.build -t ffspb-builder .`, { stdio: [0, 1, 2] });
  execSync(` docker build -f Dockerfile.${type} -t ${image}:${version} .`, { stdio: [0, 1, 2] });
} finally {
  renameSync(tempEnvFilePath, envFilePath);
}
