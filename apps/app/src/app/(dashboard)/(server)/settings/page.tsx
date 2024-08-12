import React from 'react'
import { PersonalSettingsForm } from './_components/personal-settings-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Personal",
    description: "LingSquare personal settings",
}

// TODO: Convert to intercepting route

const SettingsPage = () => {
    return (
        <PersonalSettingsForm />
    )
}

export default SettingsPage