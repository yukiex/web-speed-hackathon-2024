// src/pages/TopPage/internal/HeroImage.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// 事前にプリレンダリングした画像のURL
const PRE_RENDERED_IMAGE_SRC = '/assets/heloImage.webp';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image != null) {
      // プリレンダリングされた画像を直接設定
      image.src = PRE_RENDERED_IMAGE_SRC;
    }
  }, []);

  return (
    <_Wrapper>
      {/* 事前にレンダリングされた画像を表示 */}
      <_Image ref={imageRef} alt="Cyber TOON" />
    </_Wrapper>
  );
};
