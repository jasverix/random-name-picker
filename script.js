(function () {
  let timeout = 10
  const maxTimeout = 1000

  const elements = {
    nameTextArea: null,
    startButton: null,
    winnerName: null,
    winnerTitle: null,
  }

  const isEmpty = val => val === '' || val === null || val === void 0

  const shuffleNames = () => {
    const names = elements.nameTextArea.value.split('\n').filter(n => !isEmpty(n))

    if (names.length > 0) {
      elements.startButton.style.visibility = 'hidden'

      const index = Math.floor(Math.random() * names.length)
      const name = names[index]

      elements.winnerName.innerHTML = name

      if (timeout > maxTimeout && name !== '') {
        window.setTimeout(() => {
          // display winner
          elements.winnerTitle.style.visibility = 'visible'

          // remove winner
          delete names[index]

          // store names back
          elements.nameTextArea.value = names.filter(n => !isEmpty(n)).join('\n')

          // display new start button after 5 secs
          window.setTimeout(() => {
            elements.startButton.style.visibility = 'visible'
          }, 5000)
        }, timeout)
      } else {
        elements.winnerTitle.style.visibility = 'hidden'

        // for each run, increase timeout for next name pick, until timeout exceeds maxTimeout, then winner is displayed
        timeout = Math.round(timeout * 1000 / 900)
        window.setTimeout(shuffleNames, timeout)
      }
    }
  }

  function initialize () {
    const nameTextArea = document.getElementById('cbxNames')
    const startButton = document.getElementById('btnStart')
    const winnerNameElement = document.getElementById('divWinnerName')
    const winnerTitleElement = document.getElementById('divWinnerTitle')

    elements.nameTextArea = nameTextArea
    elements.startButton = startButton
    elements.winnerName = winnerNameElement
    elements.winnerTitle = winnerTitleElement
  }

  window.addEventListener('DOMContentLoaded', () => initialize())

  window.randomNamePicker = {
    startShuffle () {
      timeout = 10
      shuffleNames()
    },

    /**
     * Hide name textarea and display the "Start" button
     */
    hideNames () {
      document.getElementById('divNames').style.display = 'none'
      document.getElementById('divTrekning').style.display = 'block'
      elements.winnerName.innerHTML = ''
      elements.winnerTitle.style.visibility = 'hidden'
    },
  }
}())
