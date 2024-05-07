import { ComponentProps, FC } from 'react';

import Svg from 'react-inlinesvg';

type IconProps = Omit<ComponentProps<typeof Svg>, 'src'> & {
  icon?: {
    svg?: string | null;
  };
};


export const SanityIcon: FC<IconProps> = ({ icon, ...props }) => {
  const { svg } = icon ?? {};
  if (!svg) return <></>;
  return <Svg {...props} src={svg} />;
};
