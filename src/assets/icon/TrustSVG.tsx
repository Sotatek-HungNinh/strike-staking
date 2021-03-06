import React from "react";

interface Props {
    size?: 'xl' | 'lg' | 'md' | 'sm';
  }

const TrustSVG: React.FC<Props> = ({ size = 'md' }: Props) => {
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
            <use xlinkHref="#image0_20_359" transform="scale(0.00390625)" />
          </pattern>
          <image
            id="image0_20_359"
            width="256"
            height="256"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
  );
};
export default TrustSVG;
