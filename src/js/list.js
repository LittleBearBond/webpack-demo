import myVue from './my-mvvm/index';

var vm = new myVue({
    debug: true,
    el: '#app',
    data: {
        name: 'xiongjian'
    }
})

vm.name = "xiongjian1";
console.log(vm.name);