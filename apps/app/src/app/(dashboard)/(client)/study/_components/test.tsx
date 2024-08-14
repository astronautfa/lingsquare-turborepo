import { IDockviewPanelProps } from '@lingsquare/dockview';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components"

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
            <div className="flex flex-row justify-center gap-2">
                <div className="tab group relative rounded-t-3xl px-5 py-3 aria-selected:bg-color-dark">
                    <div className="absolute -left-10 bottom-3 z-10 h-10 w-10 rounded-full group-aria-selected:bg-color-bright">
                    </div>
                    <div className="absolute -bottom-2 -left-5 z-0 h-10 w-10 rounded-full group-aria-selected:bg-color-dark">
                    </div>
                    <p
                        className="flex flex-row gap-2 justify-center items-center cursor-pointer group-aria-selected:cursor-default text-xl text-color-dark group-aria-selected:text-color-mid mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Home
                    </p>
                    <div
                        className="absolute -right-10 bottom-3 z-10 h-10 w-10 rounded-full group-aria-selected:bg-color-bright">
                    </div>
                    <div className="absolute -bottom-2 -right-5 z-0 h-10 w-10 rounded-full group-aria-selected:bg-color-dark">
                    </div>
                </div>
                <div className="tab group relative rounded-t-3xl px-5 py-3 aria-selected:bg-color-dark">
                    <div className="absolute -left-10 bottom-3 z-10 h-10 w-10 rounded-full group-aria-selected:bg-color-bright">
                    </div>
                    <div className="absolute -bottom-2 -left-5 z-0 h-10 w-10 rounded-full group-aria-selected:bg-color-dark">
                    </div>
                    <p
                        className="flex flex-row gap-2 justify-center items-center cursor-pointer group-aria-selected:cursor-default text-xl text-color-dark group-aria-selected:text-color-mid mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                        Products
                    </p>
                    <div
                        className="absolute -right-10 bottom-3 z-10 h-10 w-10 rounded-full group-aria-selected:bg-color-bright">
                    </div>
                    <div className="absolute -bottom-2 -right-5 z-0 h-10 w-10 rounded-full group-aria-selected:bg-color-dark">
                    </div>
                </div>
                <div className="tab group relative rounded-t-3xl px-5 py-3 aria-selected:bg-color-dark">
                    <div className="absolute -left-10 bottom-3 z-10 h-10 w-10 rounded-full group-aria-selected:bg-color-bright">
                    </div>
                    <div className="absolute -bottom-2 -left-5 z-0 h-10 w-10 rounded-full group-aria-selected:bg-color-dark">
                    </div>
                    <p
                        className="flex flex-row gap-2 justify-center items-center cursor-pointer group-aria-selected:cursor-default text-xl text-color-dark group-aria-selected:text-color-mid mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        About
                    </p>
                    <div
                        className="absolute -right-10 bottom-3 z-10 h-10 w-10 rounded-full group-aria-selected:bg-color-bright">
                    </div>
                    <div className="absolute -bottom-2 -right-5 z-0 h-10 w-10 rounded-full group-aria-selected:bg-color-dark">
                    </div>
                </div>
            </div>
            <div className="mx-4 -mt-3 h-[50px] justify-center rounded-xl bg-color-dark"></div>
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