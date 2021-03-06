import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import React, { Component } from 'react'
import { closeCreateCharacterDialog, createCharacter } from '../actions'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { isCreateCharacterDialogOpen } from '../selectors'

class CreateCharacterDialog extends Component {
  constructor (props) {
    super(props)
    this.state = { input: '' }
    this.onInputChanged = this.onInputChanged.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.createCharacter = this.createCharacter.bind(this)
    this.close = this.close.bind(this)
  }

  onInputChanged (event) {
    this.setState({ input: event.target.value })
  }

  onKeyPress (event) {
    if (event.key === 'Enter' && this.state.input.length > 0) {
      this.createCharacter()
    }
  }

  createCharacter () {
    const trimmedInput = this.state.input.trim()
    this.props.onCreate(trimmedInput)
    this.close()
  }

  close () {
    this.setState({ input: '' })
    this.props.onClose()
  }

  render () {
    const { open } = this.props
    const emptyInput = this.state.input.length === 0
    return (
      <Dialog open={open} onClose={this.close}>
        <DialogTitle>Neuer Charakter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bitte gebe den Namen deines neuen Charakters ein.<br />
            Du kannst ihn später jederzeit ändern.
          </DialogContentText>
          <TextField
            onChange={this.onInputChanged}
            onKeyPress={this.onKeyPress}
            margin='normal'
            autoFocus
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close}>Abbrechen</Button>
          <Button onClick={this.createCharacter} disabled={emptyInput}>Erstellen</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

CreateCharacterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: isCreateCharacterDialogOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeCreateCharacterDialog()),
  onCreate: (name) => dispatch(createCharacter(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacterDialog)
