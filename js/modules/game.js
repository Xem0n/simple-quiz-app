// In miliseconds
const _transitionTime = 1000;

const _questions = [
    {
        question: 'Lorem ipsum?',
        answers: [
            'a',
            'b',
            'c',
            'd'
        ],
        valid: 0,
        correct: false
    },
    {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada augue quis enim porta, eu maximus enim tristique. Curabitur lobortis ultrices odio quis porttitor. Curabitur sit amet dignissim erat. Donec accumsan porttitor odio ac tempus. Nulla blandit fermentum ligula, id condimentum augue lacinia a. Sed venenatis volutpat lorem, at laoreet massa mattis volutpat. In vitae metus massa. Nulla porta iaculis metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla faucibus dolor suscipit cursus accumsan. In hac habitasse platea dictumst.',
        // question: 'Ipsum lorem?',
        answers: [
            'd',
            'c',
            'b',
            'a'
        ],
        valid: 1,
        correct: false
    },
    {
        question: 'Question?',
        answers: [
            'q',
            'w',
            'e',
            'r'
        ],
        valid: 3,
        correct: false
    },
];

Array.prototype.shuffle = function() {
    return this.sort(() => {
        return 0.5 - Math.random();
    });
}

class Game {
    constructor() {
        this.game = document.querySelector('.container-game');
        this.show();

        this.questions = _questions.shuffle();
        this.currentQuestion = -1;

        this.questionLabel = document.querySelector('.question');
        this.answers = this.getAnswers();

        this.points = 0;

        this.anySelected = false;

        this.nextQuestion();
    }

    show() {
        this.game.style.display = 'flex';
    }

    selected(answer) {
        // Called when any card got pressed

        if (this.anySelected) return;

        this.anySelected = true;

        this.questions[this.currentQuestion].correct = answer.valid;
        this.points += Number(answer.valid);
        answer.id = answer.valid ? 'correct' : 'wrong';

        setTimeout(() => this.nextQuestion(), _transitionTime);
    }

    getAnswers() {
        // Returns array with Answer objects

        const answers = [];
        
        document.querySelectorAll('.answer').forEach(answer => {
            answers.push(new Answer(answer, this.selected.bind(this)));
        });

        return answers;
    }

    nextQuestion() {
        this.currentQuestion++;

        if (this.currentQuestion >= this.questions.length) {
            // The game has been finished, there's no more questions
            this.finish();

            return;
        }

        this.questionLabel.innerHTML = this.questions[this.currentQuestion].question;

        this.answers.forEach((answer, index) => {
            answer.id = '';
            answer.text = this.questions[this.currentQuestion].answers[index];
            answer.valid = index === this.questions[this.currentQuestion].valid;
        });

        this.anySelected = false;
    }

    finish() {
        this.game.style.display = 'none';

        const finish = document.querySelector('.finish');
        finish.style.display = 'block';
        finish.innerHTML = `Congratulations!<br>${this.points}/${this.questions.length}`;
    }
}