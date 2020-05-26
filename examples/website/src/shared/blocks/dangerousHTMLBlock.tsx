import React, {useEffect, useState} from 'react'

import {DangerousHTMLBlockValue} from '../types'

import {cssRule, useStyle} from '@karma.run/react'
import {pxToRem, whenTablet, whenDesktop} from '../style/helpers'
import {usePermanentVisibility} from '../utils/hooks'

export interface EmbedBlockProps {
  readonly data: DangerousHTMLBlockValue
}

const EmbedBlockStyle = cssRule<{showBackground: boolean}>(({showBackground}) => ({
  marginBottom: pxToRem(50),
  padding: `0 ${pxToRem(25)}`,
  opacity: showBackground ? 1 : 0,
  transform: showBackground ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)',
  transition: 'opacity 500ms ease, transform 700ms ease',

  ...whenTablet({
    width: '75%',
    maxWidth: pxToRem(900),
    margin: `0 auto ${pxToRem(70)}`,
    display: 'flex',
    justifyContent: 'center'
  }),

  ...whenDesktop({
    width: '50%',
    maxWidth: pxToRem(900),
    margin: `0 auto ${pxToRem(70)}`,
    display: 'flex',
    justifyContent: 'center'
  })
}))

export function DangerousHTMLBlock(ars: EmbedBlockProps) {
  const ref = React.createRef<HTMLParagraphElement>()
  const show = usePermanentVisibility(ref, {threshold: 0})
  const css = useStyle({showBackground: show})

  const {data} = ars
  /*const width = data.width ?? 500
  const height = data.height ?? 300*/

  const [dangerousHTML, setDangerousHTML] = useState({__html: ''})

  useEffect(() => {
    setDangerousHTML({__html: data.html})
  }, [])

  return (
    <div ref={ref} className={css(EmbedBlockStyle)}>
      <div style={{position: 'relative', width: '100%'}}>
        <div dangerouslySetInnerHTML={dangerousHTML}></div>
      </div>
    </div>
  )
}
