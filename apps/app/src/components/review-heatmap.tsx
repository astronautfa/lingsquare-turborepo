'use client'

import React from 'react'
import ActivityCalendar from '@lingsquare/heatmap'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@ui/components/tooltip"

const data = [
    {
        date: "2024-05-20",
        count: 16,
        level: 3
    },
    {
        date: "2024-03-20",
        count: 16,
        level: 1
    },
    {
        date: "2024-06-20",
        count: 16,
        level: 2
    }
]

const ReviewHeatmap = () => {
    return (
        <div className=''>
            <ActivityCalendar data={data} loading showWeekdayLabels colorScheme='light' />
        </div>
    )
}

export default ReviewHeatmap