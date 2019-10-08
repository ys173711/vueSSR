(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{27:function(t,e,o){"use strict";(function(t){var n,s=o(41),i=o(40);function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var l=0;e.a={metaInfo:{title:"Todo App"},name:"Todo",components:(n={},r(n,s.a.name,s.a),r(n,i.a.name,i.a),n),props:{id:{required:!0,type:String}},data:function(){return{todos:[],filter:"all",todos_id:0}},computed:{uncompletedNum:function(){return this.todos.reduce((function(t,e,o,n){return e.isCompleted||t.count++,t}),{count:0}).count},todos_show:function(){return 0==this.todos_id?this.todos:1==this.todos_id?this.todos.filter((function(t,e,o){return!t.isCompleted})):2==this.todos_id?this.todos.filter((function(t,e,o){return t.isCompleted})):this.todos}},methods:{addTodo:function(t){this.todos.unshift({id:l++,content:t.target.value.trim(),isCompleted:!1}),t.target.value=""},deleteTodo:function(t){this.todos.splice(this.todos.findIndex((function(e,o){return e.id==t})),1)},filter_showList:function(t){this.todos_id=t},clearUncompletedData:function(){this.todos=this.todos.filter((function(t,e,o){return!t.isCompleted}))}},mounted:function(){console.log("---this.id---"),console.log(this.id),console.log("---this.id---"),console.log(this)},beforeRouteEnter:function(t,e,o){console.log("beforeRouteEnter invoked"),o((function(t){console.log("当前组件的路由id为 "+t.id)}))},beforeRouteUpdate:function(t,e,o){console.log("beforeRouteUpdate invoked"),o()},beforeRouteLeave:function(e,o,n){console.log("beforeRouteLeave invoked"),t.confirm("are you sure ? ")&&n()}}}).call(this,o(3))},28:function(t,e,o){var n=o(33);"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};o(2)(n,s);n.locals&&(t.exports=n.locals)},29:function(t,e,o){var n=o(35);"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};o(2)(n,s);n.locals&&(t.exports=n.locals)},30:function(t,e,o){var n=o(37);"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};o(2)(n,s);n.locals&&(t.exports=n.locals)},32:function(t,e,o){"use strict";var n=o(28);o.n(n).a},33:function(t,e,o){},34:function(t,e,o){"use strict";var n=o(29);o.n(n).a},35:function(t,e,o){},36:function(t,e,o){"use strict";var n=o(30);o.n(n).a},37:function(t,e,o){},40:function(t,e,o){"use strict";var n={metaInfo:{title:"Todo App Tabs Page"},name:"Tabs",props:{uncompletedNum:{type:Number,required:!0}},data:function(){return{states:[{id:0,des:"all",name:"所有事务"},{id:1,des:"active",name:"未完成事务"},{id:2,des:"completed",name:"已完成事务"}],selectState:0}},methods:{clearBtn:function(){this.$emit("clearUncompleted")},toggleFilter:function(t){this.$emit("showList",t),this.selectState=t}}},s=(o(34),o(4)),i=Object(s.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"helper"},[o("span",{staticClass:"left"},[t._v(t._s(t.uncompletedNum)+"条未完成事务")]),t._v(" "),o("ul",{staticClass:"tabs"},t._l(t.states,(function(e){return o("li",{key:e.id,class:[e.des,{filter:t.selectState==e.id}],on:{click:function(o){return t.toggleFilter(e.id)}}},[t._v("\n            "+t._s(e.name)+"\n        ")])})),0),t._v(" "),o("button",{staticClass:"clearBtn",on:{click:t.clearBtn}},[t._v("清空已完成的事务")])])}),[],!1,null,null,null);e.a=i.exports},41:function(t,e,o){"use strict";var n={name:"Items",props:{todo:{type:Object,required:!0}},data:function(){return{}},methods:{deleteTodo:function(){this.$emit("del",this.todo.id)}}},s=(o(32),o(4)),i=Object(s.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{class:["todo-item",{completed:t.todo.isCompleted}]},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.isCompleted,expression:"todo.isCompleted"}],staticClass:"toggle",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.todo.isCompleted)?t._i(t.todo.isCompleted,null)>-1:t.todo.isCompleted},on:{change:function(e){var o=t.todo.isCompleted,n=e.target,s=!!n.checked;if(Array.isArray(o)){var i=t._i(o,null);n.checked?i<0&&t.$set(t.todo,"isCompleted",o.concat([null])):i>-1&&t.$set(t.todo,"isCompleted",o.slice(0,i).concat(o.slice(i+1)))}else t.$set(t.todo,"isCompleted",s)}}}),t._v(" "),o("label",{attrs:{for:""}},[t._v(t._s(t.todo.content))]),t._v(" "),o("button",{staticClass:"deleteBtn",on:{click:t.deleteTodo}})])}),[],!1,null,"7cce3c73",null);e.a=i.exports},43:function(t,e,o){"use strict";o.r(e);var n=o(27).a,s=(o(36),o(4)),i=Object(s.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"section"},[o("input",{staticClass:"add-input",attrs:{type:"text",autofocus:"autofocus",placeholder:"接下来要做什么？"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)}}}),t._v(" "),t._l(t.todos_show,(function(e){return o("Items",{key:e.id,attrs:{todo:e},on:{del:t.deleteTodo}})})),t._v(" "),o("Tabs",{attrs:{uncompletedNum:t.uncompletedNum},on:{showList:t.filter_showList,clearUncompleted:t.clearUncompletedData}})],2)}),[],!1,null,"197ebc4e",null);e.default=i.exports}}]);