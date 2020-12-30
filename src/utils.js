const child_process = require('child_process');
const fs   = require('fs');

module.exports.isHttps = function(url) {
  return /^https?:\/\/.+/.test(url)
}

module.exports.isHttp = function(url) {
  return /^http?:\/\/.+/.test(url)
}

module.exports.genModel = function(configPath, resolve) {
  // delDir(autorestConfig['output-folder'] + '/' + autorestConfig['source-code-folder-path']);
  
  child_process.exec('npx autorest ' + configPath, (error, stdout, stderr) => {
    // 删除掉生成的autorest配置文件
    fs.unlink(configPath, () => {});
    
    if(error) {
      console.error('error: ' + error);
      return;
    }
    
    console.log(stdout);
    console.log(`model生成成功！`);
    
    resolve && resolve();
  })
}
