# DockerDesktopChinese
Docker汉化版	DockerDesktop汉化版	Docker Windows汉化版	Docker中文版

##### 介绍

> 本项目由本人自行汉化, 且只翻译了一部分, 后续会不断修补
>
> $\color{red}使用本汉化版本说不准有没有其他影响,自行决定是否使用$

##### 效果图

![image-20220623183747749](D:\桌面\temp\Docker\chinese\README.assets\image-20220623183747749.png)

![image-20220623183808530](D:\桌面\temp\Docker\chinese\README.assets\image-20220623183808530.png)

##### 汉化方法

1. Docker安装目录(一般是`C:\Program Files\Docker\Docker\frontend\resources`)中找到app.asar并备份

2. 把`app.asar`和`app.asar.unpacked`移到其他地方
3. 确保下好了`node`、`npm`、`asar`
4. 使用`asar extract app.asar app`解压
5. 汉化完后用`asar pack app app.asar`压缩, 然后替换回去即可
