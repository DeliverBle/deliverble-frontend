import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector: string;
}

function Portal(props: PortalProps) {
  const { children, selector } = props;
  const element = typeof window !== 'undefined' && document.querySelector(selector);
  return element && children ? createPortal(children, element) : null;
}

export default Portal;
