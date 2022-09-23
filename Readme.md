# react-partial-renderer

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

## Installation:

```bash
npm install react-partial-renderer
```

or

```bash
yarn add react-partial-renderer
```

## Usage

Proper Usage of the following Components can decrease load time & render time & create a smooth app

```js

import RenderHelper from 'react-partial-renderer';
// Puts component in callback queue with specified delay
...
    <RenderHelper loader={<Loader/>} onReady={()=>{}} delay={0}>
        <YourComp />
    </RenderHelper>
...


import { PartialScreenRenderer } from 'react-partial-renderer';
// Puts components in callback queue with specified delay in the list to render items one by one.
...
    {items.map((item,index)=>(
        <PartialScreenRenderer
            loader={<Loader/>}
            onReady={()=>{}}
            delay={0}
            startIndex={3}
            endIndex={10}
            skip={index===0}>
            ...
        </PartialScreenRenderer>
    ))}
...


import { PartialList } from 'react-partial-renderer';
// Prebuilt List component with PartialScreenRenderer
...
    <PartialList
        items={[]}
        renderItemLoader={(item,index)=><Loader/>}
        keyExtractor={(item,index)=>item.id}
        onRenderItem={(item,index)=>{}}
        delay={0}
        delayStartIndex={3}
        increaseDelayPerItem={0}
        delayEndIndex={10}
        initialNumToRender={index===0}
        renderItem={(item,index)=><YourComp/>}/>
...


import {DeferredRenderHelper} from 'react-partial-renderer';
// Defers component render till React is ready for it render Will render all at once slow than RenderHelper but increases smoothness of navigation and reduce navigation time

...
    <DeferredRenderHelper loader={<Loader/>} onReady={()=>{}} delay={0}>
        <YourComp />
    </DeferredRenderHelper>
...


import {deferRender} from 'react-partial-renderer';
// Defers whole component rendering

const Component = ...

export default deferRender(Component, <Loader/>)

```

## Authors

- [@niteshdangi](https://www.github.com/niteshdangi)

## License

[MIT](https://choosealicense.com/licenses/mit/)


> **Warning**
>
> Do not Overuse in one component

[npm-url]: https://www.npmjs.com/package/react-partial-renderer
[npm-image]: https://img.shields.io/npm/v/react-partial-renderer
[github-license]: https://img.shields.io/github/license/niteshdangi/react-partial-renderer
[github-license-url]: https://github.com/niteshdangi/react-partial-renderer/blob/main/LICENSE
[github-build]: https://github.com/niteshdangi/react-partial-renderer/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/niteshdangi/react-partial-renderer/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-partial-renderer