import React from 'react'
import PropTypes from 'prop-types'

import withImage from './withImage'

const ChangeAddressIcon = ({ imageSrc }) => {
  if (!imageSrc) {
    return null
  }

  return (
    <p>
      <img className="v-mid" src={imageSrc} />
    </p>
  )
}

ChangeAddressIcon.propTypes = {
  imageSrc: PropTypes.string,
  onClick: PropTypes.func,
}

const getImagePath = () => 'Change-Address-Icon.svg'

export default withImage(getImagePath)(ChangeAddressIcon)