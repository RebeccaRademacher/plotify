import { OPEN_ABOUT_DIALOG } from '../../shared/about/requests'
import { openAboutDialog } from './actions'
import { requestHandler } from '../shared/communication'

const handleOpenAboutDialogRequested = (resolve, _, __, dispatch) => {
  dispatch(openAboutDialog())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(OPEN_ABOUT_DIALOG, handleOpenAboutDialogRequested)
}

export default registerRequestHandlers
