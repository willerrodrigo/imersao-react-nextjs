import React from 'react'
import NextLink from 'next/link'

type LinkProps = {
  children: React.ReactNode
  href: string
  style: any
}

export default function Link({ children, href, style, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <a style={style} {...props}>
        {children}
      </a>
    </NextLink>
  )
}
