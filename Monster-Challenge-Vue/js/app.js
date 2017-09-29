new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsStart: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsStart = !this.gameIsStart
      this.playerHealth = 100
      this.monsterHealth = 100
    },
    attack: function() {
      var damage = this.calculateDamage(5, 12)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Monster Receive ' + damage + ' damage'
      })
      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 15)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Monster Receive ' + damage + ' damage'
      })
      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },
    heal: function() {
      var heal = 10
      if (this.playerHealth <= 90) {
        this.playerHealth += heal
      } else {
        this.playerHealth = 100
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player Gains ' + heal + ' health'
      })
      this.monsterAttacks()
    },
    giveUp: function() {
      this.gameIsStart = false
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turns = []
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin: function() {
      if (this.playerHealth <= 0) {
        alert('You lost, play again?')
        if (confirm) {
          this.startGame()
        } else {
          this.gameIsStart = false
        }
        this.turns = []
        return true
      } else if (this.monsterHealth <= 0) {
        alert('You win, play again?')
        if (confirm) {
          this.startGame()
        } else {
          this.gameIsStart = false
        }
        this.turns = []
        return true
      }
      return false
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(7, 12)
      this.playerHealth -= damage
      this.turns.unshift({
        isPlayer: false,
        text: 'Player Receive ' + damage + ' damage'
      })
      this.checkWin()
    }
  }
})
