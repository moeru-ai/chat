import { EntityManagerProvider, ObstaclesProvider } from '@n3p6/react-three-yuka'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { setPreferredColorScheme } from '@react-three/uikit'
import { Defaults } from '@react-three/uikit-default'
import { noEvents } from '@react-three/xr'
import { ComposeContextProvider } from 'foxact/compose-context-provider'
import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router'

import { AudioBufferProvider } from '~/context/audio-buffer'
import { AudioContextProvider } from '~/context/audio-context'
import { useIsDarkValue } from '~/hooks/use-is-dark'

const contexts = [
  <Defaults key="uikit-default" />,
  <EntityManagerProvider key="entity-manager" />,
  <ObstaclesProvider key="obstacles" />,
  <AudioBufferProvider key="audio-buffer" />,
  <AudioContextProvider key="audio-context" />,
]

const AppLayout = () => {
  const isDark = useIsDarkValue()

  useEffect(() => setPreferredColorScheme(isDark ? 'dark' : 'light'), [isDark])

  return (
    <>
      <Loader />
      <Canvas
        camera={{ position: [0, 1.75, 3.5] }}
        events={noEvents}
        gl={{ localClippingEnabled: true }}
        style={{ flexGrow: 1, width: '100%' }}
      >
        <ComposeContextProvider contexts={contexts}>
          <Suspense fallback={null}>
            <Physics
              debug={import.meta.env.DEV}
              gravity={[0, -9.81, 0]}
            >
              <Outlet />
            </Physics>
          </Suspense>
        </ComposeContextProvider>
      </Canvas>
    </>
  )
}

export default AppLayout
