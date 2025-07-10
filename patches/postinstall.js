import fs from 'fs';
import path from 'path';

copyFileSync('./patches/BlogHomeTags.vue', './node_modules/@sugarat/theme/src/components/BlogHomeTags.vue');
copyFileSync('./patches/BlogHomeInfo.vue', './node_modules/@sugarat/theme/src/components/BlogHomeInfo.vue');

function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
