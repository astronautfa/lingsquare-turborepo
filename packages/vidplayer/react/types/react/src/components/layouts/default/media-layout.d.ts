import * as React from 'react';
import { type DefaultLayoutTranslations, type FileDownloadInfo, type MediaPlayerQuery, type MediaStreamType, type ThumbnailSrc } from 'vidstack';
import type { PrimitivePropsWithRef } from '../../primitives/nodes.jsx';
import type { DefaultLayoutIcons } from './icons.jsx';
export interface DefaultLayoutProps<Slots = unknown> extends PrimitivePropsWithRef<'div'> {
    children?: React.ReactNode;
    /**
     * The icons to be rendered and displayed inside the layout.
     */
    icons: DefaultLayoutIcons;
    /**
     * Whether light or dark color theme should be active. Defaults to user operating system
     * preference.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme}
     */
    colorScheme?: 'light' | 'dark' | 'system' | 'default';
    /**
     * Sets the download URL and filename for the download button.
     */
    download?: FileDownloadInfo;
    /**
     * Specifies the number of milliseconds to wait before tooltips are visible after interacting
     * with a control.
     *
     * @defaultValue 700
     */
    showTooltipDelay?: number;
    /**
     * Specifies the number of milliseconds to wait before menus are visible after opening them.
     *
     * @defaultValue 0
     */
    showMenuDelay?: number;
    /**
     * Whether the bitrate should be hidden in the settings quality menu next to each option.
     *
     * @defaultValue false
     */
    hideQualityBitrate?: boolean;
    /**
     * Determines when the small (e.g., mobile) UI should be displayed.
     *
     * @defaultValue `({ width, height }) => width < 576 || height < 380`
     */
    smallLayoutWhen?: boolean | MediaPlayerQuery;
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/wc/player/core-concepts/loading#thumbnails}
     */
    thumbnails?: ThumbnailSrc;
    /**
     * Translation map from english to your desired language for words used throughout the layout.
     */
    translations?: Partial<DefaultLayoutTranslations> | null;
    /**
     * A document query selector string or `HTMLElement` to mount menus inside.
     *
     * @defaultValue `document.body`
     */
    menuContainer?: string | HTMLElement | null;
    /**
     * Specifies whether menu buttons should be placed in the top or bottom controls group. This
     * only applies to the large video layout.
     */
    menuGroup?: 'top' | 'bottom';
    /**
     * Disable audio boost slider in the settings menu.
     */
    noAudioGain?: boolean;
    /**
     * The audio gain options to be displayed in the settings menu.
     */
    audioGains?: number[] | {
        min: number;
        max: number;
        step: number;
    };
    /**
     * Whether modal menus should be disabled when the small layout is active. A modal menu is
     * a floating panel that floats up from the bottom of the screen (outside of the player). It's
     * enabled by default as it provides a better user experience for touch devices.
     */
    noModal?: boolean;
    /**
     * Whether to disable scrubbing by touch swiping left or right on the player canvas.
     */
    noScrubGesture?: boolean;
    /**
     * The minimum width of the slider to start displaying slider chapters when available.
     */
    sliderChaptersMinWidth?: number;
    /**
     * Whether the time slider should be disabled.
     */
    disableTimeSlider?: boolean;
    /**
     * Whether all gestures such as press to play or seek should not be active.
     */
    noGestures?: boolean;
    /**
     * Whether keyboard actions should not be displayed.
     */
    noKeyboardAnimations?: boolean;
    /**
     * The playback rate options to be displayed in the settings menu.
     */
    playbackRates?: number[] | {
        min: number;
        max: number;
        step: number;
    };
    /**
     * The number of seconds to seek forward or backward when pressing the seek button or using
     * keyboard shortcuts.
     */
    seekStep?: number;
    /**
     * Provide additional content to be inserted in specific positions.
     */
    slots?: Slots;
}
export interface CreateDefaultMediaLayout {
    type: 'audio' | 'video';
    smLayoutWhen: MediaPlayerQuery;
    renderLayout: (props: {
        streamType: MediaStreamType;
        isLoadLayout: boolean;
        isSmallLayout: boolean;
    }) => React.ReactNode;
}
export declare function createDefaultMediaLayout({ type, smLayoutWhen, renderLayout, }: CreateDefaultMediaLayout): React.ForwardRefExoticComponent<Omit<DefaultLayoutProps<unknown>, "ref"> & React.RefAttributes<HTMLDivElement>>;
