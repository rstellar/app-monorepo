import React from 'react';

import { FlashList } from '@shopify/flash-list';

import type {
  FlashListProps,
  ListRenderItem as FlashListRenderItem,
} from '@shopify/flash-list/src/FlashListProps';
import type { IBoxProps } from 'native-base';

export type FlatListProps<T = unknown> = FlashListProps<T> & IBoxProps;

// @ts-ignore
FlashList.defaultProps = {
  // @ts-ignore
  testID: 'FlashList-default',
  // @ts-ignore
  ...(FlashList.defaultProps || {}),
};

export default FlashList;

export const FlatListRef = FlashList;
export type ListRenderItem<T = unknown> = FlashListRenderItem<T>;
