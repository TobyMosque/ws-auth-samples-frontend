import { discard } from 'src/utils';

export type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;
export const cookieStorage: StorageLike = {
  getItem(key: string) {
    discard({ key });
    return '';
  },
  setItem(key: string, value: string) {
    discard({ key, value });
    return;
  },
};
