import React from 'react'
import { DisplaySettingsForm } from '@/components/forms/display-settings-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Display",
    description: "LingSquare display settings",
}
const DisplaySettingsModal = () => {
    return (
        <>
            <DisplaySettingsForm />
        </>
    )
}

export default DisplaySettingsModal