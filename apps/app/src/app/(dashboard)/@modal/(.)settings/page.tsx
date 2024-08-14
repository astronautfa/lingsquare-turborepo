import React from 'react'
import { Metadata } from 'next/types';
import SettingsPage from '../../(server)/settings/page';
import { ScrollArea } from '@ui/components';

export const metadata: Metadata = {
    title: "Settings",
    description: "LingSquare settings page",
}

const ImportModal = () => {
    return (
        <ScrollArea className='h-[700px]'>
            <SettingsPage />
        </ScrollArea>
    )
}

export default ImportModal