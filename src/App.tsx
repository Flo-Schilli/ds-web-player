import { useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import { useCMSAdapter } from './hooks/useCMSAdapter'
import { getCMSAdapter } from './utils/getCMSAdapter'
import { Player } from './Player'
import { useCachedData } from './hooks/useCachedData'
import { useConfigStore } from './stores/configStore'
import { ConfigOverlay } from './components/ConfigOverlay'
import type { ConfigData } from './types/config.ts'

export const App = () => {
    const { config, loadConfig, updateConfig } = useConfigStore()
    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()
    const timezone = config.timezone

    useEffect(() => {
        if (searchParams.size === 0) {
            return
        } else {
            const deviceId = searchParams.get('deviceId')
            const uuid = searchParams.get('uuid')
            const backend = searchParams.get('backend')

            if (deviceId && uuid && backend) {
                const newConfig: Partial<ConfigData> = {}

                if (backend) newConfig.cmsAdapter = backend
                if (uuid) newConfig.deviceUuid = uuid
                if (deviceId) newConfig.deviceName = deviceId

                updateConfig(newConfig).then(() => {
                    navigate(window.location.pathname, { replace: true })
                })
            }
        }
    }, [searchParams, navigate, updateConfig])

    useEffect(() => {
        loadConfig()
    }, [loadConfig])

    const adapter = useMemo(() => getCMSAdapter(config), [config])
    
    const data = useCMSAdapter({ adapter })

    const { cachedData, isCaching } = useCachedData(data)

    return (
        <>
            <ConfigOverlay />
            {cachedData.length > 0 ? (
                <Player data={data} timezone={timezone} />
            ) : !isCaching ? (
                <div className='bg-black w-screen h-screen overflow-hidden'>
                    <h1 className='text-white text-3xl font-bold'>Schedule is empty</h1>
                </div>
            ) : (
                <div className='bg-black w-screen h-screen overflow-hidden'>
                    <h1 className='text-white text-3xl font-bold'>Loading...</h1>
                </div>
            )}
        </>
    )
}