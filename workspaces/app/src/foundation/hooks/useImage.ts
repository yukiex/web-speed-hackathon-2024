import { useMemo } from 'react';

import { getImageUrl } from '../../lib/image/getImageUrl';

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  const imageUrl = useMemo(() => getImageUrl({
    format: 'jpg',
    height,
    imageId,
    width,
  }), [height, imageId, width]);

  return imageUrl;
};
