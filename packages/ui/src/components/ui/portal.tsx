import * as RadixPortal from '@radix-ui/react-portal';

interface PortalProps {
    parent: Element | null | undefined;
    children: React.ReactNode;
}

const Portal = ({ parent, children }: PortalProps) => <RadixPortal.Root container={parent}>{children}</RadixPortal.Root>;

export { Portal }