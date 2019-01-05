import React from 'react'
import styled from 'styled-components'

import AddStation from 'components/icons/AddStation'
import AddLine from 'components/icons/AddLine'
import Export from 'components/icons/Export'

const Header = styled.div`
  height: 100vh;
  width: 20vw;
  background-color: ${props => props.theme.primary};
  position: absolute;
  top: 0;
  left: 130vw;
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.22);
`

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 10vw;
`
const Icon = styled.div`
  margin-top: 1em;
  height: 20vh;
  width: 10vw;
  padding: 1.5em;
  cursor: pointer;
`

class EditMenu extends React.Component {
  render() {
    return (
      <Header>
        <IconsContainer>
          <Icon>
            <AddStation />
          </Icon>
          <Icon>
            <AddLine />
          </Icon>
          <Icon>
            <Export />
          </Icon>
        </IconsContainer>
      </Header>
    )
  }
}

export default EditMenu
