const { compile } = require('riot-compiler');
const {Asset} = require('parcel-bundler');
const preamble = "const riot = require('riot');\n";

class RiotAsset extends Asset {
  type = 'js';

  async parse(inputCode) {
    const riotOpts = {};
    let code = compile(inputCode, riotOpts, this.name);
    code = `${ preamble }${ code }`;
    this.contents = code;
  }
  
  async generate() {
    // Send to JS bundler
    return {
      'js': `module.exports = \`${this.contents}\``
    };
  }
}

module.exports = RiotAsset;
