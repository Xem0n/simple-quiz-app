class Answer {
    constructor(element, pressedCallback) {
        this.valid = false;

        this.element = element;
        this.element.addEventListener('click', () => pressedCallback(this));

        this.content = this.element.querySelector('.answer-text');
        this.overlay = this.element.querySelector('.respond');
    }

    set id(id) {
        // Sets wheter answer is correct (true: 'correct', false: 'wrong')
        this.overlay.id = id;
    }

    set text(text) {
        this.content.innerHTML = text;
    }
}