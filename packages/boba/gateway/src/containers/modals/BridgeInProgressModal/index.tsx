import {
  purgeBridgeAlert,
  resetBridgeAmount,
  resetToken,
} from 'actions/bridgeAction'
import { closeModal } from 'actions/uiAction'
import { Heading } from 'components/global'
import Modal from 'components/modal/Modal'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBridgeType, selectLayer } from 'selectors'
import { LAYER } from 'util/constant'
import BlockConfirmation from './BlockConfirmation'
import { InprogressContainer, MutedText, ProgressLoader } from './index.styles'
import { BRIDGE_TYPE } from '../../Bridging/BridgeTypeSelector'

interface Props {
  open: boolean
}

const BridgeInProgressModal: FC<Props> = ({ open }) => {
  const dispatch = useDispatch<any>()
  const layer = useSelector(selectLayer())
  const bridgeType = useSelector(selectBridgeType())

  const handleClose = () => {
    dispatch(closeModal('bridgeInProgress'))
    // cleaning up bridge state
    dispatch(resetToken())
    dispatch(purgeBridgeAlert())
    dispatch(resetBridgeAmount())
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      minHeight="180px"
      title=""
      transparent={false}
    >
      <InprogressContainer>
        <ProgressLoader />
        <Heading variant="h1">Bridging...</Heading>
        {layer === LAYER.L1 && bridgeType !== BRIDGE_TYPE.TELEPORTATION ? (
          <BlockConfirmation onClose={handleClose} />
        ) : (
          <>
            <MutedText>Please wait moment.</MutedText>
          </>
        )}
      </InprogressContainer>
    </Modal>
  )
}

export default BridgeInProgressModal
