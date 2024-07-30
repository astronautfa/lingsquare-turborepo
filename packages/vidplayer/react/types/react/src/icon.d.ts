import * as React from 'react';
export interface IconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>, React.RefAttributes<SVGElement | SVGSVGElement> {
    /**
     * The horizontal (width) and vertical (height) length of the underlying `<svg>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height}
     */
    size?: number;
    part?: string;
    /** @internal */
    paths?: string;
}
export interface IconComponent extends React.ForwardRefExoticComponent<IconProps> {
}
declare const Icon: IconComponent;
export { Icon };
