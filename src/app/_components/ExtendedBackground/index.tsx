import React from 'react'

import classes from './index.module.scss'

export const ExtendedBackground: React.FC<{
  upperChildren: React.ReactNode
  lowerChildren?: React.ReactNode
  pixels?: boolean
  className?: string
}> = ({ lowerChildren, upperChildren, pixels, className }) => {
  return (
    <div
      className={[classes.container, pixels && classes.withPixels, className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={classes.backgroundContainer}>
        {upperChildren}

        <div
          data-component="top-background"
          className={[classes.extendedBackground, classes.upperBackground]
            .filter(Boolean)
            .join(' ')}
        />
      </div>

      {lowerChildren && (
        <div className={classes.backgroundContainer}>
          {lowerChildren}

          <div
            data-component="bottom-background"
            className={[classes.extendedBackground, classes.lowerBackground]
              .filter(Boolean)
              .join(' ')}
          />
        </div>
      )}

      {pixels && (
        <div
          data-component="pixels"
          className={[classes.extendedBackground, classes.pixels].filter(Boolean).join(' ')}
        />
      )}
    </div>
  )
}
