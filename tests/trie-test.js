import { assert, expect } from 'chai';
import Trie from '../scripts/trie.js';
import Node from '../scripts/node.js';
require ('locus');

describe('Trie', function() {
  beforeEach
  it('should be a function', function() {
    let trie = new Trie();
    assert.isFunction(Trie);
  });

  it("trie should be a constructor", () => {
    let trie = new Trie();

    expect(trie).to.be.instanceof(Trie);
  });


  it('should have a function called insert', function() {
    let node = new Node()
    let trie = new Trie();
    assert.isFunction(trie.insert);
  });

  it('add should push in data', () => {
    let trie = new Trie();
    trie.insert('pizza');
    trie.insert('peter');

    assert.equal(trie.length, 2);
  });

  it('length should start at 0', function() {
    var trie = new Trie();
    expect(trie.length).to.equal(0);
  });

  it('should keep a count', function() {
    var node = new Node()
    var trie = new Trie();
    trie.count(node);
    trie.insert('pizza');
    trie.insert('peter');

    expect(trie.length).to.equal(2);
  });

  it('should be able to check if property exists on root', () => {
    let trie = new Trie();
    trie.insert('cookie');

    expect(trie.root.children).to.have.property('c');
  });

  it('should be able to check properties on child nodes', () => {
    let trie = new Trie();
    trie.insert('hello');
    console.log(JSON.stringify(trie.root, null, 4));
    expect(trie.root.children.h.children).to.have.property('e');
  })

  it('should have a suggest function', function() {
    let node = new Node()
    var trie = new Trie();
    assert.isFunction(trie.suggest);
  });

  it('suggest function should return matches to partial words', function() {
    var trie = new Trie();
    trie.insert('pizza');
    trie.insert('hotdog');
    trie.insert('hog');

    expect(trie.suggest('ho')).to.equal(['hotdog', 'hog']);
  });
});
