const { imagekit, LOG } = require('../config');

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
    LOG.error(error.message);

    throw new Error(`Error uploading file: ${error.message}`);
  }
};

const deleteFile = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error deleting file: ${error.message}`);
  }
};

module.exports = { saveFile, deleteFile };
