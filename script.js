const topLeft= document.querySelector('.top-left-panel');
const topRight= document.querySelector('.top-right-panel');
const bottomLeft= document.querySelector('.bottom-left-panel');
const bottomRight= document.querySelector('.bottom-right-panel');
// function for getting random panel
const getRandomPanel = () => {
    const panels= [topLeft, topRight, bottomLeft, bottomRight];
    return panels[parseInt(Math.random()* panels.length)];
};
// sequence with initial random panel
const sequence= [getRandomPanel()];
// array that keeps track of what we need to guess
let sequenceToGuess = [...sequence];
// flash function
const flash= (panel) => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
            },1000);
        });
    };
    
let canClick = false;
// function to check the panels clicked by user
const panelClicked = panelClicked => {
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    if(expectedPanel === panelClicked){
        if(sequenceToGuess.length === 0){
            // start new round
            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            startFlashing();
        }
    }
    else{
        // end game
        alert('game over');
    }
};
// flashes panel one by one
const startFlashing = async () => {
    canClick = false;
    for (const panel of sequence) {
        await flash(panel);
    }
    canClick = true;
};

startFlashing();