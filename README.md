# vue-enabled
A small vue library to check dynamically configs based on a mode.

It is fairly common to enabled some features dynamically: featureA and featureB only available to **admin** users, featureC only available if the user is **logged**, etc.

## Installation

No surprises here
```
npm install vue-enabled

yarn add vue-enabled
```

then just import it to your app

```javascript
import Vue from 'vue'
import VueEnabled from 'vue-enabled'

// const VueEnabled = require('vue-enabled')

Vue.use(VueEnabled, {
  mode: 'admin' // whatever you want,
  config: { /* your config here */ }
})

```

## Config

The config param must be a key-value object, where the values are **arrays** of the modes for wich that feature is enabled.

```javascript
{
  featureA: ['admin'],
  featureB: ['admin', 'default'],
  featureB: ['default']
}
```

It is recommended to load the config directly from a file

```javascript
Vue.use(VueEnabled, {
  mode: 'admin' // whatever you want,
  config: require('myconfig.js')
})

// or
import myConfig from './my-config.js'

Vue.use(VueEnabled, {
  mode: 'admin' // whatever you want,
  config: myConfig
})
```

## Usage

### Value access

To access to an specific key value, you can use the `$e` prototype.

```javascript
this.$e('featureA') // returns true
```

or through the instance

```javascript
this.$enabled.e('featureA') // returns true
```

### Mode change

To switch the initial defined mode

```javascript
this.$enabled.mode = 'mode1'
this.$enabled.mode = 'mode2'
```

This mode will affect the results of your queries

```javascript
/*
  mode: 'admin',
  config: {
    featureA: ['admin', 'superadmin']
  }
*/

this.$e('featureA') // returns true
this.$enabled.mode = 'default'
this.$e('featureA') // returns false
this.$enabled.mode = 'superadmin'
this.$e('featureA') // returns true
```
