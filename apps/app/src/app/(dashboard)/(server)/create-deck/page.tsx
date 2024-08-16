import { CreateDeckForm } from '@/components/forms/create-deck-form'
import React from 'react'

const CreateDeckPage = () => {
    return (
        <div className="relative block w-full rounded-lg p-12 focus:outline-none focus:ring-2 focus:ring-SKY-700 focus:ring-offset-2 backdrop-blur-xs transition-colors duration-400">
            <div className="mx-auto max-w-lg">
                <CreateDeckForm className='md:border-0' />
            </div>
        </div>
    )
}

export default CreateDeckPage