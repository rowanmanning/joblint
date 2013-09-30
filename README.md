Joblint
=======

Test tech job specs for issues with sexism, culture, expectations, and recruiter fails.

**Writing a job spec?** Use Joblint to make your job attractive to a much broader range of candidates.  
**Getting swamped in job specs?** Use Joblint to filter out the bad ones.

**Current Version:** *1.0.1*  
**Build Status:** [![Build Status][travis-img]][travis]  
**Node Support:** *0.10*  

```sh
$ joblint path/to/spec.txt
```

![Joblint output](https://f.cloud.github.com/assets/138944/1235001/20881c1e-2996-11e3-9712-332325333766.png)



Installing
----------

Joblint runs on [Node.js][node], and is installed with npm:

```sh
$ npm install joblint -g
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


Thanks
------

The following excellent people helped massively with defining the original lint rules:

- [Ben Darlow](http://www.kapowaz.net/)
- [Perry Harlock](http://www.phwebs.co.uk/)
- [Glynn Phillips](http://www.glynnphillips.co.uk/)
- [Laura Porter](https://twitter.com/laurabygaslight)
- [Jude Robinson](https://twitter.com/j0000d)
- [Luke Stavenhagen](https://twitter.com/stavi)
- [Andrew Walker](https://twitter.com/moddular)

Also, there are plenty of [great contributors][contrib] to the library.


License
-------

Joblint is licensed under the [MIT][mit] license.



[contrib]: https://github.com/rowanmanning/joblint/graphs/contributors
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://travis-ci.org/rowanmanning/joblint
[travis-img]: https://travis-ci.org/rowanmanning/joblint.png?branch=master
