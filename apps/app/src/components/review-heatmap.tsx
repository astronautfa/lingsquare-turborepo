'use client'

import React from 'react'
import ActivityCalendar from '@lingsquare/heatmap'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@ui/components"

import { useTheme } from 'next-themes'

const data = [
    {
        date: "2024-01-01",
        count: 16,
        level: 3
    },
    {
        date: "2024-05-20",
        count: 16,
        level: 3
    },
    {
        date: "2024-07-20",
        count: 16,
        level: 1
    },
    {
        date: "2024-08-20",
        count: 16,
        level: 2
    },
    {
        date: "2024-09-15",
        count: 16,
        level: 3
    },
    {
        date: "2024-10-10",
        count: 16,
        level: 1
    },
    {
        date: "2024-08-12",
        count: 16,
        level: 2
    },
    {
        date: "2024-09-14",
        count: 16,
        level: 3
    },
    {
        date: "2024-11-16",
        count: 16,
        level: 1
    },
    {
        date: "2024-12-16",
        count: 16,
        level: 1
    }
]

const ReviewHeatmap = () => {

    const { theme } = useTheme();

    return (
        <div className='flex justify-center items-center mt-4'>
            <ActivityCalendar data={data} showWeekdayLabels colorScheme={theme === 'dark' ? 'dark' : 'light'} renderBlock={(block, activity) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        {block}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{`${activity.count} activities on ${activity.date}`}</p>
                    </TooltipContent>
                </Tooltip>
            )} />
        </div>
    )
}

export default ReviewHeatmap