const dialogs = require("../../dialogs.json");

const dialogController = {
  home: (req, res) => {
    res.send('Hello World!')
  },
  test: (req, res) => {
    res.send('Hello Test!')
  },
  findAllQuestions: (req, res) => {
    const questions = dialogs.map(({ id, question }) => ({ id, question }))
    res.json(questions)
  },
  findById: (req, res) => {
    const dialog = dialogs.find(dialog => dialog.id === parseInt(req.params.id))
    if (!dialog) return res.status(404).send('Dialog not found')
    res.json(dialog)
  },
  search: (req, res) => {
    const question = normalizeString(req.body.question)
    const dialogsFiltered = dialogs.filter(dialog => normalizeString(dialog.question).includes(question))
    res.json(dialogsFiltered)
  }
}


const normalizeString = (str) => {
  return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

module.exports = dialogController