import { useCallback } from 'react';

import useLocale from '@onekeyhq/components/src/Provider/hooks/useLocale';

import { selectTranslations } from '../store/selectors';
import { getDefaultLocale } from '../utils/locale';

import { useAppSelector } from './redux';

function useKey() {
  const { locale } = useLocale();
  return locale === 'system' ? getDefaultLocale() : locale;
}

export function useTranslation() {
  const key = useKey();
  const context = useAppSelector(selectTranslations);
  const t = useCallback(
    (id?: string) => {
      if (!id) {
        return undefined;
      }
      const result = context?.[key]?.[id];
      return result || undefined;
    },
    [context, key],
  );
  return t;
}
