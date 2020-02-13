# todomvc-app

这个示例是模仿官网示例样式和功能用我自己的方式写的，基本没有看官网的源码，参考自定义指令。[todomvc]

主要使用：vue、axios

## 实现的功能

* 1、单条添加todo
* 2、单条删除todo
* 3、双击编辑todo
* 4、单条todo已完成相应样式状态改变
* 5、全部todo是已完成相应样式状态改变
* 6、清除全部已完成todos
* 7、待办todos数量显示
* 8、所有todos，已完成todos，未完成todos筛选

## 后台数据

* 使用 `jsoon-server` ，根据一个 json 文件，开启一个接口服务器，并且提供假数据

* 安装 `json-server` 

  ```shell
  npm i json-server -g
  ```

* 开启接口服务器

  ```js
  json-server json文件的路径
  ```

* 访问 index.html 即可