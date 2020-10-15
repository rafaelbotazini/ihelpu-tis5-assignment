import React from 'react';
import { IconBaseProps } from 'react-icons';
import { LinkProps } from 'react-router-dom';
import { Link } from './styles';

interface BottomLinkProps extends LinkProps {
  to: string;
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const BottomLink: React.FC<BottomLinkProps> = ({
  to,
  name,
  icon: Icon,
  ...rest
}) => {
  return (
    <Link to={to} {...rest}>
      {<Icon />}
      {name}
    </Link>
  );
};

export default BottomLink;
