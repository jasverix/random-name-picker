
const randomNamePicker = {
    timeout: 10,
    maxTimeout: 1000,

    startShuffle() {
        this.timeout = 10
        this.shuffleNames()
    },

    shuffleNames() {
        const names = document.getElementById('cbxNames').value.split("\n").filter(n => n !== '')

        if (names.length > 0) {
            document.getElementById('btnStart').style.visibility = 'hidden'

            const index = Math.floor(Math.random() * names.length)
            const name = document.getElementById('divWinnerName').innerHTML

            if (names[index] == '') {
                this.shuffleNames()
            } else {
                if (this.timeout > this.maxTimeout && name != '') {
                    // display winner
                    document.getElementById('divWinner').style.visibility = 'visible'
                    document.getElementById('cbxNames').value = document.getElementById('cbxNames').value.replace(name, '')

                    // display new start button after 5 secs
                    window.setTimeout(() => {
                        document.getElementById('btnStart').style.visibility = 'visible';
                    }, 5000)
                } else {
                    document.getElementById('divWinner').style.visibility = 'hidden'
                    document.getElementById('divWinnerName').innerHTML = names[index]

                    // for each run, increase timeout for next name pick, until timeout exceeds maxTimeout, then winner is displayed
                    this.timeout = Math.round(this.timeout * 1000 / 900)
                    window.setTimeout(() => this.shuffleNames(), this.timeout)
                }
            }
        }
    },

    /**
     * Hide name textarea and display the "Start" button
     */
    hideNames() {
        document.getElementById('divNames').style.display = 'none'
        document.getElementById('divTrekning').style.display = 'block'
        document.getElementById('divWinnerName').innerHTML = ''
        document.getElementById('divWinner').style.visibility = 'hidden'
    },

    showNames() {
        document.getElementById('divNames').style.display = 'block'
        document.getElementById('divTrekning').style.display = 'none'
    },
}
