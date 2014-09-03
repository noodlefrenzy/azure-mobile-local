MADCAD API
==========

Introduction
------------

This is the canonical source of the MADCAD Mobile Services API.  Mobile Services does not (as yet) provide a way to 
run the service locally or unit-test the code, so this provides a custom way of doing so, by spooling up a local 
expressjs server, loading all api/_endpoint_.js files and interrogating their methods.

Tests are under the test directory, and should use the infrastructure outlined in _apptest.js_ to bootstrap the test server.
They use [Mocha](http://visionmedia.github.io/mocha/#getting-started) and [Should](https://github.com/visionmedia/should.js) 
to run a spoofed HTTP shell and support BDD-style assertions. 

Initial Setup
-------------

The build process here makes use of [Grunt](http://gruntjs.com/) to run its tasks, and [Mocha](http://visionmedia.github.io/mocha/#getting-started)
to run its tests.  For initializing the Mobile Services Git repo and pushing changes, it also requires git to be in your path.  As such, before starting,
you should install the following:

+ [Git](https://help.github.com/articles/set-up-git)
+ Grunt
  + _npm install -g grunt-cli_
+ Mocha
  + _npm install -g mocha_

Building the API
----------------

Azure Mobile Services keep their own Git repository, which allows pushes to auto-deploy.
The Gruntfile inluded here helps test local changes, and then sync and deploy those changes with that repository.

To get started:

+ _grunt init_
  + This will clone the Azure Mobile Services git repository locally at ../../<repo-name>
	Currently, we're using the mctest-milanz Mobile Service, because we can destroy it with impunity.
+ _grunt build_
  + Runs Lint and Mocha tests on the local codebase.
+ _grunt deploy_
  + Copies the local code into the local Mobile Services (hereafter 'alt') enlistment,
    commits the alt enlistment, and then pushes it to origin.
    MUST provide --commitMsg="message", and will use the -a flag to ensure files are added after copying.
+ _grunt deploy_
  + Copies the local code into the local Mobile Services (hereafter 'alt') enlistment, commits the alt enlistment, and then pushes it to origin.

__NOTE__: For some reason, there are some issues accepting input - when you see a username/password prompt, HIT RETURN FIRST
This will then allow you to enter your input on the next line.  If your password echoes back to you, you're doing it wrong :)

Example Fresh Start
-------------------

Here's what you would do if you were starting from scratch:

<pre>
	&gt; npm install -g grunt-cli
	&gt; npm install -g mocha
	&gt; npm install
	&gt; grunt init
	&gt; grunt build
</pre>

Now you can do development as you see fit.  Once you're ready to push the changes to the server, you would just do:

<pre>
	&gt; grunt deploy
</pre>
