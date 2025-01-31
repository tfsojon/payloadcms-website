import * as React from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { Modal, useModal } from '@faceless-ui/modal'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Avatar } from '@components/Avatar'
import { Gutter } from '@components/Gutter'
import { DiscordIcon } from '@root/graphics/DiscordIcon'
import { MainMenu } from '@root/payload-types'
import { useAuth } from '@root/providers/Auth'
import { useHeaderObserver } from '@root/providers/HeaderIntersectionObserver'
import { useTheme } from '@root/providers/Theme'
import { Theme } from '@root/providers/Theme/types'
import { FullLogo } from '../../../graphics/FullLogo'
import { MenuIcon } from '../../../graphics/MenuIcon'
import { CMSLink } from '../../CMSLink'
import { DocSearch } from '../Docsearch'

import classes from './index.module.scss'

export const modalSlug = 'mobile-nav'

type NavItems = Pick<MainMenu, 'navItems'>

const MobileNavItems = ({ navItems }: NavItems) => {
  const { user } = useAuth()

  return (
    <ul className={classes.mobileMenuItems}>
      {(navItems || []).map((item, index) => {
        return <CMSLink className={classes.mobileMenuItem} key={index} {...item.link} />
      })}
      <Link
        className={[classes.newProject, classes.mobileMenuItem].filter(Boolean).join(' ')}
        href="/new"
      >
        New project
      </Link>
      {!user && (
        <Link className={classes.mobileMenuItem} href="/login" prefetch={false}>
          Login
        </Link>
      )}
      <a
        className={[classes.discord, classes.mobileMenuItem].filter(Boolean).join(' ')}
        href="https://discord.com/invite/r6sCXqVk3v"
        target="_blank"
        rel="noreferrer"
      >
        <DiscordIcon />
      </a>
    </ul>
  )
}

const MobileMenuModal: React.FC<NavItems> = ({ navItems }) => {
  return (
    <Modal slug={modalSlug} className={classes.mobileMenuModal}>
      <Gutter>
        <Grid>
          <Cell>
            <div className={classes.mobileMenu}>
              <MobileNavItems navItems={navItems} />
            </div>
          </Cell>
        </Grid>
      </Gutter>
      <div className={classes.modalBlur} />
    </Modal>
  )
}

export const MobileNav: React.FC<NavItems> = props => {
  const { isModalOpen, openModal, closeModal, closeAllModals } = useModal()
  const { headerTheme, setHeaderTheme } = useHeaderObserver()
  const pageTheme = useTheme()
  const themeBeforeOpenRef = React.useRef<Theme | null | undefined>(pageTheme)
  const { user } = useAuth()
  const pathname = usePathname()

  const isMenuOpen = isModalOpen(modalSlug)

  React.useEffect(() => {
    closeAllModals()
  }, [pathname, closeAllModals])

  const toggleModal = React.useCallback(() => {
    if (isMenuOpen) {
      closeModal(modalSlug)
      setHeaderTheme(themeBeforeOpenRef?.current || pageTheme)
    } else {
      themeBeforeOpenRef.current = headerTheme
      setHeaderTheme('dark')
      openModal(modalSlug)
    }
  }, [isMenuOpen, closeModal, openModal, setHeaderTheme, headerTheme, pageTheme])

  return (
    <div className={classes.mobileNav}>
      <div className={classes.menuBar}>
        <Gutter>
          <Grid>
            <Cell className={classes.menuBarContainer}>
              <Link
                href="/"
                className={classes.logo}
                prefetch={false}
                aria-label="Full Payload Logo"
              >
                <FullLogo />
              </Link>
              <div className={classes.icons}>
                <div className={classes.cloudNewProject}>
                  <Link href="/new" prefetch={false}>
                    New project
                  </Link>
                  {!user && (
                    <Link href="/login" prefetch={false}>
                      Login
                    </Link>
                  )}
                </div>
                {user && <Avatar className={classes.mobileAvatar} />}
                <DocSearch />
                <button
                  type="button"
                  className={classes.modalToggler}
                  onClick={toggleModal}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  <MenuIcon />
                </button>
              </div>
            </Cell>
          </Grid>
        </Gutter>
      </div>
      <MobileMenuModal {...props} />
    </div>
  )
}
