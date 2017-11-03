import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

function CharacterListItem (props) {
  const { classes, character, onClick, selected } = props

  let classNames = classes.listItem
  if (selected) classNames += ' ' + classes.selectedListItem

  return (
    <ListItem className={classNames} onClick={onClick} button={!selected}>
      <ListItemAvatar>
        <Avatar>{character.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.characterName}
        primary={character.name} />
    </ListItem>
  )
}

CharacterListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
}

const styles = theme => {
  const light = theme.palette.type === 'light'
  const top = light ? 600 : 700
  const bottom = light ? 100 : 500
  return {
    listItem: {
      height: theme.spacing.unit * 7
    },
    selectedListItem: {
      backgroundColor: theme.palette.background.contentFrame,
      boxShadow: 'inset 0 1px 1px -1px ' + theme.palette.grey[top] + ',' +
                'inset 0 -1px 1px -1px ' + theme.palette.grey[bottom]
    },
    characterName: {
      display: 'flex',
      alignItems: 'center',
      height: theme.spacing.unit * 6,
      '& h3': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical'
      }
    }
  }
}

export default withStyles(styles)(CharacterListItem)
