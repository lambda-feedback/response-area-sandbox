import { HighlightStyle } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

export const pseudocodeHighlightStyle = HighlightStyle.define([
  {
    tag: t.keyword,
    color: '#6f42c1',
    fontWeight: '600',
  },
  {
    tag: t.bool,
    color: '#d73a49',
    fontWeight: '500',
  },
  {
    tag: t.number,
    color: '#005cc5',
  },
  {
    tag: t.string,
    color: '#22863a',
  },
  {
    tag: t.lineComment,
    color: '#6a737d',
    fontStyle: 'italic',
  },
  {
    tag: t.operator,
    color: '#e36209',
  },
]);
