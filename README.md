# Unusual, experimental, infinity Matrix Key Point runtime for JS

MKP (Matrix Key Point) - это система программирования на основе матриц, которая представляет собой новый подход к организации и управлению кодом. Она была разработана с целью предоставить более гибкий и мощный способ работы с данными и функциями.

Данная сборка содержит: ядро MKP-minimal, утититы матриц, синхронный файл вотчер и другие полезные примеры (REPL, HTTP, Socket, Electron, Browser...)

<br/><br/>

## Установка и запуск:

```bash
git clone https://github.com/thecabine/mkp
cd mkp
yarn
yarn start
```

Теперь система полностью запущена и активирована REPL консоль

<br/><br/>

## Начало использования:

<br/>

При выполнении данного кода в консоли мы запишем ячейку <u>**examples.hello**</u>


```bash
> _MKP().examples.hello = 'any string content'
'any string content'
>
```

<br/>

Синхронно создасться файл где запишеться простой код для MKP

 > __rootDir_/examples/hello.js

```js
MKP;

return `any string content`
```

<br/>

Откройте файл в любом редакторе и измените возвращаемый текст


```js
MKP;

return `Hello World! welcome string content`
```

<br/>

Достаточно сохранить изменения `Cmd+S` и ячейка <u><strong>examples.hello</strong></u> обновлена, проверьте в консоли

```bash
> _MKP().examples.hello
'Hello World! welcome string content'
>
```

<br/>

Создайте новый файл `examples/myfunc.js` со следующим кодом

```js
MKP;

return (prefix='')=>prefix + ' : ' + MKP().examples.hello;
```

<br/>

Выполните следующую комманду в консоли

```bash
> _MKP().examples.myfunc('Wow!')
'Wow! : Hello World! welcome string content'
>
```

<br/>

Поекспериментируйте в консоли с етими примерами и посмотрите файлы

```bash
> _MKP().examples.yourfunc = ()=>'Awesome'
> _MKP().examples.data01 = {have:'fun', play:'more'}
> _MKP().examples.list.deep.path = ['Find me at', 'exan2zth/1atma.js']
  // здесь происходит сжатие пути к 2 измерениям [x,y] --- *инфо ниже*
>
```
<br/>

<details>
  <summary>Более сложный пример кода для MKP вместе с Electron </summary>

  > требуеться запустить как `yarn start-electron`

<br/>

```javascript
console.log("I'm a code block!");
```
  
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

Теперь в результате если в консоли запросить нужную нам МКП мы получим ответ

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

MKP позволяет вам обращаться к данным из любого места вашей программы без прямой ссылки на их исходное местоположение.

Это как магия, где вы можете модифицировать свой код в режиме реального времени, экспериментировать, отлаживать и видеть результаты немедленно. 
