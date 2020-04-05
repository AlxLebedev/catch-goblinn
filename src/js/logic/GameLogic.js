export default class GameLogic {
  constructor(ui) {
    this.gameFieldSize = ui.gameFieldSize;
    this.currentCellIndex = 0;
    this.nextCellIndex = 0;
    this.userScoreNumber = 0;
    this.goblinScoreNumber = 0;
  }

  init() {
    this.addListener();
    this.showGoblin();
  }

  addListener() {
    //не понял почему this.cells, this.userScoreNumber, this.goblinScoreNumber не видны в addListener
    //в строке 19 cells была пустой коллекцией, в строках 25 и 29 userScore & goblinScore являются NaN
    //Если перенести их внутрь метода - все заработает, странно...
    const cells = document.querySelectorAll('.cell');
    //let userScore = 0;
    //let goblinScore = 0;
    for (let item of cells) {
      item.addEventListener('click', function(event) {
        if (event.target.classList.contains('cell-image')) {
          this.userScoreNumber += 1;
          document.getElementById('userScore').innerText = this.userScoreNumber;
          event.target.parentNode.innerHTML = '';
        } else {
          this.goblinScoreNumber += 1;
          document.getElementById('goblinScore').innerText = this.goblinScoreNumber;
        }
      })
    }
  }

  showGoblin() {
    setInterval(() => {
      this.setRandomIndex();

      const currentCell = document.getElementById(`cell${this.currentCellIndex}`);
      const nextCell = document.getElementById(`cell${this.nextCellIndex}`);

      currentCell.innerHTML = '';
      nextCell.appendChild(this.generateNewImage());
      this.currentCellIndex = this.nextCellIndex;
    }, 1000);
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
}
