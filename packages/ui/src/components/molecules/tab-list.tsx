'use client'

import { Fragment, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@ui/lib/utils"

const tabs = [
    { label: 'tab 1', type: 'book', key: 1 },
    { label: 'tab 2', type: 'book', key: 2 },
    { label: 'tab 3', type: 'book', key: 3 },
    { label: 'tab 4', type: 'book', key: 4 },
    { label: 'tab 5', type: 'book', key: 5 }
]

const TabList = () => {

    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(1)
    const [tabsList, setTabsList] = useState<{
        label: string,
        type: string,
        key: number
    }[]>(tabs)

    // TODO : fix tab behaviour
    const removeTab = (removeKey: number) => {
        setTabsList((prev) => {
            if (prev.length > 1) {
                setSelectedTabIndex(tabsList.length - 2)
                return prev.filter((tab) => tab.key !== removeKey)
            } else {
                setSelectedTabIndex(0)
                return prev
            }
        })
    }

    return (
        <div className='flex ml-2 transition-colors duration-150'>

            {tabsList.map((tab, index) => {
                if (index !== selectedTabIndex) {
                    return (
                        <div onClick={() => setSelectedTabIndex(index)} className={cn('flex items-center justify-between w-[120px] rounded-md -mb-[10px] h-[30px] z-10 px-3 mt-1.5 text-muted-foreground text-sm cursor-pointer group hover:bg-primary/10',
                            selectedTabIndex === index - 1 && '-ml-2',
                            selectedTabIndex === index + 1 && '-mr-2',
                            index === 0 && 'ml-2'
                        )}>
                            <div className='group-hover:text-primary text-sm'>{tab.label}</div>
                        </div>
                    )
                } else {
                    return (
                        <Fragment>
                            <div className='w-3 h-[32px]'>
                                <div className='bg-background dark:bg-zinc-900 absolute w-3 h-[30px] mt-[10px]'>
                                </div>
                                <div className='bg-zinc-100 dark:bg-background absolute w-3 h-[30px] mt-[10px] rounded-br-sm border-b border-r'>
                                </div>
                            </div>
                            <div className='flex items-center pb-1 justify-between border-t w-[120px] rounded-t-sm bg-background dark:bg-zinc-900 -mb-[14px] h-[38px] mt-1 z-10 px-3 text-muted-foreground text-sm cursor-pointer group'>
                                <div className='group-hover:text-primary text-sm'>{tab.label}</div>
                                <X className='w-3 h-3 hover:text-primary z-25' onClick={() => removeTab(tab.key)} />
                            </div>
                            <div className='w-3 h-[32px]'>
                                <div className='bg-background dark:bg-zinc-900 absolute w-3 h-[30px] mt-[10px]'>
                                </div>
                                <div className='bg-zinc-100 dark:bg-background absolute w-3 h-[30px] mt-[10px] rounded-bl-sm border-b border-l'>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            })}
        </div>
    )
}

export default TabList