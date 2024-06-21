'use client'

import { useModalContext } from '@/components/@modal/ModalProvider'

export default function ModalOrNot({
	children,
}: {
	children: React.ReactNode
}) {
	const { isModalActive, lastPathnameBeforeModal } = useModalContext()
	console.log(isModalActive, lastPathnameBeforeModal)

	return <>{isModalActive && children}</>
}
