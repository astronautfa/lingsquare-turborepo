import React from 'react'
import { Metadata } from 'next'
import { DisplaySettingsForm } from '@/components/forms/display-settings-form'

export const metadata: Metadata = {
    title: "Display",
    description: "LingSquare display settings",
}
const DisplaySettingsPage = () => {
    return (
        <>
            <DisplaySettingsForm />
        </>
    )
}

export default DisplaySettingsPage