import { ZxcvbnFactory } from '@zxcvbn-ts/core';
import * as zxcvbnCommon from '@zxcvbn-ts/language-common';
import * as zxcvbnEn from '@zxcvbn-ts/language-en';

const zxcvbn = new ZxcvbnFactory({
  dictionary: {
    ...zxcvbnCommon.dictionary,
    ...zxcvbnEn.dictionary,
  },
  graphs: zxcvbnCommon.adjacencyGraphs,
  translations: zxcvbnEn.translations,
});

export const MIN_PASSWORD_SCORE = 2;

export const getPasswordScore = (
  password: string,
  userInputs: string[] = [],
): number => {
  return zxcvbn.check(password, userInputs).score;
};
