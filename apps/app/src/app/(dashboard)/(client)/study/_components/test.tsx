import { IDockviewPanelProps } from '@lingsquare/dockview';
import React from 'react'

const Test = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab obcaecati doloribus nemo sed? Voluptates, voluptate quibusdam totam, iusto rerum odio optio, a ea voluptatum sit ipsum inventore excepturi? Voluptates, in?
            </div>
        </div>
    )
}


const Test2 = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt facilis natus veritatis quos impedit a temporibus neque adipisci, aliquam consequatur fugiat nam accusamus laudantium! Maxime nobis illum laboriosam nam numquam?
            </div>
            <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt facilis natus veritatis quos impedit a temporibus neque adipisci, aliquam consequatur fugiat nam accusamus laudantium! Maxime nobis illum laboriosam nam numquam?
            </div>
            <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt facilis natus veritatis quos impedit a temporibus neque adipisci, aliquam consequatur fugiat nam accusamus laudantium! Maxime nobis illum laboriosam nam numquam?
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
    default2: (props: IDockviewPanelProps<{ title: string }>) => {
        return (
            <Test2 />
        );
    },
};


export default Test