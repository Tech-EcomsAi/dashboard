export const WATERMARK_TYPES = {
    LOGO: 'Logo',
    LOGO_AND_TEXT: 'Logo & Text',
    INLINE_LOGO_AND_TEXT: 'Logo & Text Inline',
    TEXT: 'Text'
}

export const WATERMARKS = [
    { id: WATERMARK_TYPES.LOGO, title: 'Logo', showImg: true, showText: false },
    { id: WATERMARK_TYPES.INLINE_LOGO_AND_TEXT, title: 'Logo & Text Inline', showImg: true, showText: true, isInline: true },
    { id: WATERMARK_TYPES.LOGO_AND_TEXT, title: 'Logo & Text', showImg: true, showText: true },
    { id: WATERMARK_TYPES.TEXT, title: 'Text', showImg: false, showText: true }
]
