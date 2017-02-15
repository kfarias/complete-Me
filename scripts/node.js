// const Trie = require ("./trie")
// const text       = "/usr/share/dict/words"
class Node {
  constructor(data){
    this.data = data;
    this.children = {};
    this.isWord = false;
    this.value = '';
  }
}


export default Node;


















// function Node(data) {
//   this.data = data;
//   this.isWord = false;
//   this.prefixes = 0;
//   this.children = {};
// }
