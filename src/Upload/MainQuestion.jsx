import React from 'react'

export default function MainQuestion() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div>
            <h1>Add a Question which show at the Beginning of the Chatbot </h1>
        </div>
        <div>
        <button className='px-3 py-1 text-white bg-green-700'>Add Question</button>
        </div>

        <div>
            <input  type='text' />
        </div>

    </div>
  )
}
