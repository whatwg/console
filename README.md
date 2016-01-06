# Console Standard

All web browsers, and most other JavaScript environments, have shipped some form of developer console. This standard attempts to finally define the semantics of the console APIs, in an attempt to create convergence.

A list containing some of the observed differences so far in different environments is available in [NOTES.md](NOTES.md).

## Work in progress

This specification is still in its very early stages. It is very much a work in progress.

## Building the spec

The Console Standard is written in [Bikeshed](https://github.com/tabatkins/bikeshed), with an additional bit of help from [emu-algify](https://www.npmjs.com/package/emu-algify). The main source is in the file `index.bs`.

To build the standard locally, you will need a recent version of [Node.js](https://nodejs.org/en/). Run `npm install` in the root directory to set things up. Then the Makefile should take care of the rest by calling out to the Bikeshed web service.
