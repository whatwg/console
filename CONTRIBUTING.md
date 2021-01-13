# Console Standard contributor guidelines

See the [WHATWG contributor guidelines](https://github.com/whatwg/meta/blob/main/CONTRIBUTING.md).

## Building the spec

The Console Standard is written in [Bikeshed](https://github.com/tabatkins/bikeshed), and is available at https://console.spec.whatwg.org/. The main source is in the file `index.bs`.

To build the standard locally, you can either use a locally installed copy of [Bikeshed](https://github.com/tabatkins/bikeshed) by running `make` or use the HTTP API version by running `make remote`.

If you want to do a complete "local deploy" including commit and/or branch snapshots, run

```
make deploy
```
