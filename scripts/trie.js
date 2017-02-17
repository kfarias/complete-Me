import Node from './node.js';


class Trie {
  constructor() {
    this.root = new Node('');
    this.length = 0;
    this.suggestions = [];
    this.suggestionsObj = {};
  }

  count() {
    return this.length;
    //let current = this.root
    //
    //check if words have a property of is word
    // if(current.isWord){
    // 
    // }
    //return this.length;
  }

  populate(array) {
    array.forEach((word) => {
      this.insert(word);
    });
  }

  insert(word) {
    let wordArray = word.split('');
    let current = this.root;

    wordArray.forEach(letter => {

      if (current.children[letter]) {
        current = current.children[letter];
      } else {
        current.children[letter] = new Node(letter);
        current = current.children[letter];
      }
    });

    current.isWord = true;
    this.length++;
  }

  suggest(string) {
    let letterArray = string.split('');
    let current = this.root;

    for (let i = 0; i < letterArray.length; i++) {
      if (current.children[letterArray[i]]) {
        current = current.children[letterArray[i]];

      } else {

        return null;
      }
    }
    this.words(current, string);
  }

  words(current, string) {
    if (current.isWord) {
      this.suggestions.push(string);
    }

    let nodekeys = Object.keys(current.children);

    nodekeys.forEach(letter => {
      let nextNode = current.children[letter];
      this.words(nextNode, string + letter);
    });
    return this.suggestions;
  }

  select(substring, suggestion){
    let currentIndex = this.suggestions.indexOf(suggestion);
    let targetWord = this.suggestions.splice(currentIndex,1);

    this.suggestions.unshift(targetWord[0]);
    this.suggestionsObj[substring] = this.suggestions;
  }
}






export default Trie;
