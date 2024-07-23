import { IDockviewPanelProps } from '@lingsquare/dockview';
import React from 'react'

const Test = () => {
    console.log('server')
    return (
        <div style={{ padding: '20px' }}>
            <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab obcaecati doloribus nemo sed? Voluptates, voluptate quibusdam totam, iusto rerum odio optio, a ea voluptatum sit ipsum inventore excepturi? Voluptates, in?
            </div>
        </div>
    )
}

export const components = {
    default: (props: IDockviewPanelProps<{ title: string }>) => {
        return (
            <Test />
        );
    },
};


export default Test