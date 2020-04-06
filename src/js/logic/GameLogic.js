export default class GameLogic {
  constructor(gameField) {
    this.gameFieldSize = gameField.gameFieldSize;
    this.currentCellIndex = 0;
    this.nextCellIndex = 0;
    this.userScoreNumber = 0;
    this.goblinScoreNumber = 0;
    this.interval = 0;
    //если тут взять ячейки в коллекцию, то коллекция будет пустой. Не могу догадаться почему, ведь отрисовка поля уже произошла...
    //this.cells = document.querySelectorAll('.cell');
  }

  init() {
    this.addListener();
    this.interval = setInterval(() => { this.showGoblin(); }, 1000);
  }

  addListener() {
    //не понял почему this.userScoreNumber, this.goblinScoreNumber не видны в addEventListener
    //именно внутри слушателя теряется к ним доступ, даже в цикле for переменные выводятся в консоль
    //а если погрузиться в функцию слушателя, то связь обрывается...
    //в строках 26 и 27 console покажет undefined у всех если не попасть по гоблину и NaN у Юзера если по гоблину попасть
    //Если перенести их внутрь метода - все заработает, странно...
    const cells = document.querySelectorAll('.cell');//хотелось бы перенести взятие коллекции в конструктор
    //но там она не собирается и возвращается пустой
    for (let cell of cells) {
      cell.addEventListener('click', function(event) {
        //именно внутри функции нет доступа к этим переменным
        // console.log(this.goblinScoreNumber);
        // console.log(this.userScoreNumber);
        if (event.target.classList.contains('cell-image')) {
          this.userScoreNumber += 1;//соответственно, не работыют эти выражения, так как нет доступа к переменным в конструкторе
          this.goblinScoreNumber -= 1;
          document.getElementById('userScore').innerText = this.userScoreNumber;
          event.target.parentNode.innerHTML = '';
        }
      })
    }
  }

  showGoblin() {
    this.setRandomIndex();

    const currentCell = document.getElementById(`cell${this.currentCellIndex}`);
    const nextCell = document.getElementById(`cell${this.nextCellIndex}`);

    currentCell.innerHTML = '';
    nextCell.appendChild(this.generateNewImage());
    this.goblinScoreNumber += 1;
    document.getElementById('goblinScore').innerText = this.goblinScoreNumber
    this.currentCellIndex = this.nextCellIndex;
    this.isSomebodyWin();
  }

  setRandomIndex() {
    do {
      this.nextCellIndex = Math.floor(Math.random() * this.gameFieldSize);
    } while (this.currentCellIndex === this.nextCellIndex);
  }

  // eslint-disable-next-line class-methods-use-this
  generateNewImage() {
    const image = new Image();
    image.src = './img/goblin.png';
    image.classList.add('cell-image');
    return image;
  }

  isSomebodyWin() {
    if (this.goblinScoreNumber === 5) {
      clearInterval(this.interval);
      alert('Game over...');
    } else if (this.userScoreNumber === 5) {
      clearInterval(this.interval);
      alert('User won!!!')
    }
  }
}
