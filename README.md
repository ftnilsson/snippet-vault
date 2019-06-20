## Welcome to Snippet Vault

![Image](https://github.com/ftnilsson/snippet-vault/blob/master/public/assets/256x256.png)

The only snippet manager you'll ever need ;)
Markdown is a lightweight and easy-to-use application to manage your snippets, built with electron and reactjs.


### Getting started

Clone the repo (or download an [installer](#downloads))

**Requires** : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" alt="node.js" width="50"> (at least > 10) to be installed  

`cd <clone directory>`

`npm install`

`npm start`

### Structure

**note** current version stores all snippets as _xml_ in a local file called _snippets.txt_ located in _public/snippets/snippet.txt_

**public** folder contains the static web content, and has the follwing internal structure

_electron.js_ has all electron code, for handlling window creation, and global shortcuts.

**/assets**

  contains images
  
**/snippets**

  file for storing snippets

___

**src** folder contains all source code, and has the following internal structure

**/assets**

  contains react components like icons and global styles
  
**/components**

  contains react componets for example SearchInput, Popper, SnippetList
  
**/pages**

  contains react pages (with 1 or more components)
  
**/routes**

  contains react-routing functions
  
**/services**

  contains functions for fetching, saving updating data
  redux code



### Building release
`npm tbd`

### Downloads
comming soon

