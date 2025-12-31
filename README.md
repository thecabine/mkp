## Unusual, experimental, infinity Matrix Kernel Protocol runtime for JS

<br/>
⚠️ ARCHIVE / PROOF OF CONCEPT. This repository contains the V1 prototype of the Matrix Kernel Protocol (2022). Current development (V2/Next-Gen) with security sealing, AI-adapters, and high-performance topology is active in a private repository. Contact author for access."
**MKP (Matrix Kernel Protocol) is a matrix-based programming system that represents a new approach to code organization and management. It was developed to provide a more flexible and powerful way to work with data and functions.**
<br/>
<br/>

*This build contains: the MKP-minimal core, matrix utilities, a synchronous file watcher, and other useful examples (REPL, HTTP, Socket, Electron, Browser...)*

<br/>
<br/>

### Install `mkp` as a global terminal command

> `yarn global add https://github.com/thecabine/mkp`

> `npm install -g https://github.com/thecabine/mkp`

<br/>
----

## Local installation and launch:

```bash
git clone https://github.com/thecabine/mkp
cd mkp
yarn
yarn start
```

Now the system is fully running and the REPL console is activated.

> `yarn link` or `npm link` - installs global bin executive

<br/>

## Getting Started:

<br/>

By executing this code in the console, we will write to the cell <u>**examples.hello**</u>


```bash
> _MKP().examples.hello = 'any string content'
'any string content'
>
```

<br/>

A file will be synchronously created where simple MKP code will be written.

 > __rootDir_/examples/hello.js

```js
MKP;

return `any string content`
```

<br/>

Open the file in any editor and change the returned text.


```js
MKP;

return `Hello World! welcome string content`
```

<br/>

Just save the changes (`Cmd+S`) and the <u><strong>examples.hello</strong></u> cell is updated; check it in the console:

```bash
> _MKP().examples.hello
'Hello World! welcome string content'
>
```

<br/>

Create a new file `examples/myfunc.js` with the following code:

```js
MKP;

return (prefix='')=>prefix + ' : ' + MKP().examples.hello;
```

<br/>

Execute the following command in the console:

```bash
> _MKP().examples.myfunc('Wow!')
'Wow! : Hello World! welcome string content'
>
```

<br/>

Experiment in the console with these examples and take a look at the files:

```bash
> _MKP().examples.yourfunc = ()=>'Awesome'
> _MKP().examples.data01 = {have:'fun', play:'more'}
> _MKP().examples.list.deep.path = ['Find me at', 'exan2zth/1atma.js']
  // here the path is compressed to 2 dimensions [x,y] --- *info below*
>
```
<br/>

<details>
  <summary>A more complex MKP code example with Electron</summary>

  > requires running as `yarn start-electron`

<br/>
  
> myApp/examples/displ.js

<br/>

```js

MKP, P, log;


log.red(' Examples: displays ');

const dirname = process.cwd();

const {
  deps,
  portal: { sandbox },
} = MKP();

const electron = deps.require('electron');

const displays = electron.screen.getAllDisplays();
log.blue('Displays', displays);

const point = sandbox.data.disp00;
// displays.push({ ...displays[0], id: 99999 });
displays.map((display,i) => {
    Object.assign(point[i], display);
});

const res = electron.screen.getPrimaryDisplay();

log.blue('// \n', res);

return {
    sampleOutput: res
}
```

<br/>

Now, as a result, if we request the MKP we need in the console, we will get a response:

```bash
> _MKP().examples.displ
{
  sampleOutput: {
    id: 69734662,
    label: 'Built-in Retina Display',
    bounds: { x: 0, y: 0, width: 1792, height: 1120 },
    workArea: { x: 0, y: 25, width: 1792, height: 1095 },
    accelerometerSupport: 'unknown',
    monochrome: false,
    colorDepth: 30,
    colorSpace: '{primaries:BT709, transfer:SRGB_HDR, matrix:RGB, range:FULL}',
    depthPerComponent: 10,
    size: { width: 1792, height: 1120 },
    displayFrequency: 59,
    workAreaSize: { width: 1792, height: 1095 },
    scaleFactor: 2,
    rotation: 0,
    internal: true,
    touchSupport: 'unknown'
  }
}
>
```

<br/>

</details>

<br/>

MKP allows you to access data from anywhere in your program without a direct reference to its source location.

It is like magic, where you can modify your code in real-time, experiment, debug, and see results immediately.

-----

-----

-----

-----

# WORK IN PROGRESS
> For easier understanding of what follows, I recommend treating this version as a personal laboratory, a sandbox playground.



### !!! reacts to every save of any file

# What to look at / touch here:

 - folder `sandbox/`
 - save the `run/0repl.js` file a couple of times - the interactive console will turn on/off
 - create a file in any folder and it will launch automatically
 

## Code
 - On the first line is a list of injected names `MKP,P,text,nest` - in the loader (`0deps/loader.js`) this code section is parsed - *for now it is like this, but it can be done however you like*.
   - MKP - zero coordinates
   - P - photon - more on that separately
   - Any names [0-9a-z] return MKP([current X, <name>]) offset for convenient requesting of nearby files.

## Rules, Names

By standard, the following pattern is used to read the matrix:
```
<directory>/<file>.js 
where directory is (X) and file is (Y) coordinates
```

Basically, conversion from a base-36 string to an integer `parseInt(s, 36)` is used. It is recommended to use no more than 10 characters to stay within the 32BIT integer limit (-/+). It is possible to expand the field using BigInt or other numeral systems.

0file - the number property of ignoring leading zeros allows creating a non-overwritable file `000test -> test; 00 -> 0`. Namely, there will never be a number with leading zeros, which mathematically guarantees the impossibility of auto-writing to such a file. However, when reading, `return <exept undefined>` from this file will resolve to the actual coordinate.
