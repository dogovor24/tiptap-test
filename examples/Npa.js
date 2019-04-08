import { Node } from 'tiptap'
import { setBlockType, textblockTypeInputRule, toggleBlockType, updateMark } from 'tiptap-commands'

export default class Npa extends Node {

  get name() {
    return 'npa'
  }

  get defaultOptions() {
    return {
      aligns: ['left', 'right', 'center', 'justify'],
    }
  }

  get schema() {
    return {
      attrs: {
        npa: {
          default: null,
        },
      },
      group: 'inline',
      inline: true,
      selectable: false,
      atom: true,
      inclusive: false,
      parseDOM: [
        {
          tag: '[data-npa]',
          // style: 'text-align',
          // getAttrs: node => 'right',
          getAttrs: dom => ({
            npa: dom.getAttribute('data-npa'),
          }),
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

      toDOM: node => ['span', {
        ...node.attrs,
        'data-npa': node.attrs.npa,
      }, 0],
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
