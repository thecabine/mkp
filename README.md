## Unusual, experimental, infinity Matrix Key Point runtime for JS

<br/>

**MKP (Matrix Key Point) - это система программирования на основе матриц, которая представляет собой новый подход к организации и управлению кодом. Она была разработана с целью предоставить более гибкий и мощный способ работы с данными и функциями.**

<br/>

*Данная сборка содержит: ядро MKP-minimal, утититы матриц, синхронный файл вотчер и другие полезные примеры (REPL, HTTP, Socket, Electron, Browser...)*

<br/>
<br/>

### Устоновить `mkp` как глобальную команду для терминала

> `yarn global add https://github.com/thecabine/mkp`

> `npm install -g https://github.com/thecabine/mkp`

<br/>
----

## Установка и запуск локально:

```bash
git clone https://github.com/thecabine/mkp
cd mkp
yarn
yarn start
```

Теперь система полностью запущена и активирована REPL консоль

> `yarn link` or `npm link` - install global bin executive

<br/>

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

-----

-----

-----

-----

# WORK IN PROGRESS
> для легчего понимания дальнейшего рекомендую рассматривать данную версию как личную лабораторию, сандбокс плейграунд



### !!! реагирует на каждое сохранение любого файла

# что тут посмотреть/потрогать:

 - папка `sandbox/`
 - сохрани пару раз `run/0repl.js` файл - включиться/выключиться интерактивная консоль
 - coздай файл в любой папке и он автоматом запуститься
 

## код
 - на первой строке находиться список подключаемых имен `MKP,P,text,nest` - в загрузчике(`0deps/loader.js`) происходит парсинг етой секции кода - _покачто так но можно как угодно_
   - MKP - нулевые координаты 
   - P - фотон - про него отдельно 
   - любые имена [0-9a-z] возвращяют MKP([current X, <name>]) смещение для удобства запроса близлежащих файлов
## правила, имена

по стандарту для чтения матрицы используеться паттерн 
```
<directory>/<file>.js 
где directory как (X) а file как (Y) координаты
```

в основе используеться преобразование с 36-ричной стринги в integer `parseInt(s, 36)`, рекомендуеться исползовать не более 10 символов чтобы упираться в предел 32BIT integer(-/+), возможно расширить поле используя  BigInt или другие счисления

0file - свойство number игнорировать нули в начале числа позволяет создать неперезаписывамый файл `000test -> test; 00 -> 0`, а именно никогда не будет числа с нулями в начале, что математически гарантирует невозможность автозаписи в такой файл, но при чтении `return <exept undefined>` с данного файла установиться на действитльную координату


