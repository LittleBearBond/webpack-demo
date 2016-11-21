import myVue from './my-mvvm/index';

var vm = window.vm = new myVue({
    debug: true,
    el: '#app',
    data: {
        name: 'xiongjian',
        name1: 'xiongjian'
    }
})

vm.name = "xiongjian1";
vm.name1 = "xiongjian1";
console.log(vm.name);