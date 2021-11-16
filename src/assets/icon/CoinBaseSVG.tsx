import React from 'react';

interface Props {
  size?: 'xl' | 'lg' | 'md' | 'sm';
}

const CoinBaseSVG: React.FC<Props> = ({ size = 'md' }: Props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="100" height="100" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_22_380" transform="scale(0.00392157)" />
        </pattern>
        <image
          id="image0_22_380"
          width="255"
          height="255"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
export default CoinBaseSVG;