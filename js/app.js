(function (window) {
	'use strict';

	const vm = new Vue({
		el: '#app',
		data: {
			list: [],
			todoName: '',
			editId: -1
		},
		created() {
			// this.list = JSON.parse(localStorage.getItem('list')) || []
			axios.get('http://localhost:3000/list').then(res => {
				this.list = res.data
			})
		},
		methods: {
			//	添加任务
			addTodo(e) {
				// 判断按下的是否是回车键 第一种方法
				// if (e.keyCode === 13) {

				// 判断如果 input 值为空，不向下执行
				if (this.todoName.trim().length === 0) {
					return;
				}

				// 添加任务
				axios.post('http://localhost:3000/list', {
					name: this.todoName,
					done: false
				}).then(res => {
					// 把新加的对象，添加到 list，更新视图
					this.list.push(res.data)
				});
				//	添加任务后清空 input 中的值
				this.todoName = ""
				// }
			},
			//	删除任务
			delTodo(id) {
				axios.delete(`http://localhost:3000/list/${id}`).then(res => {
					// 删除list里的任务
					this.list = this.list.filter(item => item.id != id)
				})
			},
			// 编辑任务-显示编辑状态
			showEdit(id) {
				this.editId = id
			},
			// 编辑任务-隐藏编辑状态
			hideEdit(e) {
				axios.patch(`http://localhost:3000/list/${this.editId}`, {
					name: e.target.value
				}).then(res => {

				});
				this.editId = -1
			},
			// 状态改变
			stateChange(id) {
				// 根据 id 拿到 list 的对象
				let todo = this.list.find(item => item.id == id);
				// 发送请求修改状态
				axios.patch(`http://localhost:3000/list/${id}`, {
					done: !todo.done
				}).then(res => {

				})
			},
			// 清除已完成的任务
			clearCompleted() {
				// 清除已完成的（done:true），其实就是留下未完成的（done:false），将未完成的任务赋给数组
				this.list = this.list.filter(item => !item.done)
			}
		},
		// 计算属性
		computed: {
			// 底部的显示与隐藏
			isFooterShow1() {
				return this.list.length > 0
			},
			// 剩余未完成的个数
			itemLeftCount() {
				return this.list.filter(item => !item.done).length
			},
			//	Clear completed 的显示与隐藏
			isClearCompletedShow() {
				// some : 只要有一个满足条件的，则返回 true
				return this.list.some(item => item.done)
			}
		}
	})

})(window);
