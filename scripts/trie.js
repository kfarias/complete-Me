import Node from './node.js';

class Trie {
  constructor() {
    this.root = new Node('');
    this.length = 0;
  }

  count() {
    return this.legth;
  }

  insert(word) {
    let wordArray = word.split('');
    let current = this.root;
    wordArray.forEach((letter, index) => {
      if(current.children[letter]) {
         current = current.children[letter];
      }
        current.children[letter] = new Node(letter);
        current = current.children[letter]
    })
    current.isWord = true;
    this.length++;
  }
  suggest(string) {
    let current = this.root;
    let strArray = string.split('');
    strArray.forEach((letter, index) => {
      if(current.children[letter]) {
        current = current.children[letter]
      } else {
        return null;
      }
      // words(current, string);
    })
  }
}

export default Trie;
































































// export default class Trie {
//   constructor() {
//   this.root = new Node('');
// }
//
// add(node, word) {
//   if(!this.root) {
//     return null;
//   }
//   this.addNode(this.root, word);
// }
//
// addNode(node, word) {
//   if(!node || !word) {
//     return null;
//   }
//   node.prefixes++;
//   let letter = word.charAt(0);
//   let child = node.children[letter];
//   if(!child) {
//     child = new Node(letter);
//     node.children[letter] = child;
//   }
//   let remainder = word.substring(1);
//   if(!remainder) {
//   child.isWord = true;
// }
// this.addNode(child,remainder);
// }
//
// suggest(node, word) {
//   if(!this.root) {
//     return false;
//   }
//   return this.contains(this.root, word);
// }
//
// contains(node, word) {
//   if(!node || !word){
//   return false;
// }
// let letter = word.charAt(0);
// let child = node.children[letter];
// if(child) {
//   let remainder = word.substring(1);
//   if(!remainer && child.isWord) {
//     return true;
//   } else {
//     return this.contains(child, remainder);
//   }
// } else {
//   return false;
// }
// }
//
// count(node) {
//   if(!this.root) {
//     return console.log('No root node found');
//   }
//   let chain = [this.root];
//   let counter = 0;
//   while(chain.length) {
//     var node = chain.shift();
//     if(node.isWord) {
//       counter++;
//     }
//     for(let child in node.children) {
//       if(node.children.hasOwnProperty(child)) {
//         chain.push(node.children[child]);
//       }
//     }
//   }
//   return counter;
//   }
// }
