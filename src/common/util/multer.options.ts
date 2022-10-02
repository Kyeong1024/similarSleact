import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const createFolder = () => {
  try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.error('파일이 없습니다. need to produce folder');
    fs.mkdirSync(path.join(__dirname, '..', 'uploads'));
  }
};

export const storage = () => {
  createFolder();

  multer.diskStorage({
    destination: function (req, file, cb) {
      const folderLoaction = path.join(__dirname, '..', 'uploads');
      cb(null, folderLoaction);
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        extension,
      )}-${Date.now()}${extension}}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = () => {
  const result: MulterOptions = {
    storage: storage(),
  };

  return result;
};
