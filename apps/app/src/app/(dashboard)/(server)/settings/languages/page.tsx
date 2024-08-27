import React from 'react'
import { Metadata } from 'next'
import { LanguageSettingsForm } from '@/components/forms/languages-settings-form'

export const metadata: Metadata = {
    title: "Languages",
    description: "LingSquare languages settings",
}

const LanguagesSettingPage = () => {
    return (
        <LanguageSettingsForm />
    )
}

export default LanguagesSettingPage