import React from 'react'
import { DisplaySettingsForm } from '../_components/display-settings-form'
import { Metadata } from 'next'

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