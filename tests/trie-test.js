import { assert, expect } from 'chai';
import Trie from '../scripts/trie.js';
const fs = require('fs');

require ('locus');

describe('Trie', function() {

  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should be a function', function() {
    assert.isFunction(Trie);
  });

  it('trie should be a constructor', () => {
    expect(trie).to.be.instanceof(Trie);
  });

  it('should have a function called insert', function() {
    assert.isFunction(trie.insert);
  });

  it('add should push in data', () => {
    trie.insert('pizza');
    trie.insert('peter');

    assert.equal(trie.length, 2);
  });

  it('length should start at 0', function() {
    expect(trie.length).to.equal(0);
  });

  it('should keep a count', function() {
    trie.insert('pizza');
    trie.insert('peter');

    expect(trie.count()).to.equal(2);
  });

  it('should be able to check if property exists on root', () => {
    trie.insert('cookie');

    expect(trie.root.children).to.have.property('c');
  });

  it('should be able to check properties on child nodes', () => {
    trie.insert('hello');
    expect(trie.root.children.h.children).to.have.property('e');
  });

  it('should have a suggest function', () => {
    assert.isFunction(trie.suggest);
  });

  it('suggest function should return matches to partial words', () => {
    trie.insert('cat');
    trie.insert('pizza');

    trie.suggest('pi');

    assert.deepEqual(trie.suggestions, ['pizza']);
  });

  it('should have a populate function', () => {
    assert.isFunction(trie.populate);
  });

  it('should be able to add a word and set when word is complete', () => {
    trie.insert('hello');

    expect(trie.root.children.h).to.have.deep.property('children').
                        to.have.deep.property('e').
                        to.have.deep.property('children').
                        to.have.deep.property('l').
                        to.have.deep.property('children').
                        to.have.deep.property('l').
                        to.have.deep.property('children').
                        to.have.deep.property('o').
                        to.have.deep.property('isWord').
                        to.equal(true);

  });

  it('should be able to add a two similar strings and check if they exist', () => {
    trie.insert('abc');
    trie.insert('abd');

    expect(trie.root.children.a).to.have.deep.property('children').
                      to.have.deep.property('b').
                      to.have.deep.property('children').
                      to.have.keys('c', 'd');
  });

  it('populate contains 235886', () => {
    let text = '/usr/share/dict/words';
    let dictionary =  fs.readFileSync(text).toString('utf-8').trim().split('\n');
    trie.populate(dictionary);

    assert.equal(trie.count(), 235886);
  });

  it('should return an empty array if nothing matches suggestion', () => {
    let text = '/usr/share/dict/words';
    let dictionary =  fs.readFileSync(text).toString('utf-8').trim().split('\n');
    trie.populate(dictionary);
    trie.suggest('td');

    assert.deepEqual(trie.suggestions, []);
  });

  it('should return words that match suggestion', () => {
    let trie = new Trie();
    let text = '/usr/share/dict/words';
    let dictionary =  fs.readFileSync(text).toString('utf-8').trim().split('\n');
    trie.populate(dictionary);
    trie.suggest('piz');

    assert.deepEqual(trie.suggestions, ['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
  });

  it('should select words in array by importance', () => {
    let text = '/usr/share/dict/words';
    let dictionary = fs.readFileSync(text).toString('utf-8').trim().split('\n');
    trie.populate(dictionary);
    trie.suggest('piz');
    trie.select('piz','pizzeria');
    assert.deepEqual(trie.suggestions, ['pizzeria', 'pize', 'pizza', 'pizzicato','pizzle' ]);
  });
});
