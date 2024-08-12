'use client'

import React from "react";
import ActivityCalendar from '@lingsquare/heatmap'

import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@ui/components"

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

const data2 = [
    {
        date: "2024-06-20",
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

const LandingProgressHeatmap = () => {

    return (
        <TooltipProvider>
            <div className='relative md:px-6 px-4 py-3 flex justify-center items-center h-40' >
                <div className='absolute hidden lg:flex mt-14'>
                    <ActivityCalendar data={data} showWeekdayLabels colorScheme='light' renderBlock={(block, activity) => (
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
                <div className='absolute flex lg:hidden'>
                    <ActivityCalendar data={data2} showWeekdayLabels colorScheme='light' renderBlock={(block, activity) => (
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
            </div>
        </TooltipProvider>
    )
}


export default LandingProgressHeatmap