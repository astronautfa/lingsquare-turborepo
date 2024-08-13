import React from 'react'
import { Metadata } from 'next'
import { NotificationsSettingsForm } from '@/components/forms/notifications-settings-form'

export const metadata: Metadata = {
    title: "Notifications",
    description: "LingSquare notifications settings",
}

const NotificationsSettingModal = () => {
    return (
        <>
            <NotificationsSettingsForm />
        </>
    )
}

export default NotificationsSettingModal