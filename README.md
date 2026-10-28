# Welcome to GeoGebra! But for linux

For some reason, GeoGebra Classic 6 is not available for linux. WTF. But I decided to use electron and built myself a version of geogebra working exclusively for linux (I mean, if you are using windows, just download the app from https://www.geogebra.org/....)

This repository contains source code of [GeoGebra](https://www.geogebra.org)'s math apps.
It is available on a private GitLab instance and mirrored to GitHub.

Please read https://www.geogebra.org/license about GeoGebra's
licensing.

## Compiling with electron

### Java
Java 17 is required for Gradle to work. Java 11 is required to compile geogebra

### Compilation

```bash
cd ggb-electron/classic
npm install
npm run dist:appimage
```