import React from 'react'
import styled from 'styled-components'
import { ComponentProps, Image as ImageNode, DESKTOP_MIN_WIDTH, TABLET_MIN_WIDTH } from '../props'
import { useRouting, useExistLink } from '../hooks'
import { useMediaQuery } from 'react-responsive'

const Image = ({ node, push, paths = [], artboardSize }: ComponentProps) => {
  const image = node as ImageNode
  const onClick = useRouting(push)
  const onCheckExistLink = useExistLink()

  const useIsDesktop = () => {
    const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH })
    return artboardSize ? (artboardSize === 'desktop' ? true : false) : isDesktop
  }
  const useIsTablet = () => {
    const isTablet = useMediaQuery({ minWidth: TABLET_MIN_WIDTH, maxWidth: DESKTOP_MIN_WIDTH - 1 })
    return artboardSize ? (artboardSize === 'tablet' ? true : false) : isTablet
  }

  const isDesktop = useIsDesktop()
  const isTablet = useIsTablet()

  return (
    <React.Fragment>
      <Wrapper
        style={
          image.styleMode === 'common' ? image.containerStyle : isDesktop ? image.containerStyle : isTablet ? image.containerStyleTb : image.containerStyleMb
        }
      >
        <BaseImage
          src={image.imageURL}
          data-existlink={onCheckExistLink(image, paths)}
          style={image.styleMode === 'common' ? image.style : isDesktop ? image.style : isTablet ? image.styleTb : image.styleMb}
          onClick={() => onClick(image, paths)}
        />
      </Wrapper>
    </React.Fragment>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const BaseImage = styled.img`
  &[data-existlink='true'] {
    cursor: pointer;
  }
`

export default Image
