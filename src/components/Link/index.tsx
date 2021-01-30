import React from 'react'
import NextLink from 'next/link'

type LinkProps = {
  children: React.ReactNode
  href: string
}

export default function Link({ children, href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>{children}</a>
    </NextLink>
  )
}
