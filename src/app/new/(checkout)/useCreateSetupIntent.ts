import React, { useCallback } from 'react'

import type { Team } from '@root/payload-cloud-types'

export interface PayloadStripeSetupIntent {
  setup_intent: string
  client_secret?: string

  error?: string
}

export const useCreateSetupIntent = (args: {
  team?: Team
}): (() => Promise<PayloadStripeSetupIntent>) => {
  const { team } = args

  const isRequesting = React.useRef<boolean>(false)

  const createSetupIntent = useCallback(async (): Promise<PayloadStripeSetupIntent> => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_CLOUD_CMS_URL}/api/create-setup-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team: team?.id,
        }),
      })

      const res: PayloadStripeSetupIntent = await req.json()
      isRequesting.current = false

      if (!req.ok) {
        throw new Error(res.error)
      }

      isRequesting.current = false
      return res
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(`Could not create setup intent: ${message}`)
    }
  }, [team])

  return createSetupIntent
}
