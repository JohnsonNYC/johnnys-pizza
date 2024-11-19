
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  children: React.ReactNode;
  wrapperId: string;
}

const ReactPortal: React.FC<ReactPortalProps> = ({ children, wrapperId }) => {
  const [element, setElement] = useState < HTMLElement | null > (null);

  useEffect(() => {
    const el = document.getElementById(wrapperId);
    setElement(el);
  }, [wrapperId])

  if (!element) return null;

  return createPortal(children, element);
}

export default ReactPortal;
