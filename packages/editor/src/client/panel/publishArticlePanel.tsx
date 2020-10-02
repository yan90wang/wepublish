import React, {useState} from 'react'

import {
  PanelHeader,
  Panel,
  PanelSection,
  DescriptionList,
  DescriptionListItem,
  NavigationButton,
  TextInput,
  PanelSectionHeader,
  Spacing,
  Box,
  Typography
} from '@karma.run/ui'

import {ArticleMetadata} from './articleMetadataPanel'
import {
  MaterialIconClose,
  MaterialIconCheck,
  MaterialIconUpdate,
  MaterialIconQueryBuilder
} from '@karma.run/icons'
import {dateTimeLocalString} from '../utility'

import {useTranslation} from 'react-i18next'

export interface PublishArticlePanelProps {
  initialPublishDate?: Date
  pendingPublishDate?: Date
  metadata: ArticleMetadata

  onClose(): void
  onConfirm(publishDate: Date, updateDate: Date): void
}

export function PublishArticlePanel({
  initialPublishDate,
  pendingPublishDate,
  metadata,
  onClose,
  onConfirm
}: PublishArticlePanelProps) {
  const now = new Date()

  const [publishDateString, setPublishDateString] = useState(
    initialPublishDate ? dateTimeLocalString(initialPublishDate) : dateTimeLocalString(now)
  )

  const [updateDateString, setUpdateDateString] = useState(dateTimeLocalString(now))

  const [publishDateError, setPublishDateError] = useState<string>()
  const [updateDateError, setUpdateDateError] = useState<string>()

  const [publishDate, setPublishDate] = useState<Date | undefined>(initialPublishDate ?? now)
  const [updateDate, setUpdateDate] = useState<Date | undefined>(now)

  const {t} = useTranslation()

  return (
    <Panel>
      <PanelHeader
        title={t('Publish Article')}
        leftChildren={
          <NavigationButton icon={MaterialIconClose} label={t('Close')} onClick={() => onClose()} />
        }
        rightChildren={
          <NavigationButton
            icon={MaterialIconCheck}
            label={t('Confirm')}
            disabled={!publishDate || !updateDate}
            onClick={() => onConfirm(publishDate!, updateDate!)}
          />
        }
      />
      <PanelSection>
        {pendingPublishDate && (
          <Box marginBottom={Spacing.Small}>
            <Typography variant="subtitle1" color="alert">
              {t('Article pending publication info', {pendingPublishDate})}
            </Typography>
          </Box>
        )}
        <TextInput
          type="datetime-local"
          label={t('Publish Date')}
          errorMessage={publishDateError}
          icon={MaterialIconQueryBuilder}
          marginBottom={Spacing.Small}
          value={publishDateString}
          onChange={e => {
            const value = e.target.value
            const publishDate = new Date(value)

            if (!isNaN(publishDate.getTime())) {
              setPublishDateError('')
              setPublishDate(publishDate)
            } else {
              setPublishDateError('Invalid Date')
              setPublishDate(undefined)
            }

            setPublishDateString(value)
          }}
        />
        <TextInput
          type="datetime-local"
          label={t('Update Date')}
          errorMessage={updateDateError}
          icon={MaterialIconUpdate}
          value={updateDateString}
          onChange={e => {
            const value = e.target.value
            const updateDate = new Date(value)

            if (!isNaN(updateDate.getTime())) {
              setPublishDateError('')
              setUpdateDate(updateDate)
            } else {
              setUpdateDateError('Invalid Date')
              setUpdateDate(undefined)
            }

            setUpdateDateString(value)
          }}
        />
      </PanelSection>
      <PanelSectionHeader title={t('Metadata')} />
      <PanelSection>
        <DescriptionList>
          <DescriptionListItem label={t('Pre-title')}>
            {metadata.preTitle || '-'}
          </DescriptionListItem>
          <DescriptionListItem label={t('Title')}>{metadata.title || '-'}</DescriptionListItem>
          <DescriptionListItem label={t('Lead')}>{metadata.lead || '-'}</DescriptionListItem>
          <DescriptionListItem label={t('Slug')}>{metadata.slug || '-'}</DescriptionListItem>
          <DescriptionListItem label={t('Tags')}>
            {metadata.tags.join(', ') || '-'}
          </DescriptionListItem>
          <DescriptionListItem label={t('Breaking News')}>
            {metadata.breaking ? 'Yes' : 'No'}
          </DescriptionListItem>
          <DescriptionListItem label={t('Shared with peers')}>
            {metadata.shared ? 'Yes' : 'No'}
          </DescriptionListItem>
        </DescriptionList>
      </PanelSection>
    </Panel>
  )
}
