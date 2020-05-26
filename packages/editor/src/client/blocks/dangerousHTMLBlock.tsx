import React, {useContext} from 'react'
import Editor from 'react-simple-code-editor'
import {highlight, languages} from 'prismjs'
import 'prismjs/components/prism-markup'
import 'react-syntax-highlighter'

import {BlockProps, Card, ThemeContext} from '@karma.run/ui'

import {DangerousHTMLValue} from '../api/blocks'

// TODO: Handle disabled prop
export function DangerousHTMLBlock({value, onChange, autofocus}: BlockProps<DangerousHTMLValue>) {
  const theme = useContext(ThemeContext)
  const isEmpty = value.html == undefined

  return (
    <>
      <Card
        height={isEmpty ? 300 : undefined}
        overflow="hidden"
        style={{backgroundColor: theme.colors.light}}>
        <Editor
          value={value.html}
          onValueChange={changedValue => onChange({...value, html: changedValue})}
          highlight={code => {
            return highlight(code, languages.markup, 'markup')
          }}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12
          }}
        />
      </Card>
    </>
  )
}
