import { LayerRecord } from '@howtolayers/layers-manager'

export type PassedPopoverProps = LayerRecord & {
  dismiss: () => void
  dismissing: boolean
  destroy: () => void
}
