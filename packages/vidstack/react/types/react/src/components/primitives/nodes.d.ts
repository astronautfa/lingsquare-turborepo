import * as React from 'react';
declare const NODES: readonly ["button", "div", "span", "img", "video", "audio"];
export declare const Primitive: Primitives;
type PropsWithoutRef<P> = P extends any ? 'ref' extends keyof P ? Pick<P, Exclude<keyof P, 'ref'>> : P : P;
export type ComponentPropsWithoutRef<T extends React.ElementType> = PropsWithoutRef<React.ComponentProps<T>>;
type Primitives = {
    [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>;
};
export type PrimitivePropsWithRef<E extends React.ElementType> = Omit<React.ComponentProps<E>, 'style'> & React.Attributes & {
    asChild?: boolean;
    style?: React.CSSProperties | (React.CSSProperties & Record<`--${string}`, string | null | undefined>) | undefined;
};
interface PrimitiveForwardRefComponent<E extends React.ElementType> extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {
}
export {};
