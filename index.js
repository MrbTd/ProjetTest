const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
let Persons=[
    { 
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456",
    },
    { 
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523",
    },
    { 
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345",
    },
    { 
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
    }
  ]

  function getRandomInt() {
    return Math.floor(Math.random() * 1000);
  }
  
  app.get('/',(req,res)=>{
      res.send("<h1>Bienvenue</h1>")
  })

  app.get('/api/persons',(req,res)=>{
      res.json(Persons)
  })

  app.get('/api/persons/info',(req,res)=>{
    let text=`<p>it ${Persons.length} people</p>`
    let d=`<p>new Date()</p>`
    res.send(` ${text}  ${d} `)

  })

  app.get('/api/persons/:id',(req,res)=>{
      const id=Number(req.params.id)
      const person=Persons.find(item=>item.id === id)
      if(person){
          res.send({number:person.number})
      }
      else{
          res.status(404).end()
      }
      
  })

  app.delete('/api/persons/:id',(req,res)=>{
    const id=Number(req.params.id)
    Persons=Persons.filter(item=>item.id !==id)
    res.status(204).end()
  })

  app.post('/api/persons',(req,res)=>{

      let body=req.body

      console.log('bod',body)

    if(!body.name || !body.number){
            res.status(400).json({err:'nom || numero  non renseigne'})
      }

    let num=Persons.find(item=>item.name ===body.name)

    if(num){
        res.status(400).json({ error: 'name must be unique' })
    }
      
    let obj={
          id: getRandomInt(),
          name:body.name,
          number:body.number
      }
      Persons=Persons.concat(obj)
      res.json(obj)

  })
  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})