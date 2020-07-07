// TODO:
type CSSObject = any;

export type CssResetTagName =
  | 'a'
  | 'blockquote'
  | 'button'
  | 'code'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'header'
  | 'hr'
  | 'img'
  | 'input'
  | 'p'
  | 'select'
  | 'span'
  | 'svg'
  | 'table'
  | 'thead'
  | 'tfoot'
  | 'tbody'
  | 'tr'
  | 'td'
  | 'th'
  | 'textarea';

/**
 * Get css reset for a given tag.
 * We could eventually make this available as a library.
 */
export function cssResetForTag(tagName: CssResetTagName) {
  const sharedResetStyles: CSSObject = {
    boxSizing: 'border-box',
  };

  const resetStyles: CSSObject = {
    ...sharedResetStyles,
    ...RESET_TAG_MAP[tagName],
  };

  return resetStyles;
}

/**
 * Top-level util to apply the right reset based on `as` prop or default tag name.
 */
export function cssReset(defaultTagName: CssResetTagName) {
  return function (props: any) {
    const tagName: CssResetTagName = props.as || defaultTagName;
    return cssResetForTag(tagName);
  };
}

const RESET_TAG_MAP: Record<CssResetTagName, CSSObject> = {
  a: {
    ...getFocusableResetStyles(),
    color: 'inherit',
    textDecoration: 'none',
  },
  blockquote: { margin: 0 },
  button: getBaseInputResetStyles(),
  code: { fontFamily: 'inherit' },
  div: {},
  h1: getHeadingResetStyles(),
  h2: getHeadingResetStyles(),
  h3: getHeadingResetStyles(),
  h4: getHeadingResetStyles(),
  h5: getHeadingResetStyles(),
  h6: getHeadingResetStyles(),
  header: {},
  hr: {
    margin: 0,
    border: 'none',
  },
  img: {},
  input: {
    ...getBaseInputResetStyles(),
    verticalAlign: 'middle',
    width: '100%',

    // input range specific reset
    '&::-webkit-slider-runnable-track': { backgroundColor: 'transparent' },
    '&::-moz-range-track': { backgroundColor: 'transparent' },
    // remove focus border in Firefox:
    // https://css-tricks.com/sliding-nightmare-understanding-range-input
    '::-moz-focus-outer': { border: 0 },
    '&::-webkit-slider-thumb': { appearance: 'none', marginTop: 0 },
    '&::-moz-range-thumb': { appearance: 'none', marginTop: 0 },
  },
  p: { margin: 0 },
  select: {
    ...getBaseInputResetStyles(),
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  span: {},
  svg: {
    display: 'block',
    verticalAlign: 'middle',
  },
  table: {},
  thead: {},
  tfoot: {},
  tbody: {},
  tr: {},
  th: { fontWeight: 'normal', padding: 0, textAlign: 'left' },
  td: { padding: 0 },
  textarea: getBaseInputResetStyles(),
};

function getBaseInputResetStyles(): CSSObject {
  return {
    ...getFocusableResetStyles(),
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 0,
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
    margin: 0,
    padding: 0,
  };
}

function getHeadingResetStyles(): CSSObject {
  return {
    margin: 0,
    fontSize: 'inherit',
    fontWeight: 'normal',
  };
}

export function getFocusableResetStyles(): CSSObject {
  return {
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&:focus': { outline: 'none' },
  };
}