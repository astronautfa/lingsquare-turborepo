'use client'

import {
    DockviewApi,
    DockviewDndOverlayEvent,
    DockviewDidDropEvent,
    DockviewReact,
    DockviewReadyEvent,
    IDockviewPanelProps,
    positionToDirection,
} from '@lingsquare/dockview';
import { useEffect, useState } from 'react';
// import Test from './_components/test';
import { useTheme } from "next-themes"
import { components } from "./_components/test"

const DraggableElement = () => (
    <span
        tabIndex={-1}
        onDragStart={(event) => {
            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';

                event.dataTransfer.setData('text/plain', 'nothing');
            }
        }}
        style={{
            backgroundColor: 'orange',
            padding: '0px 8px',
            borderRadius: '4px',
            width: '100px',
            cursor: 'pointer',
        }}
        draggable={true}
    >
        Drag me into the dock
    </span>
);

const DndDockview = (props: { renderVisibleOnly: boolean; theme?: string }) => {
    const [api, setApi] = useState<DockviewApi>();

    const { theme } = useTheme();

    useEffect(() => {
        if (!api) {
            return;
        }

        api.addPanel({
            id: 'panel_1',
            component: 'default',
            params: {
                title: 'Panel 1',
            },
        });

        api.addPanel({
            id: 'panel_2',
            component: 'default',
            params: {
                title: 'Panel 2',
            },
        });

        api.addPanel({
            id: 'panel_3',
            component: 'default',
            params: {
                title: 'Panel 3',
            },
        });

        api.addPanel({
            id: 'panel_4',
            component: 'default2',
            params: {
                title: 'Panel 4',
            },
            position: { referencePanel: 'panel_1', direction: 'right' },
        });

        const panelDragDisposable = api.onWillDragPanel((event) => {
            const { dataTransfer } = event.nativeEvent;

            if (dataTransfer) {
                dataTransfer.setData(
                    'text/plain',
                    'Some custom panel data transfer data'
                );
                dataTransfer.setData(
                    'text/json',
                    '{text: "Some custom panel data transfer data"}'
                );
            }
        });

        const groupDragDisposable = api.onWillDragGroup((event) => {
            const { dataTransfer } = event.nativeEvent;

            if (dataTransfer) {
                dataTransfer.setData(
                    'text/plain',
                    'Some custom group data transfer data'
                );
                dataTransfer.setData(
                    'text/json',
                    '{text: "Some custom group data transfer data"}'
                );
            }
        });

        return () => {
            panelDragDisposable.dispose();
            groupDragDisposable.dispose();
        };
    }, [api]);

    const onReady = (event: DockviewReadyEvent) => {
        setApi(event.api);
    };

    const onDidDrop = (event: DockviewDidDropEvent) => {
        event.api.addPanel({
            id: 'test',
            component: 'default',
            position: {
                direction: positionToDirection(event.position),
                referenceGroup: event.group || undefined,
            },
        });
    };

    const showDndOverlay = (event: DockviewDndOverlayEvent) => {
        return true;
    };

    const onDrop = (event: React.DragEvent) => {
        const { dataTransfer } = event;

        let text = 'The following dataTransfer data was found:\n';

        for (let i = 0; i < dataTransfer.items.length; i++) {
            const item = dataTransfer.items[i];
            if (item) {
                const value = dataTransfer.getData(item.type);
                text += `type=${item.type},data=${value}\n`;
            }
        }

        alert(text);
    };

    return (
        <div
            className='h-[calc(100vh-4rem)] lg:h-[calc(100vh-22px)]'
            style={{
                zIndex: 0,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}
        >
            {/* <div style={{ margin: '2px 0px' }}>
                <DraggableElement />
                <div
                    style={{
                        padding: '0px 4px',
                        backgroundColor: 'black',
                        borderRadius: '2px',
                        color: 'white',
                    }}
                    onDrop={onDrop}
                >
                    Drop a tab or group here to inspect the attached metadata
                </div>
            </div> */}
            <DockviewReact
                components={components}
                onReady={onReady}
                className={theme === 'dark' ? 'dockview-theme-dark' : 'dockview-theme-light'}
                onDidDrop={onDidDrop}
                showDndOverlay={showDndOverlay}
                rootOverlayModel={{
                    size: { value: 100, type: 'pixels' },
                    activationSize: { value: 5, type: 'percentage' },
                }}
            />
        </div>
    );
};

export default DndDockview;
