export function playWrongAnswer() {
  const keyLock = document.getElementById('key-lock')
  keyLock.classList.add('shake')
  keyLock.addEventListener('animationend', () => {
    keyLock.classList.remove('shake')
  }, { once: true })
}

export function rotationLock(answerLength,) {
  const container = document.getElementById('lock-mechanism')
  container.innerHTML = ''

  Array.from({length: answerLength }).forEach((_,index) => {
    const block = document.createElement('div')
    block.classList.add('lock-block')
    block.style.animationDelay = `${index * 0.1}s`
    block.classList.add('active')
    container.appendChild(block)
  })
}

export function playTransition(answerLength, onComplete) {
  console.log(answerLength)
  rotationLock(answerLength)
  const blocks = document.querySelectorAll('.lock-block')
  const lastBlock = blocks[blocks.length - 1]
  const keyLock = document.getElementById('key-lock')

  lastBlock.addEventListener('animationend', () => {
  keyLock.classList.add('fall')
    keyLock.addEventListener('animationend', () => {
      onComplete()
    }, { once: true })
  }, { once: true })
}
