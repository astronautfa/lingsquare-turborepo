'use client'

import { useModalContext } from '@/components/modal/modal-provider'

export default function ModalOrNot({
    children,
}: {
    children: React.ReactNode
}) {
    const { isModalActive } = useModalContext()

    return <>{isModalActive && children}</>
}