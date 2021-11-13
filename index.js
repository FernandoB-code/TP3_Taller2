const express = require('express')
const algo = require('./algo')

const port = 5000

const app = express()

const resource = 'estudiante'

const route = `/${resource}`

const estudiantes = [
  {
    nombre: "José",
    apellido: "Vázquez",
    dni: 90909090,
    edad: 40
  },
  {
    nombre: "Fernando",
    apellido: "Bernasconi",
    dni: 36191270,
    edad: 30
  },
  {
    nombre: "Billie",
    apellido: "Jean",
    dni: 37810250,
    edad: 29
  }
]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(route, (req, res) => {
  // req.body
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })

  // verificar duplicado de registro  
  
  if (!existe  ) {
    // grabado = estudiantes.save(estudiante)
    // if grabado...
    
    // try {
    //   baseDeDatos.save(estudiante)
    // } catch (ErrorDuplicacion) {
    //   res.status(409)
    //   res.send()
    // }
    estudiantes.push(estudiante)
    res.status(200)
    res.json(estudiante)
  } else {
    res.status(409)
    res.send()
  }
})

app.delete(route, (req, res) => {

  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })

  if(!existe) {
  res.status(400)
  res.json("No existe el estudiante con DNI "  + estudiante.dni)
  } else {
const index = (estudiantes) => estudiantes.dni === req.dni;
estudiantes.splice(estudiantes.findIndex(index));
res.status(200)
res.send()

  }

})

app.put(route, (req, res) => {

  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })

  if(!existe) {
  res.status(400)
  res.json("No existe el estudiante con DNI "  + estudiante.dni)
  } else {    
const index = estudiantes.findIndex(est => est.dni === estudiante.dni);
const e = estudiantes[index]

if(estudiante.nombre != null) {
  e.nombre = estudiante.nombre
}
if(estudiante.apellido != null) {
  e.apellido = estudiante.apellido
}
if(estudiante.edad != null) {
  e.edad = estudiante.edad
}
if(estudiante.dni != null) {
  e.dni = estudiante.dni
}
res.status(200)
res.json(e)

  }

})

app.get(route, (req, res) => {
  res.json(estudiantes)
})

app.get(`${route}/:dni`, (req,res) => {
  
  const dni = parseInt(req.params.dni)

  const index = estudiantes.findIndex(estudiante => estudiante.dni === dni);
  
 
  if(index !== -1) {

    res.status(200)
    res.json(estudiantes[index])    

  }else {

    res.status(403)
    res.json("No existe el estudiante con DNI "  + dni)

  }
 })

app.get(`${route}/edad/:rango`, (req, res) => { // rango: muestra hasta la edad que viene por parametro

  const rango = parseInt(req.params.rango)
  const response = new Array;


  for (var i = 0; i < estudiantes.length; i++) {
    if(estudiantes[i].edad <= rango)
    response.push(estudiantes[i])
 }

 res.status(200)
 res.json(response)
  
})

app.delete('/algo', algo.delete)

app.listen(port, () => {
  console.log("Escuchando")
})