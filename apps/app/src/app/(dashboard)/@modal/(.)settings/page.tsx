import React from 'react'
import { Metadata } from 'next/types';
import SettingsPage from '../../(server)/settings/page';

export const metadata: Metadata = {
    title: "Settings",
    description: "LingSquare settings page",
}

const ImportModal = () => {
    return (
        <SettingsPage />
    )
}

export default ImportModal