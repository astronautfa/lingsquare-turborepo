import React from 'react'

const LessonPage = ({ params }: { params: { id: string } }) => {
    return (
        <div>{params.id}
        </div>
    )
}

export default LessonPage