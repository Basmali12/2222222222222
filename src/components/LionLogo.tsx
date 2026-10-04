import React from 'react';
import { RajaaLogo, RajaaLogoProps } from './RajaaLogo';

export interface LionLogoProps extends RajaaLogoProps {}

/**
 * LionLogo alias pointing to the official Al-Rajaa Football Club crest (with pure transparent background)
 */
export const LionLogo: React.FC<LionLogoProps> = (props) => {
  return <RajaaLogo {...props} />;
};

export { RajaaLogo };
