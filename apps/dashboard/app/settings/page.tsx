import React from 'react'
import { PersonalSettingsForm } from './_components/personal-settings-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Personal Settings",
    description: "LingSquare personal settings",
}

const SettingsPage = () => {
    return (
        <PersonalSettingsForm />
    )
}

export default SettingsPage