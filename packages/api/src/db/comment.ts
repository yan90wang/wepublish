import {RichTextNode} from '..'

export interface GiphyMedia {
  type: 'giphy'
  id: string
  url: string
  original: string
  still: string
  video: string
  width?: number
  height?: number
  title?: string
}

export interface ExternalMedia {
  type: 'external'
  url: string
  width?: number
  height?: number
}

export interface YouTubeMedia {
  type: 'youtube'
  url: string
  still: string
  title?: string
  width?: number
  height?: number
}

export type CommentMedia = GiphyMedia | ExternalMedia | YouTubeMedia

export interface CommentRevision {
  _id: any
  createdAt: Date
  number: number

  body: RichTextNode

  media?: CommentMedia
}

export interface Comment {
  id: any

  userId: string
  createdAt: Date
  modifiedAt: Date
  deletedAt?: Date

  parentID?: string

  childCount: number
  childIDs: string[]

  likes: number
  respect: boolean

  status: string[] // Which states
  revisions: CommentRevision[]
}
