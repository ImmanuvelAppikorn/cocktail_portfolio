import React from 'react'
import CrimsonReserve from './crimson-reserve'

const CrimsonPage = () => {
  return (
    <div>
      <CrimsonReserve onNextClick={function (): void {
              throw new Error('Function not implemented.')
          } } onPrevClick={function (): void {
              throw new Error('Function not implemented.')
          } } />
    </div>
  )
}

export default CrimsonPage
