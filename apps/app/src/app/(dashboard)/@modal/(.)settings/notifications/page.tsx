import React from 'react'
import { Metadata } from 'next'
import { NotificationsSettingsForm } from '@/components/forms/notifications-settings-form'
import { ScrollArea } from '@ui/components'

export const metadata: Metadata = {
    title: "Notifications",
    description: "LingSquare notifications settings",
}

const NotificationsSettingModal = () => {
    return (
        <ScrollArea className='pr-2'>
            <NotificationsSettingsForm />
        </ScrollArea>
    )
}

export default NotificationsSettingModal