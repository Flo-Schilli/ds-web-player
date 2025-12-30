import { NetworkFileAdapter } from '../adapters/NetworkFileAdapter'
import { GarlicHubAdapter } from '../adapters/GarlicHubAdapter'
import { ScreenliteAdapter } from '../adapters/ScreenliteAdapter'
import type {ConfigData} from '../types/config.ts'

export const getCMSAdapter = (config: ConfigData) => {
    const { cmsAdapter, cmsAdapterUrl } = config

    if (cmsAdapter === 'NetworkFile') {
        return new NetworkFileAdapter(cmsAdapterUrl)
    } else if (cmsAdapter === 'GarlicHub') {
        return new GarlicHubAdapter(config)
    } else if (cmsAdapter === 'Screenlite') {
        return new ScreenliteAdapter(cmsAdapterUrl)
    } else {
        throw new Error(`Unknown CMS adapter: ${cmsAdapter}`)
    }
}
