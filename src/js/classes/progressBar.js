import $ from 'jquery';
class progressBar{
    constructor(data,container){
        this.steps = data;
        this.index = 0;
        this.container = $(container);
        this.bar();
    }
    clear(){
        this.container.children().not('.bar').remove();
    }
    bar(){
        const wrapper = $('<nav>',{class:'bar'});
        this.steps.map(e=>{
            $('<div>').append(
                $(`<span>${e.name}</span>`)
            ).appendTo(wrapper);
        });
        wrapper.appendTo(this.container);
    }
    changeStep(){
        $('.bar').find('.actual').removeClass('actual');
        $($('.bar').children()[this.index]).addClass('actual');
    }
    draw(data = null){
        this.clear();
        const actual = this.steps[this.index].method;
        $(actual(data)).appendTo(this.container);
        this.changeStep();
    }
    next(data = null){
        this.index++;
        this.draw(data);
    }
    prev(data = null){
        this.index--;
        this.draw(data);
    }
}
export default progressBar;