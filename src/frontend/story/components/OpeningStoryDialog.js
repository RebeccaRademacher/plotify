import * as s from '../selectors'

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import { closeOpenStoryDialog } from '../actions'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const OpeningStoryDialog = (props) => {
  const { classes, open, failed, closeDialog, errorMessage } = props

  let onClose = () => {}
  let title = 'Öffne Geschichte...'
  let message = null
  let actions = null

  if (failed) {
    onClose = closeDialog
    title = 'Die Geschichte konnte nicht geöffnet werden.'
    message = (
      <DialogContent>
        <Typography>{errorMessage}</Typography>
      </DialogContent>
    )
    actions = (
      <DialogActions>
        <Button onClick={closeDialog}>Schließen</Button>
      </DialogActions>
    )
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.title}>
        <CircularProgress className={failed ? classes.hide : classes.progress} />
        <span>{title}</span>
      </DialogTitle>
      {message}
      {actions}
    </Dialog>
  )
}

OpeningStoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  closeDialog: PropTypes.func.isRequired
}

const styles = (theme) => ({
  title: {
    '& h2': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  progress: {
    display: 'block',
    marginRight: theme.spacing.unit * 2
  },
  hide: {
    display: 'none'
  }
})

const StyledOpeningStoryDialog = withStyles(styles)(OpeningStoryDialog)

const mapStateToProps = (state) => ({
  open: s.isShowOpenStoryDialog(state),
  failed: s.isOpeningStoryFailed(state),
  errorMessage: s.getOpeningStoryErrorMessage(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => dispatch(closeOpenStoryDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledOpeningStoryDialog)
