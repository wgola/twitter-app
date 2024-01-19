const imagekit = require('../config/imagekit.config');

const fileToBase64 = (file) => {
  return file.data.toString('base64');
};

const saveFile = async (file, fileName, folder) => {
  try {
    const response = await imagekit.upload({
      file: fileToBase64(file),
      fileName,
      folder
    });

    return { url: response.url, id: response.fileId };
  } catch (error) {
    throw new Error('Error uploading file!');
  }
};

const deleteFile = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    throw new Error('Error deleting file!');
  }
};

module.exports = { saveFile, deleteFile };
