import { Node } from 'tiptap'
import { setBlockType, textblockTypeInputRule, toggleBlockType, updateMark } from 'tiptap-commands'

export default class TextAlign extends Node {

  get name() {
    return 'textAlign'
  }

  get defaultOptions() {
    return {
      aligns: ['left', 'right', 'center', 'justify'],
    }
  }

  get schema() {
    return {
      attrs: {
        align: {
          default: 'justify',
        },
      },
      content: 'inline*', /*'inline*'*/
      group: 'block',
      defining: false,
      draggable: false,
// contentElement: (node) => {console.log(node)},
      atom: true,
      inclusive: false,
      parseDOM: [
        {
          tag: '[style]',
          style: 'text-align',
          // getAttrs: node => 'right',
          getAttrs: value => {
            console.log(1,value);
            return /^(.*)$/.test(value) && null
          },
        },
      ],
      // /*parseDOM: [
      //   {
      //     // tag: 'p',
      //     getAttrs: dom => {
      //       console.log(dom)
      //       // const id = dom.getAttribute('data-mention-id')
      //       // const label = dom.innerText.split(this.options.matcher.char).join('')
      //       return { id, label }
      //     },
      //   },
      // ],*/
      toDOM: (node) => {
        // console.log(node.marks);
        return ['div', {
          'style': `text-align: ${node.attrs.align};`
        }, 0]
      }/*[`h${node.attrs.level}`, 0]*/,
    }
  }

  commands({ type, schema }) {
    console.log(type, schema)
    // return () => updateMark(type, schema.nodes.paragraph)
    return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
  }

  /*keys({ type }) {
      return this.options.aligns.reduce((items, level) => ({
          ...items,
          ...{
              [`Shift-Ctrl-${level}`]: setBlockType(type, { level }),
          },
      }), {})
  }*/

  /*inputRules({ type }) {
      return this.options.aligns.map(level => textblockTypeInputRule(
          new RegExp(`^(#{1,${level}})\\s$`),
          type,
          () => ({ level }),
      ))
  }*/

}
