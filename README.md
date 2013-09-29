
Joblint
=======

Test tech job specs for issues with sexism, culture, expectations, and recruiter fails.

**Current Version:** *0.0.0*  
**Build Status:** [![Build Status][travis-img]][travis]  
**Node Support:** *0.10*  

```sh
$ joblint path/to/spec.txt
```


Installing
----------

Joblint runs on [Node.js][node], and is installed with npm:

```sh
$ npm install joblint
```


Command Line Tool
-----------------

Joblint can be used on the command line with the `joblint` command:

```sh
$ joblint --help

  Usage: joblint [options] <file>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -r, --reporter [type]  Use the specified reporter [cli]

```

Joblint supports either specifying a file name:

```sh
$ joblint path/to/spec.txt
```

Or piping the job spec into the command:

```sh
$ echo "This is a job spec" | joblint
```

You can use this to pipe the contents of the clipboard into the command, which is really useful if you're copying specs from emails:

```sh
# On Mac:
$ pbpaste | joblint

# On Linux (with xclip installed):
$ xclip -o | joblint
```


Node.js
-------

You can also use Joblint directly from a Node.js script:

```js
var joblint = require('joblint');

var result = joblint("This is a job spec");
console.log(result);
```


Writing Your Own Rules
----------------------

I'm intending on writing some documentation for this, but for now you're best-placed reading through some of the code in [`lib/rule`](lib/rule).


Development
-----------

If you wish to contribute to Joblint, clone this repository locally and install dependencies with `npm install`. Now you can run the following commands to lint and test the code.

```sh
$ make lint  # Run JSHint on the code
$ make test  # Run unit tests
```

Please ensure there are no lint errors or failing tests before opening a pull request.


License
-------

Joblint is licensed under the [MIT][mit] license.



[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://travis-ci.org/rowanmanning/joblint
[travis-img]: https://travis-ci.org/rowanmanning/joblint.png?branch=master
