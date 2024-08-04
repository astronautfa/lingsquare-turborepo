'use client'

import CalHeatmap from 'heatmap'
import 'heatmap/heatmap.css';
import { useLayoutEffect } from 'react';

export default function Cal() {

    const cal: CalHeatmap = new CalHeatmap();

    useLayoutEffect(() => {
        cal.on('mouseover', (event: MouseEvent, timestamp: string | number | Date, value: string) => {
            console.log(
                'On <b>' +
                new Date(timestamp).toLocaleDateString() +
                '</b>, the max temperature was ' +
                value +
                '°C' + event.clientX + " " + event.clientY
            );
        });
        cal.paint({
            theme: 'light',
            itemSelector: '#review-heatmap',
            animationDuration: 0,
            date: { start: new Date('2012-01-01') },
            range: 12,
            scale: {
                color: {
                    type: 'threshold',
                    range: ['#14432a', '#166b34', '#37a446', '#4dd05a'],
                    domain: [10, 20, 30],
                },
            },
            domain: {
                type: 'month',
                gutter: 4,
                label: { text: 'MMM', textAlign: 'start', position: 'top' },
            },
            subDomain: { type: 'ghDay', radius: 2, width: 11, height: 11, gutter: 4 },
        });
    })

    return (
        <>
            <div id="review-heatmap" className='flex justify-center items-center '></div>
            <div></div>
        </>
    )
}
