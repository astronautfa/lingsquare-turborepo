import * as React from 'react';
interface DefaultTimeGroupSlots {
    currentTime?: React.ReactNode;
    timeSeparator?: React.ReactNode;
    endTime?: React.ReactNode;
}
declare function DefaultTimeGroup({ slots }: {
    slots?: DefaultTimeGroupSlots;
}): React.JSX.Element | null;
declare namespace DefaultTimeGroup {
    var displayName: string;
}
export { DefaultTimeGroup };
interface DefaultTimeInfoSlots extends DefaultTimeGroupSlots {
    liveButton?: React.ReactNode;
}
declare function DefaultTimeInfo({ slots }: {
    slots?: DefaultTimeInfoSlots;
}): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
declare namespace DefaultTimeInfo {
    var displayName: string;
}
export { DefaultTimeInfo };
declare function DefaultTimeInvert({ slots }: {
    slots?: DefaultTimeInfoSlots;
}): React.ReactNode;
declare namespace DefaultTimeInvert {
    var displayName: string;
}
export { DefaultTimeInvert };
