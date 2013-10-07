Joblint.org
===========

The source code for http://joblint.org/

**Current Version:** *0.0.0*  
**Node Support:** *0.10*


Setup
-----

To set up a local development version of Joblint.org, you'll need [Node.js][node] installed. Clone this repo locally and install dependencies with;

```sh
$ npm install
```

Now you should be able to run the following to start a development server on port `3000`:

```sh
$ make start-dev
```

Now you can view the site at http://localhost:3000/


Development
-----------

Run the following command to lint the code.

```sh
$ make lint
```

Please ensure there are no lint errors before opening a pull request.


License
-------

Joblint.org is licensed under the [MIT][mit] license.



[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
