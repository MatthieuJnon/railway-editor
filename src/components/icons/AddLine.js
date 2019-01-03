import React from 'react'
import { theme } from 'theme/globalStyle'
import PropTypes from 'prop-types'

const AddLine = props => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 59 101">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Matthieu---Landing"
          transform="translate(-1108.000000, -176.000000)"
        >
          <g id="Add-Line" transform="translate(1089.000000, 176.000000)">
            <g
              id="Group-2"
              transform="translate(22.000000, 0.000000)"
              stroke={props.color ? props.color : theme.textSecondary}
            >
              <g
                id="Group"
                transform="translate(0.000000, 20.000000)"
                strokeWidth="5"
              >
                <ellipse
                  id="Oval"
                  fillOpacity="0"
                  fill="#FFFFFF"
                  cx="9.37345533"
                  cy="9.38627574"
                  rx="9.37345533"
                  ry="9.38627574"
                />
                <ellipse
                  id="Oval"
                  fillOpacity="0"
                  fill="#FFFFFF"
                  cx="43.3734553"
                  cy="36.3862757"
                  rx="9.37345533"
                  ry="9.38627574"
                />
                <path
                  d="M18.7469107,16.5 L34,29.5"
                  id="Line-2"
                  fill={props.color ? props.color : theme.textSecondary}
                  fillRule="nonzero"
                  strokeLinecap="square"
                />
              </g>
              <path
                d="M45.5424723,7.54247233 L40.209139,12.8758057 L45.5424723,7.54247233 L40.209139,2.209139 L45.5424723,7.54247233 Z M45.5424723,7.54247233 L50.8758057,2.209139 L45.5424723,7.54247233 L50.8758057,12.8758057 L45.5424723,7.54247233 Z"
                id="Combined-Shape"
                strokeWidth="3"
                strokeLinecap="square"
                fillRule="nonzero"
                transform="translate(45.542472, 7.542472) rotate(45.000000) translate(-45.542472, -7.542472) "
              />
            </g>
            <text
              id="Line"
              fontFamily="Montserrat-Regular, Montserrat"
              fontSize="20"
              fontWeight="normal"
              letterSpacing="0.5149427"
              fill={props.color ? props.color : theme.textSecondary}
            >
              <tspan x="29.5601146" y="100">
                Line
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}

AddLine.propTypes = {
  color: PropTypes.string,
}

export default AddLine
