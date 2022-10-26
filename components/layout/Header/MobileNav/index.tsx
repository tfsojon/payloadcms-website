import { Cell, Grid } from '@faceless-ui/css-grid'
import { MainMenu } from '../../../../payload-types'
import { GridWrap } from '../../GridWrap'
import { FullLogo } from '../../../graphics/FullLogo'

import classes from './styles.module.scss'

export const MobileNav: React.FC<Pick<MainMenu, 'navItems'>> = ({ navItems }) => {
  return (
    <header className={classes.mobileNav}>
      <GridWrap className={classes.container}>
        <div className={classes.logo}>
          <FullLogo />
        </div>
        <Grid className={classes.grid}>
          <Cell className={classes.content}>
            <div>left header links</div>

            <div>Like what we’re doing? Star us on GitHub!</div>
          </Cell>
        </Grid>
        <div className={classes.icons}>Icons</div>
      </GridWrap>
    </header>
  )
}