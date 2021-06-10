import { useState, useContext, useEffect } from 'react'
import { ConfigContext } from '../utils/withConfig'

interface KeyPrice {
  [currency: string]: string
}
export const useFiatKeyPrices = (address: string, network: number) => {
  const [loading, setLoading] = useState(true)
  const [fiatPrices, updatePrices] = useState({} as KeyPrice)

  const config: any = useContext(ConfigContext)

  async function getFiatKeyPriceFor(lockAddress: string) {
    const response = await fetch(
      `${config.services.storage.host}/price/fiat/${lockAddress}?chain=${network}`
    )
    const prices: KeyPrice = await response.json()

    updatePrices(prices as KeyPrice)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getFiatKeyPriceFor(address)
  }, [address])

  return { loading, fiatPrices }
}
