import React, { useEffect, useState } from 'react'
import { renderRoutes } from 'react-router-config'

export function Auth({ route }: RouteProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return ready ? <>{renderRoutes(route.routes)}</> : null
}
