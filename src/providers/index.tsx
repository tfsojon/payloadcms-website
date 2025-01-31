'use client'

import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Slide, ToastContainer } from 'react-toastify'
import { GridProvider } from '@faceless-ui/css-grid'
import { ModalContainer, ModalProvider } from '@faceless-ui/modal'
import { MouseInfoProvider } from '@faceless-ui/mouse-info'
import { ScrollInfoProvider } from '@faceless-ui/scroll-info'
import { WindowInfoProvider } from '@faceless-ui/window-info'

import { Template } from '@root/payload-cloud-types'
import { HeaderIntersectionObserver } from '@root/providers/HeaderIntersectionObserver'
import { AuthProvider } from './Auth'
import { ComputedCSSValuesProvider } from './ComputedCSSValues'
import { GlobalsProvider } from './Globals'
import { PageTransition } from './PageTransition'
import { ThemePreferenceProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  templates: Template[]
}> = ({ children, templates }) => {
  return (
    <CookiesProvider>
      <GlobalsProvider templates={templates}>
        <AuthProvider>
          <ScrollInfoProvider>
            <MouseInfoProvider>
              <WindowInfoProvider
                breakpoints={{
                  s: '(max-width: 768px)',
                  m: '(max-width: 1100px)',
                  l: '(max-width: 1600px)',
                }}
              >
                <ThemePreferenceProvider>
                  <GridProvider
                    breakpoints={{
                      s: 768,
                      m: 1024,
                      l: 1680,
                    }}
                    rowGap={{
                      s: '1rem',
                      m: '1rem',
                      l: '2rem',
                      xl: '4rem',
                    }}
                    colGap={{
                      s: 'var(--base)',
                      m: 'calc(var(--base) * 2)',
                      l: 'calc(var(--base) * 2)',
                      xl: 'calc(var(--base) * 3)',
                    }}
                    cols={{
                      s: 8,
                      m: 8,
                      l: 12,
                      xl: 12,
                    }}
                  >
                    <ComputedCSSValuesProvider>
                      <ModalProvider transTime={0} zIndex="var(--z-modal)">
                        <PageTransition>
                          <HeaderIntersectionObserver>
                            {children}
                            <ModalContainer />
                            <ToastContainer
                              position="bottom-center"
                              transition={Slide}
                              icon={false}
                            />
                          </HeaderIntersectionObserver>
                        </PageTransition>
                      </ModalProvider>
                    </ComputedCSSValuesProvider>
                  </GridProvider>
                </ThemePreferenceProvider>
              </WindowInfoProvider>
            </MouseInfoProvider>
          </ScrollInfoProvider>
        </AuthProvider>
      </GlobalsProvider>
    </CookiesProvider>
  )
}
