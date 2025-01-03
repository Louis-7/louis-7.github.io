import * as AntdIcons from '@ant-design/icons';
import './Icon.css';

const allIcons: {
  [key: string]: any;
} = AntdIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: keyof typeof AntdIcons;
}

export function Icon({ type, ...props }: IconProps) {
  const Component = allIcons[type];

  if (!Component) {
    return null;
  }
  return <Component {...props} />;
}
