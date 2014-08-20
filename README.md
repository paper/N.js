#N.js

存储数据，按照先进先出原则，可以实现数据的 延迟处理 或  动画效果处理


## 说明

有时候，我们需要延迟处理数据

比如写一个数组排序的动画，如果直接写，会比较麻烦。
但是如果把一些 “关键” 数据先存储起来，再 “一步一步” 进行处理，而且是否开始走下一步，是由上一步发出的 “信号” 决定的。

这样就可以处理更多的情况了。


## Demo

**N.js** 实现的一个简单排序动画的例子 [Demo](http://paper.github.io/N.js/demo.html) [请使用 Firefox 或 chrome 进行查看]

大家可以参考这个例子，延伸自己所需要的场合

## Changelog

#####1.1.0
1. 添加了 @walkOver，可以判断数据是否 “走” 完了

#####1.0.0
1. N.js 最初版本

