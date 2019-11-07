(function () {
  let timeout = 10
  const maxTimeout = 1000

  let shuffleNames = () => {
  }
  let hideNames = () => {
  }

  function initialize () {
    const nameTextArea = document.getElementById('cbxNames')
    const startButton = document.getElementById('btnStart')
    const winnerNameElement = document.getElementById('divWinnerName')
    const winnerTitleElement = document.getElementById('divWinnerTitle')

    shuffleNames = function shuffleNames () {
      const names = nameTextArea.value.split('\n').filter(n => n !== '')

      if (names.length > 0) {
        startButton.style.visibility = 'hidden'

        const index = Math.floor(Math.random() * names.length)
        const name = winnerNameElement.innerHTML

        if (names[index] === '' || names[index] === null || names[index] === void 0) {
          shuffleNames()
        } else {
          if (timeout > maxTimeout && name !== '') {
            // display winner
            winnerTitleElement.style.visibility = 'visible'
            nameTextArea.value = nameTextArea.value.replace(name, '')

            // display new start button after 5 secs
            window.setTimeout(() => {
              startButton.style.visibility = 'visible'
            }, 5000)
          } else {
            winnerTitleElement.style.visibility = 'hidden'
            winnerNameElement.innerHTML = names[index]

            // for each run, increase timeout for next name pick, until timeout exceeds maxTimeout, then winner is displayed
            timeout = Math.round(timeout * 1000 / 900)
            window.setTimeout(shuffleNames, timeout)
          }
        }
      }
    }

    hideNames = function hideNames () {
      document.getElementById('divNames').style.display = 'none'
      document.getElementById('divTrekning').style.display = 'block'
      winnerNameElement.innerHTML = ''
      winnerTitleElement.style.visibility = 'hidden'
    }
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
      hideNames()
    },
  }
}())
