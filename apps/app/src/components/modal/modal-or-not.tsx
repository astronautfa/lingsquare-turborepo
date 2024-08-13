'use client'

import { useModalContext } from '@/components/modal/modal-provider'

export default function ModalOrNot({
    children,
}: {
    children: React.ReactNode
}) {
    const { isModalActive, lastPathnameBeforeModal } = useModalContext()

    console.log(lastPathnameBeforeModal)

    return <>{isModalActive && children}</>
}