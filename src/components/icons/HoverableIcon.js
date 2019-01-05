import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const HoverableSvg = styled.svg`
  color: ${props => props.theme.textSecondary};
  &:hover {
    color: ${props => props.theme.white};
  }
`

const HoverableIcon = props => {
  return (
    <HoverableSvg width="100%" height="100%" viewBox={props.viewBox}>
      {props.children}
    </HoverableSvg>
  )
}

HoverableIcon.propTypes = {
  viewBox: PropTypes.string.isRequired,
}

export default HoverableIcon
