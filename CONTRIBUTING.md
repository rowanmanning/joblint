
How To Contribute
=================

Joblint.org accepts contributions from anyone, as long as you follow the guidelines below. If you'd like to contribute but aren't sure what there is for you to do, check the issue tracker for [things ready to be worked on][ready] and [known bugs][bugs].

It might be an idea to focus efforts on the goal of the [next milestone][milestones] before jumping onto anything too far ahead on the roadmap.


Features
--------

We won't accept features without prior discussion in the [issue tracker][issues]. Two heads are always better than one – this blanket rule stops you from spending your valuable time on features which may not make it back into Joblint.org.

If you want to fork the project and build on it by yourself, of course that's absolutely fine! Just don't expect your code to me merged back upstream :)


Refactoring/Rewriting
---------------------

We will accept refactors where it makes an improvement to the maintainability of the code-base or makes code more readable/understandable. If there's an argument about what's readable or not, chat about it in a pull-request.


Coding Guidelines
-----------------

* No trailing whitespace please (except in Markdown)
* Generally follow the style that is currently present in the code – consistency is important
* Keep indentation consistent (four spaces)
* Don't commit code with lint errors (run `make lint` to run JSHint with the correct configurations)
* Don't commit code without passing tests (run `make test`). Rules themselves aren't tested right now, so don't worry too much about them



[bugs]: https://github.com/rowanmanning/joblint.org/issues?labels=bug&state=open
[ready]: https://github.com/rowanmanning/joblint.org/issues?labels=ready&state=open
[issues]: https://github.com/rowanmanning/joblint.org/issues
[milestones]: https://github.com/rowanmanning/joblint.org/issues/milestones