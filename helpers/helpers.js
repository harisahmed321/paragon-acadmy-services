const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');
var path = require('path');

upperCapitalizeFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

randomNumbers = () => {
  return (Math.floor(Math.random() * 90000) + 10000).toString().substring(1);
};

writePngFile = async (source) => {
  const uuidFileName = `${uuidv4()}.png`;
  const base64 = source.split(',')[1];
  const uploadPath = path.join(__dirname, `../public/uploads/${uuidFileName}`);
  const fs_writeFile = util.promisify(fs.writeFile);
  return await fs_writeFile(uploadPath, base64, {
    encoding: 'base64',
  })
    .then(() => {
      console.log('File created');
      return uuidFileName;
      amenity.source = uuidFileName;
      amenity.isBase64 = false;
    })
    .catch((error) => {
      throw new Error('Amenity source not convert to image');
    });
};

getFileUrlPath = (uuidFileName, req) => {
  let domain = '';
  if (req.headers.host === 'localhost:8080') {
    domain = `http://${req.headers.host}`;
  } else {
    domain = `https://${req.headers.host}`;
  }
  return `${domain}/uploads/${uuidFileName}`;
};

module.exports = {
  upperCapitalizeFirst,
  randomNumbers,
  writePngFile,
  getFileUrlPath,
};
