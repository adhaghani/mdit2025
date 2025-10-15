import React from 'react'

const layout = ({children} : {children: React.ReactNode}) => {



      // Get all countdown data from centralized context
      const { hasStarted, timeLeft, isExpired, timeUntilRegistration } =
        useCountdown();

        
  return (
    <>
    {children}
    </>
  )
}

export default layout