Azure Mobile Services API
=========================

Introduction
------------

This is the canonical source of an Azure Mobile Services API.  Mobile Services does not (as yet) provide a way to 
run the service locally or unit-test the code, so this provides a custom way of doing so, by spooling up a local 
expressjs server, loading all api/_endpoint_.js files and interrogating their methods.  To use, you mount this repo as 
a submodule to your Azure Mobile Service git repository, and it reaches back into ../service/api to find what it needs.

Tests are under the ./test directory, and should use the infrastructure outlined in _apptest.js_ to bootstrap the test server.
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

+ _grunt build_
  + Runs Lint and Mocha tests on the local codebase.
  
Example Fresh Start
-------------------

Here's what you would do if you were starting from scratch:

<pre>
	&gt; git clone _your mobile service url_
	&gt; cd _directory from above_
	&gt; git submodule add https://github.com/noodlefrenzy/azure-mobile-local.git local
	&gt; cd local
	&gt; npm install -g grunt-cli
	&gt; npm install -g mocha
	&gt; npm install
	&gt; grunt build
</pre>

Now you can do development as you see fit.  Check in the .gitmodules file in your parent to make sure others have access to this submodule.  Fork this submodule yourself and add your own tests, or re-parent your tests to your Azure Mobile Services directory and change one line in the Gruntfile.js and you'll be all set.

Caveats
-------

I haven't mocked out any Azure services or other AMS-provided classes, so Mobile Services that make use of Azure Tables will need additional mocking before they can be used,
and the enum-like statusCodes class, for instance, wont exist locally as that gets injected when running within Azure.