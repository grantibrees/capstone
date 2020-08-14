export default {
  randomCode() {
    let genderatedCode = []
    let code = "ABCDEFGHJIKLMNPQRSTUVWXYZ1234567890"
    for (let i = 1; i <= 4; i++) {
      let index = Math.floor(Math.random() * code.length + 1)
      genderatedCode.push(code[index])
    }
    return genderatedCode.join('')
  }
}