module.exports = function(source) {
  const getInside = (el) => (
    el.substring(el.indexOf('>') + 1, el.indexOf('</svg>')).trim()
  )
  const getHTMLAttrs = (el) => {
    return el
      .split('\n').join(' ').split('>')[0]
      .replace(/\<[a-z]+ /, '')
      .split(/("|') /)
      .reduce((prev, cur) => {
      if (!!cur.trim() && !cur.match(/^("|')/)) {
        const attrs = cur.split(/("|')/);
        return {
          ...prev,
          [attrs[0].replace(/=$/, '').trim()]: attrs[2]
        }
      }
      return prev;
    }, {})
  }
  const svgAttrs = JSON.stringify(getHTMLAttrs(source));

  return `
  import Nullstack from 'nullstack';
  export default class SVG extends Nullstack {
    render(attrs) {
      return (
        <svg {...${svgAttrs}} {...attrs}>
          ${getInside(source)}
        </svg>
      );
    }
  }`;
}