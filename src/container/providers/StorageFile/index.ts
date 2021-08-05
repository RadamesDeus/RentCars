import { container } from 'tsyringe';

import DiskStorage from './implements/DiskStorage';
import IStorageFile from './IStorageFile';

container.registerSingleton<IStorageFile>('StorageFile', DiskStorage);
