import React from 'react'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    {children}
  </>
)

export default Layout
